import { useEffect, useState } from 'react'

const CONSENT_KEY = 'booklish.cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      dir="rtl"
      className="fixed bottom-0 inset-x-0 z-[100] bg-white border-t border-gray-200 shadow-lg px-4 py-4"
    >
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-gray-700 flex-1 text-center sm:text-right">
          نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك وتحليل استخدام
          الموقع. بمتابعتك تصفح الموقع، فإنك توافق على استخدامها.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700"
          >
            رفض
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-lg bg-[#9D381F] text-white font-medium"
          >
            موافق
          </button>
        </div>
      </div>
    </div>
  )
}
