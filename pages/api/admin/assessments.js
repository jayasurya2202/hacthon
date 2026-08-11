import { getServerClient } from '../../../lib/supabase'

function isAdmin(req) {
  const cookie = req.headers.cookie || ''
  return cookie.includes('yenga_admin=1')
}

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })
  const supabase = getServerClient()

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('assessments').select('*').order('created_at', { ascending: false }).limit(100)
    if (error) return res.status(500).json({ error: error.message })

    // compute simple stats
    const scores = data.map(r => Number(r.score)).filter(n => !Number.isNaN(n))
    const avgScore = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(2) : null
    const incomes = data.map(r => {
      const s = String(r.estimated_weekly_income || '').replace(/[^0-9.]/g, '')
      const n = parseFloat(s)
      return Number.isFinite(n) ? n : null
    }).filter(n => n != null)
    const avgIncome = incomes.length ? (incomes.reduce((a,b)=>a+b,0)/incomes.length).toFixed(2) : null

    return res.status(200).json({ rows: data, stats: { avgScore, avgIncome } })
  }

  return res.status(405).json({ error: 'Only GET' })
}
