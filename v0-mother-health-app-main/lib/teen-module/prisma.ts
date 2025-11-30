import { PrismaClient } from '@/generated/client/client'

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

export const prisma = global.prisma ?? new PrismaClient({} as any)

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
