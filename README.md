# Yenga Experience — Hackathon MVP

This is a minimal Next.js + Tailwind + Supabase starter for collecting company assessments and viewing them in an admin dashboard.

Features
- Submit assessments (company name, score, comment, estimated weekly income, contact)
- Admin dashboard (password protected via env ADMIN_PASSWORD) with recent submissions and simple stats
- Quick deploy to Vercel + Supabase

Setup (local)
1. Create a Supabase project: https://app.supabase.com/
2. Go to SQL editor and run `supabase-setup.sql` to create the `assessments` table.
3. Get your project URL and anon key and service role key from Supabase Settings -> API.
4. Create a `.env.local` file (do not commit) and copy from `.env.example`. Fill keys:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - ADMIN_PASSWORD (set a strong password for admin)
5. Install and run locally:
   - npm install
   - npm run dev
6. Open http://localhost:3000

Deploy (Vercel)
1. Create a GitHub repo and push this code.
2. On Vercel, Import Project from GitHub.
3. In Vercel Project Settings -> Environment Variables add the same env vars as above (SUPABASE_SERVICE_ROLE_KEY must be added to Vercel as a secret and never exposed to client).
4. Deploy.

Admin
- Go to /admin/login and sign in with ADMIN_PASSWORD you set in env.
- After signing in you can view /admin/dashboard.

Security notes
- This uses a simple cookie-based admin check for speed. For production/hackathon winners, replace with Supabase Auth or NextAuth and proper session checks.
- Never expose SUPABASE_SERVICE_ROLE_KEY on client-side.

If you want, I can:
- Push this to your GitHub repo (give me owner/repo).
- Convert admin to Supabase Auth (create admin user flow) — takes ~20–30 minutes.
- Help set up the Vercel environment and deploy (I can guide each step).

Good next steps for hackathon
1. Push repo and create Supabase project (10–15 min).
2. Configure env in Vercel and deploy (10–15 min).
3. Test submit + admin dashboard.
4. If time permits: add Search, pagination, or CSV export for judges.

Good luck — tell me if you want me to push this to a repo (give owner/repo) or if you want the admin to use Supabase Auth and I’ll update the code and provide the steps.
