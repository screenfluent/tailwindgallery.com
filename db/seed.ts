import { db, Users, Invites } from 'astro:db';

export default async function () {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
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

  // Create a sample invite
  await db.insert(Invites).values([
    {
      id: 1,
      code: 'FOUNDER-TEST-INVITE',
      createdAt: now,
      expiresAt: thirtyDaysFromNow,
      createdBy: 1, // ID Szymona
      status: 'active',
    },
  ]);
}