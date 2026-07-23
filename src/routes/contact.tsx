import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../integrations/supabase/client'


export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: 'اتصل بنا - Booklish' },
      {
        name: 'description',
        content: 'تواصل مع فريق Booklish لأي استفسار أو ملاحظة أو مشكلة تقنية.',
      },
    ],
  }),
})

function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
  'idle',
)
const [errorDetail, setErrorDetail] = useState('')


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) return

    setStatus('sending')
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message })

    if (error) {
  setErrorDetail(`${error.message} (code: ${error.code ?? 'unknown'})`)
  setStatus('error')
  return
}



    setStatus('sent')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-semibold text-[#9D381F] mb-6">اتصل بنا</h1>

      <p className="text-base leading-7 mb-8">
        عندك سؤال، اقتراح، أو واجهتك مشكلة تقنية؟ راسلنا مباشرة عبر النموذج
        تحت، أو على البريد{' '}
        <a
          href="mailto:booklish.app@gmail.com"
          className="text-[#9D381F] underline"
        >
          booklish.app@gmail.com
        </a>
      </p>

      {status === 'sent' ? (
        <div className="bg-[#FAF8F5] border border-[#9D381F]/20 rounded-lg p-6 text-center">
          <p className="text-[#9D381F] font-medium">
            تم إرسال رسالتك بنجاح، بنرد عليك قريبًا.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">الاسم</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9D381F]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9D381F]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">الرسالة</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9D381F]/40"
            />
          </div>

          {status === 'error' && (
  <p className="text-red-600 text-sm break-words">
    خطأ: {errorDetail}
  </p>
)}


          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-[#9D381F] text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {status === 'sending' ? 'جارٍ الإرسال...' : 'إرسال'}
          </button>
        </form>
      )}
    </div>
  )
}
