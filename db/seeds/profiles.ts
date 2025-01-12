import { db, Profiles } from 'astro:db';

export async function seedProfiles(now: Date) {
  // Create profiles
  await db.insert(Profiles).values([
    {
      // Szymon's owner profile
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
      // Szymon's expert profile
      id: 2,
      userId: 1,
      type: 'expert',
      createdAt: now,
      expertise: ['Astro', 'Tailwind CSS', 'TypeScript'],
      githubUrl: 'https://github.com/szymon',
      linkedinUrl: 'https://linkedin.com/in/szymon',
      isVerified: true,
      featuredOrder: 1,
    },
    {
      // Jarek's owner profile
      id: 3,
      userId: 4,
      type: 'owner',
      createdAt: now,
      ownedWebsites: [2, 3, 4], // Kerlig, Localcan, Webhook.Cool
      companyName: 'Kerlig',
      position: 'Founder',
      isVerified: true,
      featuredOrder: 1,
      status: 'active',
      metaTitle: 'Jarek Ceborski - Founder of Kerlig, Localcan, and Webhook.Cool',
      metaDescription: 'Designer turned founder building SaaS products that developers love. Creator of Kerlig, Localcan, and Webhook.Cool.',
    },
    {
      // Tom's expert profile
      id: 4,
      userId: 5,
      type: 'expert',
      createdAt: now,
      expertise: ['Tailwind CSS', 'React', 'Next.js', 'UI/UX Design'],
      hourlyRate: 150,
      availability: 'part-time',
      githubUrl: 'https://github.com/tomdev',
      linkedinUrl: 'https://linkedin.com/in/tomdev',
      showcaseProjects: [
        {
          title: 'E-commerce Dashboard',
          description: 'Complete dashboard with analytics, inventory management and order processing',
          technologies: ['Tailwind CSS', 'React', 'Next.js'],
          testimonial: {
            text: "Tom delivered an exceptional dashboard that exceeded our expectations.",
            author: "Sarah Johnson",
            role: "CPO at ShopCo"
          }
        }
      ],
      achievements: [
        {
          title: 'Tailwind CSS Certified Developer',
          description: 'Official certification from Tailwind Labs'
        },
        {
          title: 'Frontend Expert',
          description: '5+ years of experience in frontend development'
        }
      ],
      testimonials: [
        {
          text: "Working with Tom was a game-changer for our project. His Tailwind expertise saved us countless hours.",
          author: "Lisa Chen",
          role: "Tech Lead at BigCorp",
          project: "Internal Dashboard Redesign"
        }
      ],
      isVerified: true,
      featuredOrder: 1,
      status: 'active',
      metaTitle: 'Hire Expert Tailwind CSS Developer - Tom Wilson',
      metaDescription: 'Looking for a Tailwind CSS expert? I specialize in building beautiful, responsive websites with modern frontend technologies. View my portfolio and get in touch.',
    },
  ]);
} 