# SPK Siswa Berprestasi - Minimal Starter (Express + Tailwind + MySQL)

This repository is a **minimal, ready-to-run starter** for the "SPK Siswa Berprestasi" project using the SAW method.

## What included
- `backend/` : Express.js backend with JWT auth, basic CRUD endpoints, SAW service.
- `frontend/`: Simple static Tailwind CSS frontend (demo).
- `database/init.sql`: MySQL DDL and sample data.
- `.env.example`

## Quick start (local)
1. Setup MySQL and import `database/init.sql`
   - Create database and run the SQL to create tables and sample data.

2. Backend
```bash
cd backend
cp .env.example .env
# edit .env to match your MySQL credentials
npm install
npm start
```

3. Frontend
Open `frontend/index.html` in browser (or serve static files). The frontend asks for backend base URL (e.g. http://localhost:4000).

## Notes
- Sample admin / wali passwords in `init.sql` use bcrypt hash for `admin123`. Change immediately.
- SAW implementation is in `backend/src/services/sawService.js`.
- PDF generation is prepared (puppeteer dependency included) but not wired to a route in this minimal starter; you can add server-side rendering route using puppeteer + pug/handlebars.
- This starter aims to reduce boilerplate so you can extend features:
  - Add validations, file uploads, better frontend, pagination, role management, PDF reports, archives, logging.

If you want, I can now:
- Add full PDF report route using Puppeteer and a template.
- Build the admin frontend pages (user/criteria management).
- Package as ZIP and provide it (already prepared).

Admin:

username: admin

password: admin123

Wali (misal kelas 1):

username: wali1

password: wali123