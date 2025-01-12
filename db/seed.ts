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

  // Create a sample website (TailwindGallery)
  await db.insert(Websites).values([
    {
      id: 1,
      url: 'https://tailwindgallery.com',
      title: 'Tailwind Gallery',
      description: 'A curated collection of beautiful websites built with Tailwind CSS',
      technologies: [],
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

  // Create Jarek's websites (portfolio only, no Tailwind)
  await db.insert(Websites).values([
    {
      id: 2,
      url: 'https://kerlig.com',
      title: 'Kerlig',
      description: 'AI writing assistant for modern teams',
      technologies: [],
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
      technologies: [],
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
      technologies: [],
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

  // Create Jarek's owner profile (not expert, since he doesn't offer Tailwind services)
  await db.insert(Profiles).values([
    {
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
  ]);

  // Create Tom's portfolio websites (all using Tailwind)
  await db.insert(Websites).values([
    {
      id: 5,
      url: 'https://acme-saas.com',
      title: 'Acme SaaS Platform',
      description: 'Modern SaaS dashboard built with Tailwind CSS',
      technologies: [],
      usesTailwind: true,
      showcaseType: 'tailwind',
      createdAt: now,
      updatedAt: now,
      submittedBy: 5,
      status: 'approved',
      isVerified: true,
      claimedBy: 5,
      claimedAt: now,
      verificationMethod: 'dns',
      isFeatured: true,
    },
    {
      id: 6,
      url: 'https://startup-landing.com',
      title: 'StartupLanding Template',
      description: 'High-converting landing page template built with Tailwind',
      technologies: [],
      usesTailwind: true,
      showcaseType: 'tailwind',
      createdAt: now,
      updatedAt: now,
      submittedBy: 5,
      status: 'approved',
      isVerified: true,
      claimedBy: 5,
      claimedAt: now,
      verificationMethod: 'dns',
      isFeatured: true,
    },
  ]);

  // Create Tom's expert profile
  await db.insert(Profiles).values([
    {
      id: 4,
      userId: 5,
      type: 'expert',
      createdAt: now,
      expertise: ['Tailwind CSS', 'React', 'Next.js', 'UI/UX Design'],
      hourlyRate: 150, // USD per hour
      availability: 'part-time', // Currently available for projects
      githubUrl: 'https://github.com/tomdev',
      linkedinUrl: 'https://linkedin.com/in/tomdev',
      showcaseProjects: [
        {
          title: 'Acme SaaS Platform',
          description: 'Complete SaaS platform with dashboard, settings, and user management',
          url: 'https://acme-saas.com',
          technologies: ['Tailwind CSS', 'React', 'Next.js'],
          testimonial: {
            text: "Tom delivered an exceptional dashboard that our users love. His Tailwind expertise made the UI both beautiful and performant.",
            author: "Sarah Johnson",
            role: "CPO at Acme"
          }
        },
        {
          title: 'StartupLanding Template',
          description: 'High-converting landing page with advanced Tailwind animations',
          url: 'https://startup-landing.com',
          technologies: ['Tailwind CSS', 'Alpine.js'],
          testimonial: {
            text: "The landing page Tom built helped us increase conversions by 64%. His attention to detail is amazing.",
            author: "Mike Smith",
            role: "Founder at StartupCo"
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