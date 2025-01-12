import { db, Users } from 'astro:db';

export async function seedUsers(now: Date) {
  // Create users with different roles
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
        'approve_websites',
        'edit_websites',
        'manage_tech',
        'manage_editors',
        'manage_claims',
        'feature_websites',
        'manage_monetization'
      ],
      profileTypes: ['owner', 'expert'],
      isFounder: true,
      bio: 'Founder of TailwindGallery',
    },
    // Sample website owner (not an expert, owns non-Tailwind websites)
    {
      id: 4,
      username: 'jarekceborski',
      email: 'jarek@ceborski.com',
      displayName: 'Jarek',
      createdAt: now,
      lastActiveAt: now,
      role: 'contributor',
      profileTypes: ['owner'],
      bio: 'Designer turned Founder',
      website: 'jarekceborski.com',
      twitterHandle: 'jarekceborski',
      seoTitle: 'Jarek Ceborski - Designer & Startup Founder',
      seoDescription: 'Designer turned founder of Kerlig, Localcan, and Webhook.Cool. Expert in product design and SaaS development.',
      invitedBy: 1,
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
        'edit_websites',
        'manage_tech',
        'manage_editors',
      ],
      invitedBy: 1,
      bio: 'TailwindGallery Admin',
    },
    // Sample editor account
    {
      id: 3,
      username: 'editor',
      email: 'editor@tailwindgallery.com',
      displayName: 'Editor',
      createdAt: now,
      lastActiveAt: now,
      role: 'editor',
      permissions: [
        'approve_websites',
        'edit_websites',
      ],
      invitedBy: 1,
      bio: 'TailwindGallery Editor',
    },
    // Sample Tailwind expert
    {
      id: 5,
      username: 'tomdev',
      email: 'tom@tailwindexpert.dev',
      displayName: 'Tom Wilson',
      createdAt: now,
      lastActiveAt: now,
      role: 'contributor',
      profileTypes: ['expert'],
      bio: 'Tailwind CSS Expert & Frontend Developer',
      website: 'tailwindexpert.dev',
      twitterHandle: 'tomtailwinddev',
      seoTitle: 'Tom Wilson - Tailwind CSS Expert & Frontend Developer',
      seoDescription: 'Specialized in building beautiful, responsive websites with Tailwind CSS. 5+ years of experience in frontend development and UI/UX design.',
      invitedBy: 1,
    },
    // Digital Surgeons (Expert Agency)
    {
      id: 6,
      username: 'digitalsurgeons',
      email: 'team@digitalsurgeons.com',
      displayName: 'Digital Surgeons',
      bio: 'Agency for design, dev & brand',
      location: 'Connecticut, United States',
      role: 'contributor',
      profileTypes: ['expert'],
      createdAt: now,
      lastActiveAt: now,
      invitedBy: 1
    },
    // Janis Verzemnieks (Expert)
    {
      id: 7,
      username: 'janis',
      email: 'janis@verzemnieks.dev',
      displayName: 'Janis Verzemnieks',
      bio: 'Independent design & brand',
      location: 'Riga, Latvia',
      role: 'contributor',
      profileTypes: ['expert'],
      createdAt: now,
      lastActiveAt: now,
      invitedBy: 1
    },
    // Bakken & Bæck (Expert Agency)
    {
      id: 8,
      username: 'bakkenbaeck',
      email: 'hello@bakkenbaeck.com',
      displayName: 'Bakken & Bæck',
      bio: 'Agency for design, dev, copy & brand',
      location: 'Oslo, Norway',
      role: 'contributor',
      profileTypes: ['expert'],
      createdAt: now,
      lastActiveAt: now,
      invitedBy: 1
    },
  ]);

  // Active Community Members
  await db.insert(Users).values([
    {
      id: 9,
      username: 'sarah_dev',
      email: 'sarah@example.com',
      displayName: 'Sarah Chen',
      bio: 'Frontend Developer passionate about clean UI',
      location: 'Vancouver, Canada',
      role: 'contributor',
      profileTypes: [],
      createdAt: now,
      lastActiveAt: now,
      totalSubmissions: 3,
      invitedBy: 1 // Szymon
    },
    {
      id: 10,
      username: 'mikejones',
      email: 'mike@example.com',
      displayName: 'Mike Jones',
      bio: 'UI/UX Designer & Developer',
      location: 'London, UK',
      role: 'contributor',
      profileTypes: [],
      createdAt: now,
      lastActiveAt: now,
      totalSubmissions: 5,
      invitedBy: 1
    },
    {
      id: 11,
      username: 'julia_codes',
      email: 'julia@example.com',
      displayName: 'Julia Santos',
      bio: 'Full-stack dev with love for Tailwind',
      location: 'São Paulo, Brazil',
      role: 'editor',
      profileTypes: [],
      createdAt: now,
      lastActiveAt: now,
      totalSubmissions: 8,
      invitedBy: 1
    }
  ]);
} 