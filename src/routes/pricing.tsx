import { createFileRoute, Link } from "@tanstack/react-router";

import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/pricing')({
  loader: () => {
    throw redirect({ to: '/' })
  },
})


function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-2 text-center">خطط الاشتراك</h1>
      <p className="text-muted-foreground text-center mb-10">
        جرب Booklish مجانًا لمدة 4 أيام، ثم اختر الخطة المناسبة لك
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* الخطة الشهرية */}
        <div className="border border-border rounded-xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-1">الاشتراك الشهري</h2>
          <p className="text-3xl font-bold mb-4">
            $5 <span className="text-base font-normal text-muted-foreground">/ شهريًا</span>
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground flex-1">
            <li>✓ الوصول لجميع القصص والمستويات</li>
            <li>✓ حفظ غير محدود للكلمات</li>
            <li>✓ تجربة بدون إعلانات</li>
            <li>✓ البحث عن معاني الكلمات بالذكاء الاصطناعي</li>
            <li>✓ تمارين النطق والشادوينغ</li>
          </ul>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            ابدأ تجربتك المجانية
          </Link>
        </div>

        {/* الخطة السنوية */}
        <div className="border-2 border-primary rounded-xl p-6 flex flex-col relative">
          <span className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
            خصم 50%
          </span>
          <h2 className="text-xl font-semibold mb-1">الاشتراك السنوي</h2>
          <p className="text-3xl font-bold mb-4">
            $30 <span className="text-base font-normal text-muted-foreground">/ سنويًا</span>
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground flex-1">
            <li>✓ الوصول لجميع القصص والمستويات</li>
            <li>✓ حفظ غير محدود للكلمات</li>
            <li>✓ تجربة بدون إعلانات</li>
            <li>✓ البحث عن معاني الكلمات بالذكاء الاصطناعي</li>
            <li>✓ تمارين النطق والشادوينغ</li>
          </ul>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            ابدأ تجربتك المجانية
          </Link>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        تجربة مجانية لمدة 4 أيام. يمكنك الإلغاء في أي وقت.
      </p>
    </div>
  )
}
