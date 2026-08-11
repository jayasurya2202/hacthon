import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [rows, setRows] = useState([])
  const [stats, setStats] = useState(null)
  const [err, setErr] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const r = await fetch('/api/admin/assessments')
      if (r.status === 401) return router.push('/admin/login')
      const j = await r.json()
      if (!r.ok) { setErr(j.error || 'Error'); return }
      setRows(j.rows)
      setStats(j.stats)
    }
    load()
  }, [])

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {stats && (
        <div className="mb-4 space-x-4">
          <span className="px-3 py-1 bg-white rounded shadow">Avg score: {stats.avgScore ?? '-'}</span>
          <span className="px-3 py-1 bg-white rounded shadow">Avg weekly income: {stats.avgIncome ?? '-'}</span>
        </div>
      )}
      {err && <p className="text-red-600">{err}</p>}
      <div className="space-y-3">
        {rows.map(r => (
          <div key={r.id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between">
              <strong>{r.company_name}</strong>
              <span className="text-sm text-gray-600">{new Date(r.created_at).toLocaleString()}</span>
            </div>
            <div className="text-sm">Score: {r.score} — Income: {r.estimated_weekly_income}</div>
            {r.contact_email && <div className="text-sm">Contact: {r.contact_email}</div>}
            {r.comment && <p className="mt-2 text-gray-700">{r.comment}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}
