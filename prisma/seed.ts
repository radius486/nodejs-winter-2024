import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create three dummy users
  const user1 = await prisma.user.upsert({
    where: { login: 'user_1' },
    update: {},
    create: {
      id: 'b2a93819-d28c-465c-9402-a612fec77f85',
      login: 'user_1',
      password: 'qwerty',
      version: 1,
      createdAt: 1733915529813,
      updatedAt: 1733915529813,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { login: 'user_2' },
    update: {},
    create: {
      id: 'ab702e67-e03d-4e32-98ae-5a29a9b1b3b3',
      login: 'user_2',
      password: 'qwerty123',
      version: 1,
      createdAt: 1733915529813,
      updatedAt: 1733915529813,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { login: 'user_3' },
    update: {},
    create: {
      id: '200ddd8e-3871-4095-a439-c40269aea4ef',
      login: 'user_3',
      password: 'asdfgh',
      version: 1,
      createdAt: 1733915529813,
      updatedAt: 1733915529813,
    },
  });

  console.log({ user1, user2, user3 });

  // create three dummy artists
  const artist1 = await prisma.artist.upsert({
    where: { id: '8f86d9c4-b057-47d2-aaf7-66c9945877e6' },
    update: {},
    create: {
      id: '8f86d9c4-b057-47d2-aaf7-66c9945877e6',
      name: 'Artist 1',
      grammy: true,
    },
  });

  const artist2 = await prisma.artist.upsert({
    where: { id: 'a9836edd-eb9e-4699-9e25-ae67c089bba3' },
    update: {},
    create: {
      id: 'a9836edd-eb9e-4699-9e25-ae67c089bba3',
      name: 'Artist 2',
      grammy: false,
    },
  });

  const artist3 = await prisma.artist.upsert({
    where: { id: '3f215d85-81f9-4a2b-842f-5ce418ff3006' },
    update: {},
    create: {
      id: '3f215d85-81f9-4a2b-842f-5ce418ff3006',
      name: 'Artist 3',
      grammy: true,
    },
  });

  console.log({ artist1, artist2, artist3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
