import { PrismaClient } from '@prisma/client';

// Map Netlify Neon env vars to Prisma expected DATABASE_URL at runtime if needed
if (!process.env.DATABASE_URL) {
  const pooled = process.env.NETLIFY_DATABASE_URL;
  const direct = process.env.NETLIFY_DATABASE_URL_UNPOOLED;
  if (pooled || direct) {
    process.env.DATABASE_URL = pooled || direct;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
