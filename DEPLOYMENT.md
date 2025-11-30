# Deployment Guide - Vercel

> **Note:** Это новое руководство для деплоя на Vercel. Старая инструкция по Netlify сохранена в `NETLIFY_DEPLOYMENT_OLD.md`.

См. подробное руководство: **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

## Быстрый старт

### 1. Создайте проект на Vercel

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в Vercel
vercel login

# Деплой проекта
vercel
```

### 2. Настройте Vercel Postgres

1. Откройте [Vercel Dashboard](https://vercel.com/dashboard)
2. Перейдите в **Storage** → **Create Database** → **Postgres**
3. Подключите к вашему проекту

### 3. Настройте Environment Variables

В Vercel Dashboard → Settings → Environment Variables:

- `NEXTAUTH_SECRET` - используйте `openssl rand -base64 32`
- `NEXTAUTH_URL` - `https://your-project.vercel.app`

### 4. Деплой

```bash
git push origin main
```

Vercel автоматически деплоит при каждом push!

## Преимущества Vercel

- ✅ Создатели Next.js - идеальная интеграция
- ✅ Бесплатная PostgreSQL база данных
- ✅ Автоматические деплои из Git
- ✅ Preview deployments для каждого PR
- ✅ Serverless Functions оптимизированы для Next.js
- ✅ Нет проблем с embedded базами данных

## Полная документация

См. [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) для:
- Пошаговых инструкций
- Настройки локальной разработки
- Troubleshooting
- Миграции с Netlify
- Best practices
