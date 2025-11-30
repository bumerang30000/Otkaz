import { PrismaClient } from '@prisma/client';

// Map Vercel/Netlify database env vars to Prisma expected DATABASE_URL at runtime
if (!process.env.DATABASE_URL) {
  // Vercel Postgres (preferred)
  const vercelPooled = process.env.POSTGRES_PRISMA_URL;
  // Netlify Neon (legacy support)
  const netlifyPooled = process.env.NETLIFY_DATABASE_URL;
  const netlifyDirect = process.env.NETLIFY_DATABASE_URL_UNPOOLED;
  
  // Priority: Vercel > Netlify pooled > Netlify direct
  if (vercelPooled) {
    process.env.DATABASE_URL = vercelPooled;
  } else if (netlifyPooled || netlifyDirect) {
    process.env.DATABASE_URL = netlifyPooled || netlifyDirect;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
