// app/routes/faq.tsx
import { useState } from "react";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "الأسئلة الشائعة — Booklish | تعلم الإنجليزية بالقراءة" },
    { 
      name: "description", 
      content: "إجابات على أكثر الأسئلة شيوعًا عن Booklish: الاشتراكات، المحتوى، الدعم الفني، وطريقة التعلم." 
    },
    { property: "og:title", content: "الأسئلة الشائعة — Booklish" },
    { 
      property: "og:description", 
      content: "إجابات على أكثر الأسئلة شيوعًا عن Booklish." 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://booklish-read-learn.vercel.app/faq" },
  ];
};

const faqs = [
  {
    category: "عام",
    questions: [
      {
        q: "ما هو Booklish؟",
        a: "Booklish هي منصة تعليمية رقمية تساعد الناطقين بالعربية على تعلم الإنجليزية من خلال القراءة التفاعلية. تستطيع قراءة قصص قصيرة، الضغط على أي كلمة لمعرفة معناها، التحدث مع شريك ذكي يصحح لك، ومتابعة تقدمك يوميًا."
      },
      {
        q: "هل Booklish مناسب للمبتدئين؟",
        a: "نعم! Booklish مصمم لجميع المستويات. لدينا قصص مصنفة حسب المستوى (مبتدئ، متوسط، متقدم)، ونظام يتكيف مع تقدمك ويقدم لك المحتوى المناسب."
      },
      {
        q: "هل المحتوى مجاني؟",
        a: "نقدم فترة تجربة مجانية مدتها 4 أيام. بعدها يمكنك الاشتراك بخطط شهرية أو سنوية. بعض المحتوى الأساسي متاح مجانًا دائمًا."
      }
    ]
  },
  {
    category: "الاشتراكات والدفع",
    questions: [
      {
        q: "كم تكلفة الاشتراك؟",
        a: "نقدم خططًا مرنة تناسب الجميع. الاشتراك الشهري بسعر مناسب، والاشتراك السنوي يوفر لك خصمًا يصل إلى 40%. تفضل بزيارة صفحة الأسعار لمعرفة التفاصيل."
      },
      {
        q: "كيف يمكنني إلغاء الاشتراك؟",
        a: "يمكنك إلغاء الاشتراك في أي وقت من خلال إعدادات حسابك. الإلغاء يوقف التجديد التلقائي فورًا، وستستمر في الاستفادة من الاشتراك حتى نهاية الفترة المدفوعة."
      },
      {
        q: "هل يمكنني استرداد المبلغ؟",
        a: "نحن نقدم فترة تجربة مجانية كافية لتقييم المنصة. للاسترداد، يرجى مراجعة سياسة الاسترداد الكاملة أو التواصل معنا مباشرة."
      },
      {
        q: "هل الدفع آمن؟",
        a: "نعم تمامًا. نستخدم Paddle كمزود دفع موثوق وآمن. لا نقوم بتخزين بيانات بطاقتك الائتمانية على خوادمنا."
      }
    ]
  },
  {
    category: "المحتوى والتعلم",
    questions: [
      {
        q: "كم عدد القصص المتاحة؟",
        a: "لدينا أكثر من 50 قصة تفاعلية متنوعة، ونضيف قصصًا جديدة بشكل دوري. القصص مصنفة حسب المستوى والموضوع."
      },
      {
        q: "هل القصص أصلية أم مترجمة؟",
        a: "جميع القصص أصلية ومصممة خصيصًا للمتعلمين العرب. نكتبها بعناية لتكون مناسبة لمستويات مختلفة مع الحفاظ على المتعة والفائدة."
      },
      {
        q: "ما هو تمرين Shadowing؟",
        a: "Shadowing هو تقنية تعلم لغوي تساعدك على تحسين النطق وال fluency. تستمع إلى نص وتحاول تكراره بنفس الإيقاع والنبرة. في Booklish، يمكنك ممارسة Shadowing مع قصصك المفضلة."
      },
      {
        q: "كيف يعمل شريك المحادثة الذكي؟",
        a: "يستخدم شريك المحادثة تقنيات الذكاء الاصطناعي المتقدمة عبر OpenRouter. يمكنك التحدث معه بالإنجليزية، وسيصحح أخطاءك ويعطيك نصائح لتحسين لغتك."
      }
    ]
  },
  {
    category: "الحساب والدعم",
    questions: [
      {
        q: "كيف أحذف حسابي؟",
        a: "يمكنك حذف حسابك وجميع بياناتك من إعدادات الحساب. إذا واجهت أي صعوبة، تواصل معنا وسنساعدك."
      },
      {
        q: "هل بياناتي آمنة؟",
        a: "نعم. نستخدم Supabase لتخزين البيانات بشكل آمن. نحن لا نبيع بياناتك لأي طرف ثالث. للمزيد، راجع سياسة الخصوصية الكاملة."
      },
      {
        q: "كيف أتواصل مع الدعم الفني؟",
        a: "يمكنك التواصل معنا عبر البريد الإلكتروني booklish.app@gmail.com أو من خلال نموذج التواصل في صفحة 'تواصل معنا'. نرد خلال 24 ساعة."
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <span className={`text-2xl transition-transform ${isOpen ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-gray-300 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            الأسئلة الشائعة
          </h1>
          <p className="text-xl text-gray-300">
            إجابات على أكثر الأسئلة التي تصلنا. إذا لم تجد إجابتك، تواصل معنا!
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold mb-6 text-blue-400">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, index) => (
                  <FAQItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 bg-gray-900/50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">لم تجد إجابتك؟</h2>
          <p className="text-gray-300 mb-6">
            فريقنا جاهز لمساعدتك. راسلنا وسنرد عليك في أقرب وقت.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
          >
            تواصل معنا
          </a>
        </div>
      </section>
    </div>
  );
}
