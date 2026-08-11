import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setErr('')
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({ password })
    })
    const j = await r.json()
    if (r.ok) {
      router.push('/admin/dashboard')
    } else {
      setErr(j.error || 'Login failed')
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin sign in</h1>
      <form onSubmit={submit} className="space-y-3">
        <input type="password" placeholder="Admin password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
      </form>
      {err && <p className="mt-3 text-red-600">{err}</p>}
    </main>
  )
}
