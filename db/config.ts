import { defineDb, defineTable, column } from 'astro:db';

/**
 * Users table - stores all user accounts and their basic information
 */
const Users = defineTable({
  columns: {
    // Basic user information
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }), // User's email address for notifications and login
    username: column.text(), // Used in URL: tailwindgallery.com/@username, must be unique
    createdAt: column.date(), // When the user account was created
    
    // Public profile information
    displayName: column.text(), // Public name, can be different from username
    avatar: column.text({ optional: true }), // URL to user's avatar image
    bio: column.text({ optional: true }), // Short biography or description
    website: column.text({ optional: true }), // Personal website URL
    location: column.text({ optional: true }), // City, Country format
    
    // SEO & Social media profiles
    seoTitle: column.text({ optional: true }), // Custom title for profile page
    seoDescription: column.text({ optional: true }), // Custom meta description for profile page
    twitterHandle: column.text({ optional: true }), // Twitter username without @
    githubHandle: column.text({ optional: true }), // GitHub username
    linkedinHandle: column.text({ optional: true }), // LinkedIn username or full URL
    
    // Portfolio & Content showcase
    featuredWebsites: column.json({ default: [] }), // Array of website IDs to feature on profile
    showcaseOrder: column.json({ default: [] }), // Array defining section order on profile page
    customSections: column.json({ default: [] }), // Array of custom sections with title and content
    
    // Role & Access management
    role: column.text(), // User's primary role in the system
    permissions: column.json({ default: [] }), // Array of permission keys for granular access control
    status: column.text({ default: 'active' }), // User account status
    invitedBy: column.number({ optional: true }), // User ID of the inviter
    
    // Profile type management
    profileTypes: column.json({ default: [] }), // Array of user's profile types (can have multiple)
    
    // Activity tracking & Gamification
    lastActiveAt: column.date(), // Last user activity timestamp
    contributionScore: column.number({ default: 0 }), // Total points from all activities
    totalSubmissions: column.number({ default: 0 }), // Total number of submitted websites
    totalApprovedSubmissions: column.number({ default: 0 }), // Number of approved submissions
    
    // Special user flags
    isFounder: column.boolean({ default: false }), // Indicates original platform founder
  },
});

/**
 * Invites table - manages invite-only registration system
 */
const Invites = defineTable({
  columns: {
    // Basic invite information
    id: column.number({ primaryKey: true }),
    code: column.text(), // Unique invite code for registration
    createdAt: column.date(), // When the invite was created
    expiresAt: column.date(), // When the invite expires
    
    // Invite relationships
    createdBy: column.number(), // User ID who created the invite
    usedBy: column.number({ optional: true }), // User ID who used the invite (null if unused)
    
    // Invite status tracking
    status: column.text({ default: 'active' }), // Current invite status
  },
});

/**
 * Websites table - stores all website submissions and their details
 */
const Websites = defineTable({
  columns: {
    // Basic website information
    id: column.number({ primaryKey: true }),
    url: column.text(), // Full website URL
    title: column.text(), // Website title
    description: column.text(), // Website description
    thumbnail: column.text({ optional: true }), // URL to website screenshot/preview
    
    // Technology stack
    technologies: column.json(), // Array of technology IDs used on the website
    usesTailwind: column.boolean({ default: false }), // Whether the site uses Tailwind CSS
    showcaseType: column.text({ default: 'portfolio' }), // Type of showcase listing
    
    // Ownership & Verification
    claimedBy: column.number({ optional: true }), // User ID who claimed ownership
    claimedAt: column.date({ optional: true }), // When the website was claimed
    verificationMethod: column.text({ optional: true }), // Method used for ownership verification
    isVerified: column.boolean({ default: false }), // Whether ownership is verified
    
    // Business features & Monetization
    isFeatured: column.boolean({ default: false }), // Manually featured by admin
    isBoosted: column.boolean({ default: false }), // Paid promotion
    boostExpiresAt: column.date({ optional: true }), // When the boost expires
    sponsorshipType: column.text({ optional: true }), // Type of sponsorship
    
    // Metadata & Statistics
    createdAt: column.date(), // When the website was submitted
    updatedAt: column.date(), // Last update timestamp
    status: column.text({ default: 'pending' }), // Current moderation status
    submittedBy: column.number(), // User ID who submitted
    views: column.number({ default: 0 }), // Page view counter
    upvotes: column.number({ default: 0 }), // Number of upvotes
    downvotes: column.number({ default: 0 }), // Number of downvotes
    score: column.number({ default: 0 }), // Calculated engagement score
    
    // Moderation & Review
    moderatedBy: column.number({ optional: true }), // User ID who moderated
    moderatedAt: column.date({ optional: true }), // When it was moderated
    moderationNote: column.text({ optional: true }), // Internal note for moderation team
    needsSuperAdminReview: column.boolean({ default: false }), // Flagged for founder review
  },
});

/**
 * Technologies table - stores all technology options for website stack
 */
const Technologies = defineTable({
  columns: {
    // Basic technology information
    id: column.number({ primaryKey: true }),
    name: column.text(), // Technology name (e.g., 'Next.js', 'Astro')
    slug: column.text(), // URL-friendly name (e.g., 'nextjs', 'astro')
    
    // Technology categorization
    category: column.text(), // Technology category
    type: column.text(), // Technology type
    
    // Detailed information
    description: column.text({ optional: true }), // Technology description
    websiteUrl: column.text({ optional: true }), // Official website URL
    docsUrl: column.text({ optional: true }), // Documentation URL
    githubUrl: column.text({ optional: true }), // GitHub repository URL
    icon: column.text({ optional: true }), // URL to technology icon
    
    // Usage & Metadata
    createdAt: column.date(), // When the technology was added
    addedBy: column.number(), // User ID who added it
    isApproved: column.boolean({ default: false }), // Whether it's approved for use
    usageCount: column.number({ default: 0 }), // Number of websites using it
    
    // Moderation & Review
    moderatedBy: column.number({ optional: true }), // User ID who reviewed
    moderatedAt: column.date({ optional: true }), // When it was reviewed
    moderationNote: column.text({ optional: true }), // Internal moderation note
    needsSuperAdminReview: column.boolean({ default: false }), // Flagged for founder review
  },
});

/**
 * WebsiteTechnologies table - manages many-to-many relationship between websites and technologies
 */
const WebsiteTechnologies = defineTable({
  columns: {
    // Relationship identifiers
    id: column.number({ primaryKey: true }),
    websiteId: column.number(), // Reference to Websites table
    technologyId: column.number(), // Reference to Technologies table
    
    // Metadata
    addedAt: column.date(), // When the technology was added to website
    addedBy: column.number(), // User ID who added the connection
  },
});

/**
 * Activities table - tracks all user actions for gamification and moderation
 */
const Activities = defineTable({
  columns: {
    // Basic activity information
    id: column.number({ primaryKey: true }),
    type: column.text(), // Type of activity performed
    createdAt: column.date(), // When the activity occurred
    
    // Activity performer
    userId: column.number(), // User who performed the activity
    
    // Related content (only one will be used per activity)
    websiteId: column.number({ optional: true }), // Related website ID
    technologyId: column.number({ optional: true }), // Related technology ID
    inviteId: column.number({ optional: true }), // Related invite ID
    
    // Additional activity data
    metadata: column.json(), // Flexible data storage for activity details
    
    // Gamification
    points: column.number({ default: 0 }), // Points awarded for activity
    isProcessed: column.boolean({ default: false }), // Whether points were added to user score
  },
});

/**
 * Profiles table - manages different profile types for users (owner/expert/contributor)
 */
const Profiles = defineTable({
  columns: {
    // Basic profile information
    id: column.number({ primaryKey: true }),
    userId: column.number(), // Reference to Users table
    type: column.text(), // Profile type
    createdAt: column.date(), // When the profile was created
    
    // Website owner specific fields
    ownedWebsites: column.json({ optional: true }), // Array of owned website IDs
    companyName: column.text({ optional: true }), // Company/Organization name
    position: column.text({ optional: true }), // Role in company
    
    // Expert specific fields
    expertise: column.json({ optional: true }), // Array of technology expertise
    hourlyRate: column.number({ optional: true }), // Consulting rate
    availability: column.text({ optional: true }), // Current availability status
    githubUrl: column.text({ optional: true }), // GitHub profile URL
    linkedinUrl: column.text({ optional: true }), // LinkedIn profile URL
    
    // Portfolio & Achievements
    showcaseProjects: column.json({ optional: true }), // Array of featured projects
    testimonials: column.json({ optional: true }), // Array of client testimonials
    achievements: column.json({ optional: true }), // Array of certifications/awards
    blogPosts: column.json({ optional: true }), // Array of blog post URLs
    speakingEngagements: column.json({ optional: true }), // Array of speaking events
    
    // SEO Optimization
    metaTitle: column.text({ optional: true }), // Profile-specific SEO title
    metaDescription: column.text({ optional: true }), // Profile-specific meta description
    canonicalUrl: column.text({ optional: true }), // Original profile URL if cross-posted
    
    // Status & Visibility
    isVerified: column.boolean({ default: false }), // Whether profile is verified
    featuredOrder: column.number({ optional: true }), // Order in featured lists
    status: column.text({ default: 'active' }), // Current profile status
  },
});

export default defineDb({
  tables: { Users, Invites, Websites, Technologies, WebsiteTechnologies, Activities, Profiles },
});