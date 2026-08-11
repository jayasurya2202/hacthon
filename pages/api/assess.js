import { getServerClient } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST' })
  const { company_name, score, comment, estimated_weekly_income, contact_email } = req.body
  if (!company_name || !score) return res.status(400).json({ error: 'Missing fields' })

  const supabase = getServerClient()
  const { data, error } = await supabase.from('assessments').insert([{
    company_name,
    score,
    comment,
    estimated_weekly_income,
    contact_email
  }]).select().limit(1)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true, row: data?.[0] ?? null })
}
