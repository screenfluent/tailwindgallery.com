import { db, Technologies } from 'astro:db';

export async function seedTechnologies(now: Date) {
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
} 