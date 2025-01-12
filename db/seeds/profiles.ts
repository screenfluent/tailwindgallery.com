import { db, Profiles } from 'astro:db';

export async function seedProfiles(now: Date) {
  await db.insert(Profiles).values([
    // Expert Profile: Indie Developer
    {
      id: 1,
      userId: 5, // Tom Wilson
      type: 'expert',
      createdAt: now,
      expertise: ['tailwind', 'react', 'next.js'],
      startingPrice: {
        amount: 2000,
        currency: 'USD',
        type: 'starting_at'
      },
      services: [
        {
          title: "Tailwind Migration Expert",
          description: "I'll help migrate your existing CSS/SCSS to clean, maintainable Tailwind classes",
          tags: ["migration", "tailwind", "optimization"]
        },
        {
          title: "Custom Tailwind Components",
          description: "Building reusable component libraries with Tailwind CSS",
          tags: ["components", "design-system"]
        }
      ],
      availability: 'available',
      showcaseProjects: [
        {
          title: "E-commerce Redesign",
          description: "Complete migration from Bootstrap to Tailwind CSS",
          url: "https://example.com/case-study-1"
        }
      ],
      testimonials: [
        {
          author: "Sarah Johnson",
          company: "TechCorp",
          text: "Tom delivered exceptional work migrating our platform to Tailwind CSS"
        }
      ],
      githubUrl: "https://github.com/tomwilson",
      linkedinUrl: "https://linkedin.com/in/tomwilson",
      isVerified: true,
      status: 'active'
    },

    // Expert Profile: Agency
    {
      id: 2,
      userId: 8, // Bakken & Bæck
      type: 'expert',
      createdAt: now,
      companyName: "Bakken & Bæck",
      expertise: ['tailwind', 'design-systems', 'enterprise'],
      startingPrice: {
        type: 'contact_for_pricing'
      },
      services: [
        {
          title: "Enterprise Tailwind Implementation",
          description: "Full-scale Tailwind CSS implementation for large organizations",
          tags: ["enterprise", "migration", "training"]
        },
        {
          title: "Tailwind Design System",
          description: "Custom design system development with Tailwind CSS",
          tags: ["design-system", "components"]
        }
      ],
      availability: 'available',
      showcaseProjects: [
        {
          title: "Fortune 500 Design System",
          description: "Enterprise-wide Tailwind CSS implementation",
          url: "https://example.com/case-study-2"
        }
      ],
      testimonials: [
        {
          author: "John Smith",
          company: "Enterprise Co",
          text: "B&B transformed our development workflow with Tailwind"
        }
      ],
      githubUrl: "https://github.com/bakkenbaeck",
      linkedinUrl: "https://linkedin.com/company/bakkenbaeck",
      isVerified: true,
      featuredOrder: 1,
      status: 'active'
    },

    // Expert Profile: Independent Consultant
    {
      id: 3,
      userId: 4, // Jarek
      type: 'expert',
      createdAt: now,
      expertise: ['tailwind', 'performance', 'accessibility'],
      startingPrice: {
        amount: 3000,
        currency: 'USD',
        type: 'starting_at'
      },
      services: [
        {
          title: "Tailwind Performance Optimization",
          description: "Optimize your Tailwind setup for maximum performance",
          tags: ["performance", "optimization"]
        },
        {
          title: "Accessible Tailwind Components",
          description: "Building accessible, reusable Tailwind components",
          tags: ["accessibility", "components"]
        }
      ],
      availability: 'available',
      showcaseProjects: [
        {
          title: "SaaS Platform Optimization",
          description: "50% reduction in CSS bundle size with Tailwind",
          url: "https://example.com/case-study-3"
        }
      ],
      testimonials: [
        {
          author: "Emily Chen",
          company: "StartupX",
          text: "Jarek's Tailwind expertise helped us achieve our performance goals"
        }
      ],
      githubUrl: "https://github.com/jarek",
      linkedinUrl: "https://linkedin.com/in/jarek",
      isVerified: true,
      status: 'active'
    }
  ]);
} 