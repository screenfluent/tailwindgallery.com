import { db, Users } from 'astro:db';

export default async function () {
  const now = new Date();
  
  // Create founder account
  await db.insert(Users).values([
    { 
      id: 1,
      username: 'szymon',
      email: 'szymon@tailwindgallery.com', // możesz zmienić na swój email
      displayName: 'Szymon',
      createdAt: now,
      lastActiveAt: now,
      role: 'admin',
      isFounder: true,
      isFeatured: true,
      invitesCount: 10, // startowa pula zaproszeń
      bio: 'Founder of TailwindGallery',
    },
  ]);
}