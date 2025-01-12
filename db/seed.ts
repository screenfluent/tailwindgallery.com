import { seedUsers } from './seeds/users';
import { seedTechnologies } from './seeds/technologies';
import { seedWebsites } from './seeds/websites';
import { seedActivities } from './seeds/activities';
import { seedProfiles } from './seeds/profiles';
import { seedInvites } from './seeds/invites';

export default async function () {
  const now = new Date();

  // Seed all data in order
  await seedUsers(now);
  await seedTechnologies(now);
  await seedWebsites(now);
  await seedActivities();
  await seedProfiles(now);
  await seedInvites(now);
}