# Deployment Guide - Vercel

Полное руководство по развертыванию приложения Otkaz на платформе Vercel с PostgreSQL базой данных.

## Почему Vercel?

- **Создатели Next.js** - идеальная интеграция
- **Бесплатная PostgreSQL** - Vercel Postgres (на базе Neon)
- **Автоматические деплои** из Git
- **Serverless Functions** - оптимизированы для Next.js API routes
- **Нет проблем с базой данных** - всё работает из коробки

## Предварительные требования

- GitHub/GitLab/Bitbucket аккаунт
- Vercel аккаунт (бесплатный план подходит)
- Ваш код в Git репозитории

## Шаг 1: Создание проекта на Vercel

### Вариант A: Через Vercel Dashboard (Рекомендуется)

1. **Перейдите на [Vercel Dashboard](https://vercel.com/dashboard)**
   - Войдите с помощью GitHub/GitLab/Bitbucket
   
2. **Создайте новый проект:**
   - Нажмите **"Add New..."** → **"Project"**
   - Выберите ваш Git provider
   - Найдите и выберите репозиторий `Otkaz`
   
3. **Настройка деплоя:**
   - **Framework Preset:** Next.js (автоматически определится)
   - **Root Directory:** `./` (корень проекта)
   - **Build Command:** оставьте по умолчанию или используйте `npm run build`
   - **Output Directory:** `.next` (автоматически)
   
4. **НЕ НАЖИМАЙТЕ "Deploy" пока!** Сначала нужно настроить базу данных.

### Вариант B: Через Vercel CLI

```bash
# Установите Vercel CLI глобально
npm install -g vercel

# Войдите в Vercel
vercel login

# Перейдите в директорию проекта
cd "c:\WEB APPS\Final\Final-1\Otkaz"

# Инициализируйте проект (не деплоите пока)
vercel link
```

## Шаг 2: Настройка Vercel Postgres

### Через Vercel Dashboard

1. **Находясь в вашем проекте на Vercel:**
   - Перейдите во вкладку **"Storage"**
   
2. **Создайте Postgres базу данных:**
   - Нажмите **"Create Database"**
   - Выберите **"Postgres"**
   - Выберите регион (ближайший к вашим пользователям)
   - Нажмите **"Create"**
   
3. **Подключите к проекту:**
   - Vercel автоматически подключит базу данных
   - Нажмите **"Connect Project"**
   - Выберите ваш проект `Otkaz`
   - Нажмите **"Connect"**

4. **Проверьте Environment Variables:**
   - Перейдите **Settings** → **Environment Variables**
   - Должны появиться автоматически:
     - `POSTGRES_URL` - полный connection string
     - `POSTGRES_PRISMA_URL` - для Prisma (с connection pooling)
     - `POSTGRES_URL_NON_POOLING` - для миграций
     - `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`

### Через Vercel CLI

```bash
# Создайте Postgres базу данных
vercel storage create postgres

# Подключите к проекту
vercel link
```

## Шаг 3: Настройка дополнительных Environment Variables

В **Vercel Dashboard** → **Settings** → **Environment Variables**, добавьте:

| Variable | Value | Environments |
|----------|-------|--------------|
| `NEXTAUTH_SECRET` | (сгенерируйте случайную строку) | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | Production |
| `NEXTAUTH_URL` | `https://your-project-git-*.vercel.app` | Preview |
| `NEXTAUTH_URL` | `http://localhost:3000` | Development |

**Генерация NEXTAUTH_SECRET:**
```bash
# В PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Или онлайн
# https://generate-secret.vercel.app/32
```

## Шаг 4: Первый деплой

### Автоматический деплой (Рекомендуется)

1. **Убедитесь что все изменения закоммичены:**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Вернитесь в Vercel Dashboard:**
   - Нажмите **"Deploy"**
   - Или просто push в main branch автоматически запустит деплой

3. **Наблюдайте за процессом сборки:**
   - Vercel покажет real-time логи
   - Должны увидеть:
     - `Running "npm install"`
     - `Running "prisma generate"`
     - `Running "prisma migrate deploy"`
     - `Running "next build"`
     - `Build Completed`

4. **После успешного деплоя:**
   - Получите URL: `https://your-project.vercel.app`
   - Автоматически будет SSL сертификат

### Ручной деплой через CLI

```bash
# Деплой в продакшн
vercel --prod

# Или в preview
vercel
```

## Шаг 5: Применение миграций базы данных

Миграции применяются автоматически во время build процесса благодаря команде в `vercel.json`:

```json
{
  "buildCommand": "prisma generate && prisma migrate deploy && next build"
}
```

Если нужно применить миграции вручную:

```bash
# Используйте Vercel CLI с environment variables
vercel env pull .env.local
npx prisma migrate deploy
```

## Шаг 6: Проверка деплоя

### 1. Проверьте Build Logs

В Vercel Dashboard → Deployments → выберите деплой → Build Logs:
- ✅ Prisma migrations applied successfully
- ✅ Build completed
- ✅ No errors

### 2. Тестирование приложения

Посетите ваш Vercel URL и проверьте:
- ✅ Главная страница загружается
- ✅ Регистрация нового пользователя работает
- ✅ Авторизация работает
- ✅ Записи сохраняются в базу данных
- ✅ Все функции работают корректно

### 3. Проверьте базу данных

В Vercel Dashboard → Storage → ваша Postgres база:
- Откройте **Query** tab
- Выполните: `SELECT * FROM "User" LIMIT 5;`
- Проверьте что данные сохраняются

## Troubleshooting (Решение проблем)

### ❌ Ошибка: "DATABASE_URL is not defined"

**Проблема:** Environment variables не установлены.

**Решение:**
1. Проверьте Settings → Environment Variables
2. Убедитесь что `POSTGRES_PRISMA_URL` присутствует
3. Пересоздайте деплой (Deployments → нажмите три точки → Redeploy)

### ❌ Ошибка: "Migration failed"

**Проблема:** Не удалось применить миграции.

**Решение:**
1. Проверьте build logs на детали ошибки
2. Убедитесь что `prisma/migrations` папка в Git
3. Проверьте что `prisma/schema.prisma` корректен
4. Попробуйте применить миграции локально:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

### ❌ Ошибка: "Too many connections"

**Проблема:** Слишком много соединений с базой.

**Решение:**
- Vercel Postgres автоматически использует connection pooling
- Убедитесь что используется `POSTGRES_PRISMA_URL` (pooled), а не `POSTGRES_URL`
- В `lib/prisma.ts` уже настроено правильно

### ❌ Работает локально, но не на Vercel

**Чеклист:**
- [ ] Все environment variables установлены в Vercel
- [ ] `.env` НЕ закоммичен в Git (только `.env.example`)
- [ ] `prisma/migrations` папка в Git
- [ ] Node версия совпадает (20.x в `package.json` engines)
- [ ] Build logs не показывают ошибок
- [ ] Проверьте Function logs в Vercel для runtime ошибок

### ❌ Ошибка: "Function Execution Timeout"

**Проблема:** Serverless function выполняется слишком долго.

**Решение:**
1. В `vercel.json` увеличьте `maxDuration`:
   ```json
   {
     "functions": {
       "pages/api/**/*.ts": {
         "maxDuration": 10
       }
     }
   }
   ```
2. Оптимизируйте медленные запросы к базе данных

## Локальная разработка

### Вариант 1: С Vercel Postgres (Рекомендуется)

```bash
# Скачайте environment variables из Vercel
vercel env pull .env.local

# Установите зависимости
npm install

# Примените миграции
npx prisma migrate deploy

# Запустите dev server
npm run dev
```

### Вариант 2: С локальной PostgreSQL

1. **Установите PostgreSQL:**
   ```powershell
   # Windows (PowerShell as Administrator)
   winget install PostgreSQL.PostgreSQL
   ```

2. **Создайте базу данных:**
   ```bash
   # В psql
   CREATE DATABASE otkaz_dev;
   ```

3. **Настройте `.env.local`:**
   ```bash
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/otkaz_dev"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Примените миграции:**
   ```bash
   npx prisma migrate deploy
   npm run dev
   ```

## Управление базой данных

### Просмотр данных с Prisma Studio

```bash
# Локально
npx prisma studio

# С production базой
vercel env pull .env.local
npx prisma studio
```

Откроется UI на `http://localhost:5555`

### Создание новых миграций

```bash
# Измените prisma/schema.prisma
# Затем создайте миграцию
npx prisma migrate dev --name add_new_field

# Закоммитьте изменения
git add prisma/
git commit -m "Add new database migration"
git push

# Vercel автоматически применит миграцию при деплое
```

### Сброс базы данных (⚠️ Удаляет все данные!)

**Локально:**
```bash
npx prisma migrate reset
```

**На Vercel:**
1. Перейдите в Storage → ваша база
2. Во вкладке Query выполните:
   ```sql
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   ```
3. Пересоздайте деплой для применения миграций

## Custom Domain (Свой домен)

1. **В Vercel Dashboard → Settings → Domains:**
   - Нажмите **"Add Domain"**
   - Введите ваш домен: `example.com`
   
2. **Настройте DNS:**
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
   
3. **Обновите `NEXTAUTH_URL`:**
   - В Environment Variables
   - Измените на `https://example.com`
   - Redeploy проект

## Лучшие практики

1. **Git workflow:**
   - Используйте feature branches
   - Preview deployments для каждого PR автоматически
   - Merge в main = автоматический production deploy

2. **Environment Variables:**
   - Никогда не коммитьте `.env` в Git
   - Используйте Vercel Dashboard для управления secrets
   - Разные значения для Production/Preview/Development

3. **Мониторинг:**
   - Проверяйте Analytics в Vercel Dashboard
   - Настройте Vercel Monitoring для ошибок
   - Используйте Function Logs для отладки

4. **Безопасность:**
   - Регулярно обновляйте зависимости
   - Используйте сильные `NEXTAUTH_SECRET`
   - Включите Vercel Authentication для админ-функций

5. **Производительность:**
   - Используйте Vercel Edge Functions где возможно
   - Оптимизируйте изображения с Next.js Image
   - Включите ISR (Incremental Static Regeneration)

## Миграция с Netlify на Vercel

Если у вас уже есть данные на Netlify:

### 1. Экспорт данных из Neon (Netlify)

```bash
# Подключитесь к Netlify Neon database
# Получите connection string из Netlify Dashboard → Environment Variables

# Экспортируйте данные
pg_dump "postgresql://user:pass@host/db" > backup.sql
```

### 2. Импорт в Vercel Postgres

```bash
# Получите Vercel connection string
vercel env pull .env.local

# Импортируйте данные
psql "your-vercel-postgres-url" < backup.sql
```

### 3. Проверка

- Запустите приложение на Vercel
- Проверьте что все данные на месте
- Протестируйте все функции

### 4. Переключение DNS (если используется custom domain)

- Обновите DNS записи на Vercel
- Дождитесь распространения DNS (до 48 часов)
- Удалите проект с Netlify

## Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

## Поддержка

Если возникли проблемы:
1. Проверьте Build Logs в Vercel
2. Проверьте Function Logs для runtime ошибок
3. Используйте Vercel Community на GitHub Discussions
4. Проверьте [Vercel Status Page](https://www.vercel-status.com/)

---

**Готово!** 🎉 Ваше приложение теперь на Vercel со всеми преимуществами платформы от создателей Next.js.
