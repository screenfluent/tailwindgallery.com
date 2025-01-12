import { db, Users, Invites, Websites } from 'astro:db';

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

  // Create a sample website
  await db.insert(Websites).values([
    {
      id: 1,
      url: 'https://tailwindgallery.com',
      title: 'Tailwind Gallery',
      description: 'A curated collection of beautiful websites built with Tailwind CSS',
      technologies: ['Astro', 'Tailwind CSS', 'TypeScript'],
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved', // auto-approved bo founder
      isVerified: true, // auto-verified bo founder
      claimedBy: 1,
      claimedAt: now,
      verificationMethod: 'founder',
    },
  ]);
}