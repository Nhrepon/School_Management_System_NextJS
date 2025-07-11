import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


// let prisma: PrismaClient

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined
//   }
  
//   if (!globalForPrisma.prisma) {
//     globalForPrisma.prisma = new PrismaClient()
//   }
//   prisma = globalForPrisma.prisma
// }

// export default prisma