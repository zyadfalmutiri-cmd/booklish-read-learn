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

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function stripDuplicateHeading(heading: string, content: string): string {
  const normHeading = normalize(heading).replace(/\s+/g, ' ')
  if (!normHeading || normHeading.length < 3) return content

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
  if (firstIdx === -1) return content

  const secondIdx = normalized.indexOf(normHeading, firstIdx + normHeading.length)
  if (secondIdx === -1) return content

  const secondEndNormIdx = secondIdx + normHeading.length - 1
  const cutIndex = indexMap[secondEndNormIdx] + 1

  let rest = content.slice(cutIndex)
  rest = rest.replace(/^[\s\n]+/, '')
  return rest
}

export const Route = createFileRoute('/admin/fix-headings')({
  component: FixHeadingsPage,
})

function FixHeadingsPage() {
  const [previews, setPreviews] = useState<FixPreview[]>([])
  const [loading, setLoading] = useState(false)
  const [applying, setApplying] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  async function scan() {
    setLoading(true)
    const { data, error } = await supabase
      .from('library_chapters')
      .select('id, book_slug, chapter_index, heading, content')
      .order('book_slug', { ascending: true })
      .order('chapter_index', { ascending: true })

    if (error) {
      alert('خطأ بجلب البيانات: ' + error.message)
      setLoading(false)
      return
    }

    const rows = (data ?? []) as ChapterRow[]
    const results: FixPreview[] = rows.map((row) => {
      const fixed = stripDuplicateHeading(row.heading, row.content)
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
    setLoading(false)
  }

  async function applyFixes() {
    if (!confirm(`راح يتم تعديل ${selected.size} فصل. متأكد؟`)) return
    setApplying(true)

    const { data, error } = await supabase
      .from('library_chapters')
      .select('id, heading, content')
      .in('id', Array.from(selected))

    if (error || !data) {
      alert('خطأ: ' + error?.message)
      setApplying(false)
      return
    }

    for (const row of data as { id: string; heading: string; content: string }[]) {
      const fixed = stripDuplicateHeading(row.heading, row.content)
      const { error: updateError } = await supabase
        .from('library_chapters')
        .update({ content: fixed })
        .eq('id', row.id)
      if (updateError) {
        console.error(`فشل تحديث ${row.id}:`, updateError.message)
      }
    }

    setApplying(false)
    alert('تم التطبيق')
    setPreviews([])
  }

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        فحص تكرار العناوين بالفصول
      </h1>

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

      {previews.length > 0 && (
        <>
          <p style={{ marginBottom: '1rem' }}>
            لقيت {previews.length} فصل فيه تكرار. الفصول المحددة (✓) هي اللي بتتصلح.
          </p>

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
            {applying ? 'جاري التطبيق...' : `طبّق التعديل (${selected.size})`}
          </button>
        </>
      )}
    </div>
  )
}
