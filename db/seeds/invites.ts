import { db, Invites } from 'astro:db';

export async function seedInvites(now: Date) {
  // Create a sample invite
  await db.insert(Invites).values([
    {
      id: 1,
      code: 'FOUNDER-TEST-INVITE',
      createdAt: now,
      expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdBy: 1,
      status: 'active',
    },
  ]);
} 