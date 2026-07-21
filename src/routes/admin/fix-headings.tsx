import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface ChapterRow {
  id: string
  book_slug: string
  chapter_index: number
  heading: string
  content: string
}

interface FixPreview {
  id: string
  book_slug: string
  chapter_index: number
  heading: string
  originalStart: string
  fixedStart: string
  changed: boolean
}

// يشيل أول فقرة لو كانت "HEADING: Title" وبعدها فقرة ثانية = "Title" بس (مكررة)
function stripLeadingDuplicateParagraphs(heading: string, content: string): string {
  const paragraphs = content.split(/\n{2,}/)
  if (paragraphs.length < 2) return content

  const para0 = paragraphs[0].trim()
  const para1 = paragraphs[1]?.trim() ?? ''

  // حالة 1: "II: The Raid" ثم "The Raid" (نمط Memoirs)
  const prefixPattern = new RegExp(`^${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*(.+)$`, 'i')
  const match = para0.match(prefixPattern)
  if (match) {
    const titleAfterColon = match[1].trim()
    if (para1 && titleAfterColon.toLowerCase() === para1.toLowerCase()) {
      return paragraphs.slice(2).join('\n\n').replace(/^\s+/, '')
    }
  }

  // حالة 2: النمط العادي (heading يتكرر داخل أول 600 حرف)
  const normHeading = heading.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  if (normHeading.length >= 3) {
    const searchWindow = content.slice(0, 600)
    let normalized = ''
    const indexMap: number[] = []
    for (let i = 0; i < searchWindow.length; i++) {
      const ch = searchWindow[i]
      if (/[a-zA-Z0-9]/.test(ch)) {
        normalized += ch.toLowerCase()
        indexMap.push(i)
      } else if (/\s/.test(ch) && normalized.length && normalized[normalized.length - 1] !== ' ') {
        normalized += ' '
        indexMap.push(i)
      }
    }
    const firstIdx = normalized.indexOf(normHeading)
    if (firstIdx !== -1) {
      const secondIdx = normalized.indexOf(normHeading, firstIdx + normHeading.length)
      if (secondIdx !== -1) {
        const secondEndNormIdx = secondIdx + normHeading.length - 1
        const cutIndex = indexMap[secondEndNormIdx] + 1
        let rest = content.slice(cutIndex)
        rest = rest.replace(/^[\s\n]+/, '')
        return rest
      }
    }
  }

  return content
}

export const Route = createFileRoute('/admin/fix-headings')({
  component: FixHeadingsPage,
})

function FixHeadingsPage() {
  const [previews, setPreviews] = useState<FixPreview[]>([])
  const [loading, setLoading] = useState(false)
  const [applying, setApplying] = useState(false)
  const [progress, setProgress] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bookFilter, setBookFilter] = useState('')
  const [copied, setCopied] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [scannedCount, setScannedCount] = useState(0)

  async function scan() {
    setLoading(true)
    setErrorMsg('')
    try {
      let query = supabase
        .from('library_chapters')
        .select('id, book_slug, chapter_index, heading, content')
        .order('book_slug', { ascending: true })
        .order('chapter_index', { ascending: true })

      if (bookFilter.trim()) {
        query = query.eq('book_slug', bookFilter.trim())
      }

      const { data, error } = await query

      if (error) {
        setErrorMsg('خطأ من Supabase: ' + error.message)
        setLoading(false)
        return
      }

      const rows = (data ?? []) as ChapterRow[]
      setScannedCount(rows.length)

      const results: FixPreview[] = rows.map((row) => {
        const fixed = stripLeadingDuplicateParagraphs(row.heading, row.content)
        return {
          id: row.id,
          book_slug: row.book_slug,
          chapter_index: row.chapter_index,
          heading: row.heading,
          originalStart: row.content.slice(0, 150),
          fixedStart: fixed.slice(0, 150),
          changed: fixed !== row.content,
        }
      })

      setPreviews(results.filter((r) => r.changed))
      setSelected(new Set(results.filter((r) => r.changed).map((r) => r.id)))
    } catch (err) {
      setErrorMsg('استثناء غير متوقع: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  async function applyFixes() {
    if (!confirm(`راح يتم تعديل ${selected.size} فصل. متأكد؟`)) return
    setApplying(true)
    setErrorMsg('')

    try {
      const ids = Array.from(selected)

      const { data, error } = await supabase
        .from('library_chapters')
        .select('id, heading, content')
        .in('id', ids)

      if (error || !data) {
        setErrorMsg('خطأ: ' + error?.message)
        setApplying(false)
        return
      }

      let done = 0
      for (const row of data as { id: string; heading: string; content: string }[]) {
        const fixed = stripLeadingDuplicateParagraphs(row.heading, row.content)
        const { error: updateError } = await supabase
          .from('library_chapters')
          .update({ content: fixed })
          .eq('id', row.id)

        done++
        setProgress(`${done} / ${data.length}`)

        if (updateError) {
          console.error(`فشل تحديث ${row.id}:`, updateError.message)
        }
      }

      setProgress('')
      alert('تم التطبيق')
      setPreviews([])
    } catch (err) {
      setErrorMsg('استثناء غير متوقع أثناء التطبيق: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setApplying(false)
    }
  }

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function copyResults() {
    const text = previews
      .map(
        (p) =>
          `الكتاب: ${p.book_slug} — فصل ${p.chapter_index} — ${p.heading}\n` +
          `قبل: ${p.originalStart}...\n` +
          `بعد: ${p.fixedStart}...\n` +
          `---`
      )
      .join('\n\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert('فشل النسخ، جرب تحديد النص يدويًا')
    }
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        فحص تكرار العناوين بالفصول
      </h1>

      <input
        type="text"
        placeholder="book_slug (اختياري، فاضي = كل الكتب)"
        value={bookFilter}
        onChange={(e) => setBookFilter(e.target.value)}
        style={{
          display: 'block',
          width: '100%',
          padding: '0.5rem',
          marginBottom: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: 6,
        }}
      />

      <button
        onClick={scan}
        disabled={loading}
        style={{
          padding: '0.6rem 1.2rem',
          background: '#9D381F',
          color: 'white',
          borderRadius: 8,
          marginBottom: '1rem',
        }}
      >
        {loading ? 'جاري الفحص...' : 'ابدأ الفحص'}
      </button>

      {errorMsg && (
        <div style={{ padding: '1rem', background: '#5a1a1a', color: 'white', borderRadius: 8, marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}

      {!loading && scannedCount > 0 && (
        <p style={{ marginBottom: '1rem', color: '#888' }}>
          تم فحص {scannedCount} فصل إجمالاً.
        </p>
      )}

      {previews.length > 0 && (
        <>
          <p style={{ marginBottom: '1rem' }}>
            لقيت {previews.length} فصل فيه تكرار. الفصول المحددة (✓) هي اللي بتتصلح.
          </p>

          <button
            onClick={copyResults}
            style={{
              padding: '0.5rem 1rem',
              background: '#444',
              color: 'white',
              borderRadius: 8,
              marginBottom: '1rem',
              marginRight: '0.5rem',
            }}
          >
            {copied ? '✓ تم النسخ' : 'انسخ النتايج'}
          </button>

          {previews.map((p) => (
            <div
              key={p.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '1rem',
                marginBottom: '0.75rem',
              }}
            >
              <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => toggleSelected(p.id)}
                />
                <strong>{p.book_slug}</strong> — فصل {p.chapter_index} — {p.heading}
              </label>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>قبل:</div>
              <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{p.originalStart}...</div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>بعد:</div>
              <div style={{ fontSize: '0.85rem', color: '#2a7a2a' }}>{p.fixedStart}...</div>
            </div>
          ))}

          <button
            onClick={applyFixes}
            disabled={applying || selected.size === 0}
            style={{
              padding: '0.6rem 1.2rem',
              background: '#2a7a2a',
              color: 'white',
              borderRadius: 8,
            }}
          >
            {applying ? `جاري التطبيق... ${progress}` : `طبّق التعديل (${selected.size})`}
          </button>
        </>
      )}
    </div>
  )
}
