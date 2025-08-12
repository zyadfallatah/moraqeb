import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

// Users table for authentication
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }),
  ssn: varchar("ssn", { length: 10 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // Hashed password
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Types for TypeScript - making auto-increment fields optional for inserts
export type User = typeof users.$inferSelect;
export type NewUser = Omit<
  typeof users.$inferInsert,
  "id" | "createdAt" | "updatedAt" | "name"
>;
