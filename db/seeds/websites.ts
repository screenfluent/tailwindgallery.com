import { db, Websites, WebsiteTechnologies } from 'astro:db';

export async function seedWebsites(now: Date) {
  // Create a sample website (TailwindGallery)
  await db.insert(Websites).values([
    {
      id: 1,
      url: 'https://tailwindgallery.com',
      title: 'Tailwind Gallery',
      description: 'A curated collection of beautiful websites built with Tailwind CSS',
      usesTailwind: true,
      showcaseType: 'tailwind',
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

  // Create Jarek's websites (portfolio only, no Tailwind)
  await db.insert(Websites).values([
    {
      id: 2,
      url: 'https://kerlig.com',
      title: 'Kerlig',
      description: 'AI writing assistant for modern teams',
      usesTailwind: false,
      showcaseType: 'portfolio',
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
      usesTailwind: false,
      showcaseType: 'portfolio',
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
      usesTailwind: false,
      showcaseType: 'portfolio',
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
  ]);

  // Create real Tailwind websites examples (curated by Szymon)
  await db.insert(Websites).values([
    {
      id: 5,
      url: 'https://turbo.build',
      title: 'Turbo - Make Ship Happen',
      description: 'High-performance build system for JavaScript and TypeScript codebases, trusted by Vercel, AWS, Microsoft, Netflix, and more.',
      usesTailwind: true,
      showcaseType: 'product',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: true,
      isFeatured: true,
    },
    {
      id: 6,
      url: 'https://www.loom.com',
      title: 'Loom - Video Messaging for Work',
      description: 'Record and share video messages of your screen, cam, or both. Faster than typing an email or meeting live.',
      usesTailwind: true,
      showcaseType: 'saas',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: true,
      isFeatured: true,
    },
    {
      id: 7,
      url: 'https://www.theverge.com',
      title: 'The Verge',
      description: 'Leading technology news website covering the intersection of technology, science, art, and culture.',
      usesTailwind: true,
      showcaseType: 'media',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: true,
      isFeatured: true,
    },
    {
      id: 8,
      url: 'https://www.wander.com',
      title: 'Wander - Smart Vacation Homes',
      description: 'Book beautiful smart homes in inspiring locations. Work from anywhere with reliable WiFi, monitors, and more.',
      usesTailwind: true,
      showcaseType: 'marketplace',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: true,
      isFeatured: true,
    },
    {
      id: 9,
      url: 'https://tuple.app',
      title: 'Tuple - Remote Pair Programming',
      description: 'The best remote pair programming app for serious developers. Low-latency remote control, HD video, and crystal-clear audio.',
      usesTailwind: true,
      showcaseType: 'developer-tool',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: true,
      isFeatured: true,
    },
    {
      id: 10,
      url: 'https://buymeacoffee.com',
      title: 'Buy Me a Coffee',
      description: 'A simple, meaningful way to fund your creative work. Accept donations, memberships, and sell digital products.',
      usesTailwind: true,
      showcaseType: 'platform',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: true,
      isFeatured: true,
    }
  ]);

  // Connect Tailwind websites with their technologies
  await db.insert(WebsiteTechnologies).values([
    // Turbo
    { id: 4, websiteId: 5, technologyId: 4, addedAt: now, addedBy: 1 }, // React
    { id: 5, websiteId: 5, technologyId: 5, addedAt: now, addedBy: 1 }, // Next.js
    { id: 6, websiteId: 5, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript

    // Loom
    { id: 7, websiteId: 6, technologyId: 4, addedAt: now, addedBy: 1 }, // React
    { id: 8, websiteId: 6, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript
    { id: 9, websiteId: 6, technologyId: 6, addedAt: now, addedBy: 1 }, // GraphQL

    // The Verge
    { id: 10, websiteId: 7, technologyId: 5, addedAt: now, addedBy: 1 }, // Next.js
    { id: 11, websiteId: 7, technologyId: 4, addedAt: now, addedBy: 1 }, // React
    { id: 12, websiteId: 7, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript

    // Wander
    { id: 13, websiteId: 8, technologyId: 5, addedAt: now, addedBy: 1 }, // Next.js
    { id: 14, websiteId: 8, technologyId: 4, addedAt: now, addedBy: 1 }, // React
    { id: 15, websiteId: 8, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript

    // Tuple
    { id: 16, websiteId: 9, technologyId: 4, addedAt: now, addedBy: 1 }, // React
    { id: 17, websiteId: 9, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript
    { id: 18, websiteId: 9, technologyId: 7, addedAt: now, addedBy: 1 }, // Electron

    // Buy Me a Coffee
    { id: 19, websiteId: 10, technologyId: 5, addedAt: now, addedBy: 1 }, // Next.js
    { id: 20, websiteId: 10, technologyId: 4, addedAt: now, addedBy: 1 }, // React
    { id: 21, websiteId: 10, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript
  ]);
} 