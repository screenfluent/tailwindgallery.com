import { db, Users, Invites, Websites, Technologies, WebsiteTechnologies } from 'astro:db';

export default async function () {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  // Create founder account
  await db.insert(Users).values([
    { 
      id: 1,
      username: 'szymon',
      email: 'szymon@tailwindgallery.com',
      displayName: 'Szymon',
      createdAt: now,
      lastActiveAt: now,
      role: 'admin',
      isFounder: true,
      isFeatured: true,
      invitesCount: 10,
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
      createdBy: 1,
      status: 'active',
    },
  ]);

  // Create initial technologies
  await db.insert(Technologies).values([
    {
      id: 1,
      name: 'Astro',
      slug: 'astro',
      category: 'Framework',
      type: 'Frontend',
      description: 'The web framework for content-driven websites',
      websiteUrl: 'https://astro.build',
      docsUrl: 'https://docs.astro.build',
      githubUrl: 'https://github.com/withastro/astro',
      createdAt: now,
      addedBy: 1,
      isApproved: true,
    },
    {
      id: 2,
      name: 'Tailwind CSS',
      slug: 'tailwindcss',
      category: 'Framework',
      type: 'Frontend',
      description: 'A utility-first CSS framework',
      websiteUrl: 'https://tailwindcss.com',
      docsUrl: 'https://tailwindcss.com/docs',
      githubUrl: 'https://github.com/tailwindlabs/tailwindcss',
      createdAt: now,
      addedBy: 1,
      isApproved: true,
    },
    {
      id: 3,
      name: 'TypeScript',
      slug: 'typescript',
      category: 'Language',
      type: 'Full Stack',
      description: 'JavaScript with syntax for types',
      websiteUrl: 'https://www.typescriptlang.org',
      docsUrl: 'https://www.typescriptlang.org/docs',
      githubUrl: 'https://github.com/microsoft/TypeScript',
      createdAt: now,
      addedBy: 1,
      isApproved: true,
    },
  ]);

  // Create a sample website
  await db.insert(Websites).values([
    {
      id: 1,
      url: 'https://tailwindgallery.com',
      title: 'Tailwind Gallery',
      description: 'A curated collection of beautiful websites built with Tailwind CSS',
      technologies: [],
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: true,
      claimedBy: 1,
      claimedAt: now,
      verificationMethod: 'founder',
    },
  ]);

  // Connect website with technologies
  await db.insert(WebsiteTechnologies).values([
    { id: 1, websiteId: 1, technologyId: 1, addedAt: now, addedBy: 1 }, // Astro
    { id: 2, websiteId: 1, technologyId: 2, addedAt: now, addedBy: 1 }, // Tailwind
    { id: 3, websiteId: 1, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript
  ]);
}