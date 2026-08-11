// Simple admin login using ADMIN_PASSWORD env. Sets a cookie `yenga_admin=1` on success.
// Not production-grade — ok for hackathon MVP.
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST' })
  const { password } = req.body
  if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: 'ADMIN_PASSWORD not set' })
  if (password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid password' })

  // Set a simple HTTP-only cookie (expires in 8 hours)
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString()
  res.setHeader('Set-Cookie', `yenga_admin=1; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${expires}`)
  return res.status(200).json({ success: true })
}
