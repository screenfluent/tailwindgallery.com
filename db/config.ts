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
    role: column.text({ default: 'contributor' }), // admin/contributor
    status: column.text({ default: 'active' }), // active/inactive/dormant
    invitedBy: column.number({ optional: true }), // ID of the user who invited them
    
    // Activity metrics
    lastActiveAt: column.date(),
    invitesCount: column.number({ default: 0 }),
    totalVotes: column.number({ default: 0 }),
    contributionScore: column.number({ default: 0 }),
    
    // Special flags
    isFounder: column.boolean({ default: false }),
    isFeatured: column.boolean({ default: false }),
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
  },
});

export default defineDb({
  tables: { Users, Invites, Websites },
});