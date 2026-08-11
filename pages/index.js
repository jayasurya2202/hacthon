import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({
    company_name: '',
    score: 5,
    comment: '',
    estimated_weekly_income: '',
    contact_email: ''
  })
  const [status, setStatus] = useState('')

  async function submit(e) {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const r = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form)
      })
      const j = await r.json()
      if (r.ok) setStatus('Submitted — thanks!')
      else setStatus('Error: ' + (j.error || 'unknown'))
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Yenga Experience — Assess a Company</h1>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Company name" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} className="w-full p-2 border rounded" />
        <div className="flex items-center gap-2">
          <label>Score (1-10)</label>
          <input type="number" min="1" max="10" value={form.score} onChange={e => setForm({ ...form, score: Number(e.target.value) })} className="w-20 p-2 border rounded" />
        </div>
        <input placeholder="Estimated weekly income (e.g. $2000)" value={form.estimated_weekly_income} onChange={e => setForm({ ...form, estimated_weekly_income: e.target.value })} className="w-full p-2 border rounded" />
        <input placeholder="Contact email (optional)" value={form.contact_email} onChange={e => setForm({ ...form, contact_email: e.target.value })} className="w-full p-2 border rounded" />
        <textarea placeholder="Comment" value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
      <p className="mt-4">{status}</p>

      <hr className="my-6" />
      <p className="text-sm text-gray-600">Admin? <a className="text-blue-600" href="/admin/login">Sign in</a> to view assessments and stats.</p>
    </main>
  )
}
