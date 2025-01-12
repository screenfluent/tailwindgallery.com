import { db, Users, Invites, Websites, Technologies, WebsiteTechnologies, Activities, Profiles } from 'astro:db';

export default async function () {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
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
    // Sample expert contributor
    {
      id: 4,
      username: 'jarekceborski',
      email: 'jarek@ceborski.com',
      displayName: 'Jarek',
      createdAt: now,
      lastActiveAt: now,
      role: 'contributor',
      profileTypes: ['owner', 'expert'],
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

  // Create profiles
  await db.insert(Profiles).values([
    {
      // Twój profil właściciela
      id: 1,
      userId: 1,
      type: 'owner',
      createdAt: now,
      ownedWebsites: [1], // ID TailwindGallery
      companyName: 'TailwindGallery',
      position: 'Founder',
      isVerified: true,
      featuredOrder: 1,
    },
    {
      // Twój profil eksperta
      id: 2,
      userId: 1,
      type: 'expert',
      createdAt: now,
      expertise: ['Astro', 'Tailwind CSS', 'TypeScript'],
      githubUrl: 'https://github.com/szymon', // zmień na swój
      linkedinUrl: 'https://linkedin.com/in/szymon', // zmień na swój
      isVerified: true,
      featuredOrder: 1,
    },
  ]);

  // Create Jarek's websites
  await db.insert(Websites).values([
    {
      id: 2,
      url: 'https://kerlig.com',
      title: 'Kerlig',
      description: 'AI writing assistant for modern teams',
      technologies: [],
      createdAt: now,
      updatedAt: now,
      submittedBy: 4,
      status: 'approved',
      isVerified: true,
      claimedBy: 4,
      claimedAt: now,
      verificationMethod: 'dns',
      isFeatured: true,
    },
    {
      id: 3,
      url: 'https://localcan.com',
      title: 'Localcan',
      description: '#1 Ngrok alternative for developers',
      technologies: [],
      createdAt: now,
      updatedAt: now,
      submittedBy: 4,
      status: 'approved',
      isVerified: true,
      claimedBy: 4,
      claimedAt: now,
      verificationMethod: 'dns',
      isFeatured: true,
    },
    {
      id: 4,
      url: 'https://webhook.cool',
      title: 'Webhook.Cool',
      description: 'Free webhook tester for developers',
      technologies: [],
      createdAt: now,
      updatedAt: now,
      submittedBy: 4,
      status: 'approved',
      isVerified: true,
      claimedBy: 4,
      claimedAt: now,
      verificationMethod: 'dns',
    },
  ]);

  // Create Jarek's expert profile
  await db.insert(Profiles).values([
    {
      id: 3,
      userId: 4,
      type: 'expert',
      createdAt: now,
      expertise: ['Product Design', 'SaaS', 'Startup Development'],
      githubUrl: 'https://github.com/jarekceborski',
      linkedinUrl: 'https://linkedin.com/in/jarekceborski',
      showcaseProjects: [
        {
          title: 'Kerlig',
          description: 'AI writing assistant built with modern tech stack',
          url: 'https://kerlig.com',
          technologies: ['AI', 'SaaS']
        },
        {
          title: 'Localcan',
          description: 'Modern alternative to Ngrok for local development',
          url: 'https://localcan.com',
          technologies: ['Developer Tools']
        },
        {
          title: 'Webhook.Cool',
          description: 'Simple and free webhook testing tool',
          url: 'https://webhook.cool',
          technologies: ['Developer Tools']
        }
      ],
      achievements: [
        {
          title: 'Founded Multiple SaaS Products',
          description: 'Successfully launched Kerlig, Localcan, and Webhook.Cool'
        }
      ],
      isVerified: true,
      featuredOrder: 1,
      status: 'active',
    },
  ]);
}