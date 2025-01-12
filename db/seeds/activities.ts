import { db, Activities } from 'astro:db';

export async function seedActivities() {
  // Create sample activities
  await db.insert(Activities).values({
    id: 1,
    type: 'website_submission',
    createdAt: new Date('2024-03-15'),
    userId: 1,
    websiteId: 1,
    metadata: { title: 'Turbo Build' },
    points: 10,
    isProcessed: true
  });

  // Add B&B claiming their website
  await db.insert(Activities).values({
    id: 2,
    type: 'website_claimed',
    createdAt: new Date('2024-03-14'),
    userId: 8, // bakkenbaeck user ID
    websiteId: 2,
    metadata: { 
      companyName: 'Bakken & Bæck',
      companyUrl: 'https://bakkenbaeck.com'
    },
    points: 15,
    isProcessed: true
  });

  // Add Digital Surgeons joining as expert
  await db.insert(Activities).values({
    id: 3,
    type: 'expert_joined',
    createdAt: new Date('2024-03-13'),
    userId: 6, // digitalsurgeons user ID
    metadata: { 
      companyName: 'Digital Surgeons',
      companyUrl: 'https://digitalsurgeons.com'
    },
    points: 20,
    isProcessed: true
  });

  // Tom submitting a website
  await db.insert(Activities).values({
    id: 4,
    type: 'website_submission',
    createdAt: new Date('2024-03-12'),
    userId: 5, // Tom's user ID
    websiteId: 3,
    metadata: { title: 'Awesome Tailwind Project' },
    points: 10,
    isProcessed: true
  });

  // Szymon adding tech stack
  await db.insert(Activities).values({
    id: 5,
    type: 'technology_added',
    createdAt: new Date('2024-03-11'),
    userId: 1,
    technologyId: 1,
    metadata: { name: 'Next.js' },
    points: 5,
    isProcessed: true
  });
} 