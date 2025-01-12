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

  // Connect TailwindGallery with technologies (since it's claimed & verified)
  await db.insert(WebsiteTechnologies).values([
    { id: 1, websiteId: 1, technologyId: 1, addedAt: now, addedBy: 1 }, // Astro
    { id: 2, websiteId: 1, technologyId: 2, addedAt: now, addedBy: 1 }, // Tailwind
    { id: 3, websiteId: 1, technologyId: 3, addedAt: now, addedBy: 1 }, // TypeScript
  ]);

  // Create Jarek's websites (portfolio only, unclaimed)
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
      isVerified: false,
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
      isVerified: false,
      isFeatured: true,
    },
  ]);

  // Create real Tailwind websites examples (curated by Szymon, but unclaimed)
  await db.insert(Websites).values([
    {
      id: 4,
      url: 'https://turbo.build',
      title: 'Turbo - Make Ship Happen',
      description: 'High-performance build system for JavaScript and TypeScript codebases.',
      usesTailwind: true,
      showcaseType: 'product',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: false,
      isFeatured: true,
    },
    {
      id: 5,
      url: 'https://www.loom.com',
      title: 'Loom - Video Messaging for Work',
      description: 'Record and share video messages of your screen, cam, or both.',
      usesTailwind: true,
      showcaseType: 'saas',
      createdAt: now,
      updatedAt: now,
      submittedBy: 1,
      status: 'approved',
      isVerified: false,
      isFeatured: true,
    }
  ]);
} 