import { db, Users } from 'astro:db';

export default async function () {
  // Example seeding two user rows
  await db.insert(Users).values([
    { 
      id: 1, 
      username: 'john_smith', 
      email: 'john@example.com',
      createdAt: new Date()
    },
    { 
      id: 2, 
      username: 'jane_doe', 
      email: 'jane@example.com',
      createdAt: new Date()
    },
  ]);
}