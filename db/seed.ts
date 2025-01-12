import { db, Users, Invites, Websites, Technologies, WebsiteTechnologies, Activities } from 'astro:db';

export default async function () {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  // Create founder account (superadmin)
  await db.insert(Users).values([
    { 
      id: 1,
      username: 'szymon',
      email: 'szymon@tailwindgallery.com',
      displayName: 'Szymon',
      createdAt: now,
      lastActiveAt: now,
      role: 'superadmin',
      permissions: [
        'manage_users',
        'manage_roles',
        'approve_websites',
        'edit_tech',
        'manage_invites',
        'feature_content',
        'manage_monetization',
      ],
      isFounder: true,
      isFeatured: true,
      invitesCount: 10,
      bio: 'Founder of TailwindGallery',
    },
    // Sample admin account
    {
      id: 2,
      username: 'admin',
      email: 'admin@tailwindgallery.com',
      displayName: 'Admin',
      createdAt: now,
      lastActiveAt: now,
      role: 'admin',
      permissions: [
        'approve_websites',
        'edit_tech',
        'manage_invites',
      ],
      invitedBy: 1,
      invitesCount: 5,
      bio: 'TailwindGallery Admin',
    },
    // Sample moderator account
    {
      id: 3,
      username: 'moderator',
      email: 'mod@tailwindgallery.com',
      displayName: 'Moderator',
      createdAt: now,
      lastActiveAt: now,
      role: 'moderator',
      permissions: [
        'review_websites',
        'review_tech',
      ],
      invitedBy: 1,
      invitesCount: 2,
      bio: 'TailwindGallery Moderator',
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

  // Create sample activities
  await db.insert(Activities).values([
    {
      id: 1,
      type: 'submit_website',
      createdAt: now,
      userId: 1,
      websiteId: 1,
      points: 100,
      metadata: {
        action: 'submit',
        status: 'approved',
      },
      isProcessed: true,
    },
    {
      id: 2,
      type: 'claim_website',
      createdAt: now,
      userId: 1,
      websiteId: 1,
      points: 50,
      metadata: {
        method: 'founder',
        status: 'verified',
      },
      isProcessed: true,
    },
    {
      id: 3,
      type: 'add_technology',
      createdAt: now,
      userId: 1,
      websiteId: 1,
      technologyId: 1,
      points: 10,
      metadata: {
        techName: 'Astro',
        action: 'add',
      },
      isProcessed: true,
    },
  ]);
}