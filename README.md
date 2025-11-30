# Static SPA (без сборки) для Netlify

## Быстрый деплой (Drag & Drop)
1. Скачайте ZIP из этого чата.
2. Распакуйте. Зайдите в папку `static-spa`.
3. Откройте https://app.netlify.com/drop и перетащите содержимое папки (не всю папку, а **внутренние файлы**).
4. Готово — получите URL вида `https://...netlify.app`.

> **Важно:** Netlify Drop поддерживает только статические сайты. Серверные функции не заработают.  
> Для SPA включены правила редиректа (`_redirects` и `netlify.toml`), чтобы прямые заходы на `/about` и т.п. работали.

## Структура
- `index.html` — ваш входной файл.
- `assets/style.css` — минимальные стили.
- `_redirects` и `netlify.toml` — перенаправление всех путей на `index.html`.

<<<<<<< Updated upstream
## Дальше
- Хотите React/Vite? Разместите сборку (папку `dist`) сюда — всё будет работать с теми же редиректами.
=======
## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Database:** PostgreSQL (via Vercel Postgres)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Animations:** Framer Motion

## Local Development Setup

### Prerequisites

- Node.js 20.x
- PostgreSQL 14+ (installed locally)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Otkaz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database:**
   ```bash
   # Create a new database
   psql -U postgres -c "CREATE DATABASE otkaz_dev;"
   ```

4. **Configure environment variables:**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Edit .env and update DATABASE_URL with your credentials
   # DATABASE_URL="postgresql://postgres:password@localhost:5432/otkaz_dev?schema=public"
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

6. **Seed the database (optional):**
   ```bash
   npm run db:seed
   ```

7. **Start development server:**
   ```bash
   npm run dev
   ```

8. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions with Vercel and Vercel Postgres.

**Quick steps:**
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Create Vercel Postgres database
4. Set environment variables (NEXTAUTH_SECRET, NEXTAUTH_URL)
5. Deploy automatically on every push

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:init` - Initialize database with migrations and seed
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio for database management

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility functions and services
├── pages/            # Next.js pages and API routes
│   └── api/         # API endpoints
├── prisma/          # Database schema and migrations
├── public/          # Static assets
└── scripts/         # Utility scripts
```

## Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXTAUTH_URL` - Application URL

For production on Vercel, `POSTGRES_PRISMA_URL` is automatically injected by Vercel Postgres.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
>>>>>>> Stashed changes
