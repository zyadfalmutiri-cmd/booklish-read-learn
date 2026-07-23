import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/faq')({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: 'الأسئلة الشائعة - Booklish' },
      {
        name: 'description',
        content: 'إجابات على أكثر الأسئلة شيوعًا حول منصة Booklish لتعلم الإنجليزية.',
      },
    ],
  }),
})

const faqs = [
  {
    q: 'ما هي منصة Booklish؟',
    a: 'Booklish منصة إلكترونية تساعدك على تعلّم اللغة الإنجليزية عبر قصص قصيرة، قوائم مفردات، وتمارين نطق واستماع، مبنية خصيصًا للناطقين بالعربية.',
  },
  {
    q: 'هل المنصة مجانية؟',
    a: 'نعم، جميع الميزات متاحة حاليًا مجانًا لكل المستخدمين.',
  },
  {
    q: 'كيف يعمل نظام المراجعة (SRS)؟',
    a: 'يعتمد على نظام Leitner للتكرار المتباعد، حيث تتم مراجعة الكلمات التي تحفظها على فترات متزايدة (من 10 دقائق إلى 60 يوم) حسب مدى إتقانك لها.',
  },
  {
    q: 'هل يوجد تحضير لاختبار STEP؟',
    a: 'نعم، نوفر قسمًا مخصصًا يحتوي على قواعد نحوية ومفردات وتمارين مرتبطة باختبار STEP.',
  },
  {
    q: 'هل أحتاج إنشاء حساب لاستخدام المنصة؟',
    a: 'نعم، إنشاء حساب يتيح لك حفظ تقدمك، مفرداتك المحفوظة، ونقاط الخبرة (XP) الخاصة بك.',
  },
  {
    q: 'كيف أتواصل معكم في حال وجود مشكلة؟',
    a: 'تقدر تراسلنا من صفحة "اتصل بنا" أو عبر البريد booklish.app@gmail.com',
  },
]

function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-semibold text-[#9D381F] mb-8">
        الأسئلة الشائعة
      </h1>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-right px-5 py-4 font-medium flex justify-between items-center bg-white hover:bg-[#FAF8F5] transition-colors"
            >
              <span>{item.q}</span>
              <span className="text-[#9D381F]">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm leading-7 text-gray-700">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
