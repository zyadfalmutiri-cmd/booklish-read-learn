// app/routes/about.tsx
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "من نحن — Booklish | تعلم الإنجليزية بالقراءة" },
    { 
      name: "description", 
      content: "تعرف على فريق Booklish وقصة إنشاء منصة تعلم الإنجليزية الأكثر تفاعلية للناطقين بالعربية." 
    },
    { property: "og:title", content: "من نحن — Booklish" },
    { 
      property: "og:description", 
      content: "تعرف على فريق Booklish وقصة إنشاء منصة تعلم الإنجليزية الأكثر تفاعلية." 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://booklish-read-learn.vercel.app/about" },
    { 
      property: "og:image", 
      content: "https://booklish-read-learn.vercel.app/og-image.png" 
    },
  ];
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            من نحن
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            نؤمن بأن تعلم الإنجليزية يجب أن يكون طبيعيًا، ممتعًا، ومتاحًا للجميع.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">قصتنا</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              بدأت فكرة <strong className="text-white">Booklish</strong> من تجربة شخصية. كنت أبحث عن طريقة 
              فعّالة لتعلم الإنجليزية، لكن كل الطرق التقليدية كانت مملة أو معقدة. الكتب ثقيلة، 
              الدورات غالية، والتطبيقات المجانية لا تكفي.
            </p>
            <p>
              فجأة خطر ببالي: <em>"ولو جمعنا بين متعة القراءة وقوة التفاعل؟"</em> — قراءة قصص 
              حقيقية، اضغط على أي كلمة تعرف معناها، تحدث مع ذكاء اصطناعي يصحح لك، وتابع 
              تقدمك خطوة بخطوة.
            </p>
            <p>
              وهكذا وُلدت Booklish في عام 2024، منصة تعليمية رقمية تهدف لجعل تعلم 
              الإنجليزية تجربة يومية ممتعة، لا مهمة ثقيلة.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
            <p className="text-gray-300 leading-relaxed">
              تمكين كل ناطق بالعربية من إتقان الإنجليزية من خلال تجربة تعلم طبيعية، 
              تفاعلية، وممتعة تعتمد على القراءة والمحادثة اليومية.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
            <p className="text-gray-300 leading-relaxed">
              أن نصبح المنصة الأولى في العالم العربي لتعلم الإنجليزية بالقراءة التفاعلية، 
              وأن نصل لمليون متعلم بحلول عام 2027.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">المؤسس</h2>
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
              👤
            </div>
            <h3 className="text-2xl font-bold mb-2">زياد المطيري</h3>
            <p className="text-blue-400 mb-4">مؤسس Booklish</p>
            <p className="text-gray-300 leading-relaxed">
              مطور ومصمم منتجات رقمية من السعودية. شغوف بتعليم اللغات وتقنية التعليم. 
              يؤمن بأن أفضل طريقة للتعلم هي من خلال المحتوى الذي تستمتع به.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-800/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">2024</div>
              <div className="text-gray-400">سنة التأسيس</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">+50</div>
              <div className="text-gray-400">قصة تفاعلية</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">+1000</div>
              <div className="text-gray-400">مستخدم</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
              <div className="text-gray-400">محتوى أصلي</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">انضم إلينا اليوم</h2>
          <p className="text-gray-300 mb-8 text-lg">
            ابدأ رحلتك في تعلم الإنجليزية مع Booklish. أول 4 أيام مجانًا!
          </p>
          <a
            href="/auth"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity"
          >
            ابدأ الآن مجانًا
          </a>
        </div>
      </section>
    </div>
  );
}
