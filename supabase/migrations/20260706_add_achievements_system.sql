-- جدول كتالوج الإنجازات
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title_ar text not null,
  description_ar text not null,
  icon text not null,
  category text not null check (category in ('progress','streak')),
  requirement_type text not null,
  requirement_value integer not null,
  created_at timestamptz default now()
);

-- إنجازات المستخدم المفتوحة
create table if not exists user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  achievement_id uuid references achievements(id) on delete cascade not null,
  unlocked_at timestamptz default now(),
  unique(user_id, achievement_id)
);

-- تتبع الاستمرارية اليومية
create table if not exists user_streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_activity_date date
);

alter table achievements enable row level security;
create policy "achievements readable by all" on achievements for select using (true);

alter table user_achievements enable row level security;
create policy "users view own achievements" on user_achievements for select using (auth.uid() = user_id);

alter table user_streaks enable row level security;
create policy "users view own streak" on user_streaks for select using (auth.uid() = user_id);