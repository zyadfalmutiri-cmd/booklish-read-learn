import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'من نحن - Booklish' },
      {
        name: 'description',
        content:
          'Booklish منصة لتعلم اللغة الإنجليزية للناطقين بالعربية، عبر قصص وقوائم مفردات وتمارين تفاعلية.',
      },
    ],
  }),
})

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-semibold text-[#9D381F] mb-6">من نحن</h1>

      <p className="text-base leading-8 mb-4">
        Booklish منصة تعليمية تهدف إلى مساعدة الناطقين باللغة العربية على تعلّم
        اللغة الإنجليزية بطريقة عملية وممتعة، من خلال القصص القصيرة، قوائم
        المفردات، وأنظمة المراجعة الذكية.
      </p>

      <p className="text-base leading-8 mb-4">
        بدأ المشروع كفكرة بسيطة: تعلّم اللغة لا يجب أن يكون مملًا أو معقدًا.
        لذلك بنينا تجربة تشبه الألعاب التعليمية، تجمع بين القراءة والاستماع
        والتكرار المتباعد (Spaced Repetition) لتثبيت الكلمات في الذاكرة طويلة
        المدى.
      </p>

      <h2 className="text-xl font-semibold text-[#9D381F] mt-8 mb-4">
        ماذا نقدّم؟
      </h2>
      <ul className="list-disc pr-6 space-y-2 text-base leading-7">
        <li>مكتبة قصص مصنّفة حسب المستوى (CEFR)</li>
        <li>نظام مراجعة مفردات ذكي (Leitner SRS)</li>
        <li>تمارين نطق واستماع بأصوات متعددة</li>
        <li>مسار تحضيري لاختبار STEP</li>
      </ul>

      <h2 className="text-xl font-semibold text-[#9D381F] mt-8 mb-4">
        رؤيتنا
      </h2>
      <p className="text-base leading-8">
        نطمح إلى أن يكون Booklish الرفيق اليومي لكل من يريد إتقان الإنجليزية،
        بغض النظر عن مستواه الحالي أو وقته المتاح.
      </p>
    </div>
  )
}
