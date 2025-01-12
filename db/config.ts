import { defineDb, defineTable, column } from 'astro:db';

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    username: column.text(),
    email: column.text(),
    createdAt: column.date(),
  },
});

export default defineDb({
  tables: { Users },
});