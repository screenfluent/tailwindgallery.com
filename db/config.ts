import { defineDb, defineTable, column } from 'astro:db';

const Users = defineTable({
  columns: {
    // Basic info
    id: column.number({ primaryKey: true }),
    email: column.text(),
    username: column.text(),
    createdAt: column.date(),
    
    // Profile
    displayName: column.text({ optional: true }),
    avatar: column.text({ optional: true }),
    bio: column.text({ optional: true }),
    website: column.text({ optional: true }),
    
    // Role & Status
    role: column.text({ default: 'contributor' }), // superadmin/admin/editor/contributor
    permissions: column.json({ default: [] }), // ['approve_websites', 'edit_websites', etc.]
    status: column.text({ default: 'active' }), // active/inactive
    invitedBy: column.number({ optional: true }),
    
    // Profile Types (można mieć kilka)
    profileTypes: column.json({ default: [] }), // ['owner', 'expert', 'instructor', etc.]
    
    // Activity
    lastActiveAt: column.date(),
    contributionScore: column.number({ default: 0 }),
    
    // Special flags
    isFounder: column.boolean({ default: false }),
  },
});

const Invites = defineTable({
  columns: {
    // Basic info
    id: column.number({ primaryKey: true }),
    code: column.text(), // unikalny kod zaproszenia
    createdAt: column.date(),
    expiresAt: column.date(),
    
    // Relations
    createdBy: column.number(), // ID usera który stworzył zaproszenie
    usedBy: column.number({ optional: true }), // ID usera który użył (null jeśli nie użyte)
    
    // Status
    status: column.text({ default: 'active' }), // active/used/expired
  },
});

const Websites = defineTable({
  columns: {
    // Basic info
    id: column.number({ primaryKey: true }),
    url: column.text(),
    title: column.text(),
    description: column.text(),
    thumbnail: column.text({ optional: true }),
    
    // Tech Stack
    technologies: column.json(), // ['Next.js', 'Tailwind', 'HTMX', etc.]
    
    // Claim & Ownership
    claimedBy: column.number({ optional: true }), // ID usera który przejął kontrolę
    claimedAt: column.date({ optional: true }),
    verificationMethod: column.text({ optional: true }), // 'dns', 'meta-tag', etc.
    isVerified: column.boolean({ default: false }),
    
    // Business & Monetization
    isFeatured: column.boolean({ default: false }),
    isBoosted: column.boolean({ default: false }),
    boostExpiresAt: column.date({ optional: true }),
    sponsorshipType: column.text({ optional: true }), // 'regular', 'exclusive', 'founding'
    
    // Metadata & Stats
    createdAt: column.date(),
    updatedAt: column.date(),
    status: column.text({ default: 'pending' }), // pending/approved/rejected
    submittedBy: column.number(), // ID usera
    views: column.number({ default: 0 }),
    upvotes: column.number({ default: 0 }),
    downvotes: column.number({ default: 0 }),
    score: column.number({ default: 0 }),
    
    // Moderation
    moderatedBy: column.number({ optional: true }), // ID moderatora który sprawdził
    moderatedAt: column.date({ optional: true }),
    moderationNote: column.text({ optional: true }), // notatka od moderatora
    needsSuperAdminReview: column.boolean({ default: false }), // czy wymaga twojego spojrzenia
  },
});

const Technologies = defineTable({
  columns: {
    // Basic info
    id: column.number({ primaryKey: true }),
    name: column.text(), // np. 'Next.js', 'Astro'
    slug: column.text(), // np. 'nextjs', 'astro' (do URL-i)
    
    // Categorization
    category: column.text(), // 'Framework', 'Library', 'Tool', etc.
    type: column.text(), // 'Frontend', 'Backend', 'Full Stack', etc.
    
    // Details
    description: column.text({ optional: true }),
    websiteUrl: column.text({ optional: true }),
    docsUrl: column.text({ optional: true }),
    githubUrl: column.text({ optional: true }),
    icon: column.text({ optional: true }),
    
    // Stats & Metadata
    createdAt: column.date(),
    addedBy: column.number(), // ID usera
    isApproved: column.boolean({ default: false }),
    usageCount: column.number({ default: 0 }), // ile stron używa tej technologii
    
    // Moderation
    moderatedBy: column.number({ optional: true }),
    moderatedAt: column.date({ optional: true }),
    moderationNote: column.text({ optional: true }),
    needsSuperAdminReview: column.boolean({ default: false }),
  },
});

// Junction table for many-to-many relationship between Websites and Technologies
const WebsiteTechnologies = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    websiteId: column.number(),
    technologyId: column.number(),
    addedAt: column.date(),
    addedBy: column.number(), // ID usera który dodał tę technologię do strony
  },
});

const Activities = defineTable({
  columns: {
    // Basic info
    id: column.number({ primaryKey: true }),
    type: column.text(), // submit_website, vote, add_tech, claim_website, etc.
    createdAt: column.date(),
    
    // Who did it
    userId: column.number(),
    
    // What was affected (tylko jedno z tych będzie używane, reszta null)
    websiteId: column.number({ optional: true }),
    technologyId: column.number({ optional: true }),
    inviteId: column.number({ optional: true }),
    
    // Additional data as JSON
    metadata: column.json(), // np. { vote: 'up', oldStatus: 'pending', newStatus: 'approved' }
    
    // Points & Rewards
    points: column.number({ default: 0 }), // ile punktów za tę aktywność
    isProcessed: column.boolean({ default: false }), // czy punkty zostały już dodane do usera
  },
});

// Różne typy profili użytkowników
const Profiles = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number(),
    type: column.text(), // owner/expert/instructor/etc.
    createdAt: column.date(),
    
    // Owner Profile
    ownedWebsites: column.json({ optional: true }), // [websiteId1, websiteId2]
    companyName: column.text({ optional: true }),
    position: column.text({ optional: true }),
    
    // Expert Profile
    expertise: column.json({ optional: true }), // ['Next.js', 'Tailwind', etc.]
    hourlyRate: column.number({ optional: true }),
    availability: column.text({ optional: true }), // 'full-time', 'part-time', etc.
    githubUrl: column.text({ optional: true }),
    linkedinUrl: column.text({ optional: true }),
    
    // Instructor Profile
    coursesCreated: column.number({ optional: true }),
    totalStudents: column.number({ optional: true }),
    teachingExperience: column.text({ optional: true }),
    
    // Wspólne pola
    isVerified: column.boolean({ default: false }),
    featuredOrder: column.number({ optional: true }), // do sortowania na stronie
    status: column.text({ default: 'active' }),
  },
});

export default defineDb({
  tables: { Users, Invites, Websites, Technologies, WebsiteTechnologies, Activities, Profiles },
});