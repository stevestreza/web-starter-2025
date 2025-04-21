import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.user.deleteMany()

  // Create test user if not in production
  if (process.env.NODE_ENV !== 'production') {
    const hashedPassword = await argon2.hash('test', {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4
    })

    const testUser = await prisma.user.create({
      data: {
        email: 'test@test.com',
        username: 'test',
        password: hashedPassword
      }
    })

    console.log('Created test user:', testUser.username)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
