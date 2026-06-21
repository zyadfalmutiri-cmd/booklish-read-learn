import type { Lang } from "@/lib/i18n";
import type { LegalSection } from "@/components/booklish/legal-page";
import { CONTACT_EMAIL } from "@/lib/contact";

const LAST_UPDATED = { ar: "آخر تحديث: 21 يونيو 2026", en: "Last updated: June 21, 2026" };

export function getPrivacyContent(lang: Lang): { title: string; lastUpdated: string; sections: LegalSection[] } {
  if (lang === "ar") {
    return {
      title: "سياسة الخصوصية",
      lastUpdated: LAST_UPDATED.ar,
      sections: [
        {
          title: "مقدمة",
          body: [
            "Booklish («نحن») منصة لتعلّم الإنجليزية عبر قراءة القصص. نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.",
            "توضّح هذه السياسة ما نجمعه من معلومات، وكيف نستخدمها، وما هي خياراتك.",
          ],
        },
        {
          title: "البيانات التي نجمعها",
          body: [
            "بيانات الحساب (اختياري): عند إنشاء حساب، نجمع بريدك الإلكتروني واسم العرض عبر Supabase Auth.",
            "بيانات التعلّم: تقدّم القراءة، الكلمات المحفوظة، نتائج الاختبارات، سلسلة الأيام، ونقاط XP — تُخزَّن محلياً في متصفحك، وقد تُزامَن مع حسابك عند تسجيل الدخول.",
            "بيانات الاستخدام التقنية: سجلات أخطاء مجهولة الهوية لتحسين استقرار التطبيق.",
          ],
        },
        {
          title: "كيف نستخدم البيانات",
          body: [
            "نستخدم بياناتك لتقديم تجربة التعلّم: متابعة القراءة، حفظ المفردات، المراجعة، وعرض الإحصائيات.",
            "لا نبيع بياناتك الشخصية لأطراف ثالثة.",
            "قد نستخدم بيانات مجمّعة وغير قابلة للتعرّف لتحسين المحتوى والأداء.",
          ],
        },
        {
          title: "التخزين المحلي وملفات تعريف الارتباط",
          body: [
            "يستخدم Booklish localStorage في متصفحك لحفظ تفضيلاتك (السمة، اللغة) وبيانات التعلّم.",
            "قد نستخدم ملفات تعريف ارتباط ضرورية لتشغيل الجلسة عند تسجيل الدخول. راجع صفحة سياسة ملفات تعريف الارتباط لمزيد من التفاصيل.",
          ],
        },
        {
          title: "خدمات الطرف الثالث",
          body: [
            "نستخدم Supabase لمصادقة المستخدمين وتخزين البيانات المتزامنة. تخضع بياناتك أيضاً لسياسة خصوصية Supabase.",
            "قد يستخدم متصفحك خدمات النطق (Text-to-Speech) المدمجة في نظام التشغيل؛ لا نرسل نصوصك إلى خوادمنا لهذا الغرض.",
          ],
        },
        {
          title: "حقوقك",
          body: [
            "يمكنك حذف بياناتك المحلية بمسح ذاكرة التخزين في المتصفح أو إعادة ضبط إعدادات الموقع.",
            "يمكنك طلب حذف حسابك وبياناتك المرتبطة به عبر التواصل معنا.",
            "يمكنك استخدام التطبيق دون حساب؛ في هذه الحالة تبقى بياناتك على جهازك فقط.",
          ],
        },
        {
          title: "التواصل والتعديلات",
          body: [
            `لأي استفسار حول الخصوصية، راسلنا على: ${CONTACT_EMAIL}`,
            "قد نحدّث هذه السياسة من وقت لآخر. سننشر أي تغييرات على هذه الصفحة مع تاريخ التحديث.",
          ],
        },
      ],
    };
  }

  return {
    title: "Privacy Policy",
    lastUpdated: LAST_UPDATED.en,
    sections: [
      {
        title: "Introduction",
        body: [
          "Booklish (“we”) is a platform for learning English through reading stories. We respect your privacy and are committed to protecting your personal data.",
          "This policy explains what information we collect, how we use it, and what choices you have.",
        ],
      },
      {
        title: "Data we collect",
        body: [
          "Account data (optional): if you create an account, we collect your email and display name via Supabase Auth.",
          "Learning data: reading progress, saved words, quiz scores, streaks, and XP — stored locally in your browser and optionally synced when you sign in.",
          "Technical usage data: anonymized error logs to improve app stability.",
        ],
      },
      {
        title: "How we use data",
        body: [
          "We use your data to provide the learning experience: continue reading, save vocabulary, review words, and show statistics.",
          "We do not sell your personal data to third parties.",
          "We may use aggregated, non-identifiable data to improve content and performance.",
        ],
      },
      {
        title: "Local storage & cookies",
        body: [
          "Booklish uses localStorage in your browser to save your preferences (theme, language) and learning data.",
          "We may use essential cookies for session management when you sign in. See our Cookie Policy for details.",
        ],
      },
      {
        title: "Third-party services",
        body: [
          "We use Supabase for user authentication and synced data storage. Your data is also subject to Supabase’s privacy policy.",
          "Your browser may use built-in text-to-speech services; we do not send your text to our servers for pronunciation.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "You can delete local data by clearing your browser storage or resetting site settings.",
          "You may request deletion of your account and associated data by contacting us.",
          "You can use the app without an account; in that case your data stays on your device only.",
        ],
      },
      {
        title: "Contact & changes",
        body: [
          `For privacy questions, email us at: ${CONTACT_EMAIL}`,
          "We may update this policy from time to time. Changes will be posted on this page with an updated date.",
        ],
      },
    ],
  };
}

export function getTermsContent(lang: Lang): { title: string; lastUpdated: string; sections: LegalSection[] } {
  if (lang === "ar") {
    return {
      title: "شروط الاستخدام",
      lastUpdated: LAST_UPDATED.ar,
      sections: [
        {
          title: "قبول الشروط",
          body: [
            "باستخدامك لموقع Booklish، فإنك توافق على هذه الشروط. إذا لم توافق، يرجى عدم استخدام الخدمة.",
          ],
        },
        {
          title: "وصف الخدمة",
          body: [
            "Booklish يقدّم قصصاً قصيرة وأدوات تعلّم (ترجمة الكلمات، اختبارات، مراجعة، إحصائيات). المحتوى متاح مجاناً.",
            "قد نضيف أو نعدّل أو نوقف ميزات دون إشعار مسبق، مع محاولة الحفاظ على تجربة تعلّم مستقرة.",
          ],
        },
        {
          title: "الحسابات",
          body: [
            "إنشاء حساب اختياري. أنت مسؤول عن سرية كلمة المرور وعن أي نشاط يتم عبر حسابك.",
            "يجب أن تقدّم معلومات صحيحة عند التسجيل، وألا تنتحل شخصية غيرك.",
          ],
        },
        {
          title: "الاستخدام المقبول",
          body: [
            "يُمنع استخدام الخدمة لأغراض غير قانونية، أو محاولة اختراق الأنظمة، أو استخراج المحتوى بشكل آلي دون إذن.",
            "يُمنع نشر أو مشاركة محتوى مسيء أو ينتهك حقوق الآخرين عبر أي قناة مرتبطة بالخدمة.",
          ],
        },
        {
          title: "الملكية الفكرية",
          body: [
            "قصص Booklish وواجهته وتصميمه محمية بحقوق النشر. يُسمح بالاستخدام الشخصي للتعلّم فقط.",
            "لا يجوز نسخ أو إعادة توزيع أو بيع المحتوى دون موافقة خطية منا.",
          ],
        },
        {
          title: "إخلاء المسؤولية",
          body: [
            "الخدمة مقدّمة «كما هي» دون ضمانات. نسعى للدقة التعليمية لكن لا نضمن نتائج تعلّم محددة.",
            "قد تحتوي الترجمات والتعريفات على أخطاء؛ استخدمها كأداة مساعدة وليس مصدراً وحيداً.",
          ],
        },
        {
          title: "حدود المسؤولية",
          body: [
            "لن نكون مسؤولين عن أي أضرار غير مباشرة أو فقدان بيانات ناتج عن استخدامك للخدمة، ضمن الحدود التي يسمح بها القانون.",
          ],
        },
        {
          title: "التواصل",
          body: [
            `للاستفسارات القانونية: ${CONTACT_EMAIL}`,
            "قد نحدّث هذه الشروط؛ استمرارك في الاستخدام بعد التحديث يعني موافقتك على النسخة المحدّثة.",
          ],
        },
      ],
    };
  }

  return {
    title: "Terms of Service",
    lastUpdated: LAST_UPDATED.en,
    sections: [
      {
        title: "Acceptance",
        body: [
          "By using Booklish, you agree to these terms. If you do not agree, please do not use the service.",
        ],
      },
      {
        title: "Service description",
        body: [
          "Booklish provides short stories and learning tools (word lookup, quizzes, review, statistics). Content is free to use.",
          "We may add, modify, or discontinue features without prior notice, while aiming to keep a stable learning experience.",
        ],
      },
      {
        title: "Accounts",
        body: [
          "Creating an account is optional. You are responsible for your password and any activity under your account.",
          "You must provide accurate information when registering and must not impersonate others.",
        ],
      },
      {
        title: "Acceptable use",
        body: [
          "You may not use the service for illegal purposes, attempt to breach systems, or scrape content without permission.",
          "You may not post or share abusive content or content that infringes others’ rights through channels linked to the service.",
        ],
      },
      {
        title: "Intellectual property",
        body: [
          "Booklish stories, interface, and design are protected by copyright. Personal learning use is permitted.",
          "You may not copy, redistribute, or sell content without our written consent.",
        ],
      },
      {
        title: "Disclaimer",
        body: [
          "The service is provided “as is” without warranties. We strive for educational accuracy but do not guarantee specific learning outcomes.",
          "Translations and definitions may contain errors; use them as a learning aid, not as a sole authority.",
        ],
      },
      {
        title: "Limitation of liability",
        body: [
          "We are not liable for indirect damages or data loss arising from your use of the service, to the extent permitted by law.",
        ],
      },
      {
        title: "Contact",
        body: [
          `For legal inquiries: ${CONTACT_EMAIL}`,
          "We may update these terms; continued use after updates means you accept the revised version.",
        ],
      },
    ],
  };
}

export function getCookiesContent(lang: Lang): { title: string; lastUpdated: string; sections: LegalSection[] } {
  if (lang === "ar") {
    return {
      title: "سياسة ملفات تعريف الارتباط",
      lastUpdated: LAST_UPDATED.ar,
      sections: [
        {
          title: "ما هي ملفات تعريف الارتباط؟",
          body: [
            "ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يخزّنها المتصفح على جهازك. نستخدم أيضاً localStorage لتخزين بيانات التطبيق محلياً.",
          ],
        },
        {
          title: "ما الذي نستخدمه؟",
          body: [
            "ضرورية: للحفاظ على جلسة تسجيل الدخول عند استخدام حساب (عبر Supabase).",
            "تفضيلات: لحفظ السمة (فاتح/داكن) ولغة الواجهة (عربي/إنجليزي).",
            "تعلّم: لحفظ تقدّم القراءة والكلمات والإحصائيات على جهازك.",
          ],
        },
        {
          title: "كيف تتحكم بها؟",
          body: [
            "يمكنك حذف ملفات تعريف الارتباط وبيانات localStorage من إعدادات المتصفح.",
            "تعطيل التخزين المحلي قد يؤثر على عمل الميزات مثل متابعة القراءة وحفظ الكلمات.",
          ],
        },
        {
          title: "التواصل",
          body: [
            `للاستفسارات: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    };
  }

  return {
    title: "Cookie Policy",
    lastUpdated: LAST_UPDATED.en,
    sections: [
      {
        title: "What are cookies?",
        body: [
          "Cookies are small text files stored by your browser. We also use localStorage to keep app data on your device.",
        ],
      },
      {
        title: "What we use",
        body: [
          "Essential: to maintain your sign-in session when using an account (via Supabase).",
          "Preferences: to save theme (light/dark) and UI language (Arabic/English).",
          "Learning: to store reading progress, saved words, and statistics on your device.",
        ],
      },
      {
        title: "How to control them",
        body: [
          "You can delete cookies and localStorage data from your browser settings.",
          "Disabling local storage may affect features such as reading progress and saved vocabulary.",
        ],
      },
      {
        title: "Contact",
        body: [
          `Questions: ${CONTACT_EMAIL}`,
        ],
      },
    ],
  };
}
