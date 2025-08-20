import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  bigint,
  smallint,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const permissionEnum = pgEnum("permission", ["resident", "market"]);
export const noticeTypeEnum = pgEnum("notice_type", [
  "warning",
  "violation",
  "info",
]);

// Users table for authentication
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  ssn: varchar("ssn", { length: 10 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  birthDate: timestamp("birth_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Licenses table
export const licenses = pgTable("licenses", {
  licenseNumber: varchar("license_number", { length: 50 }).primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  district: varchar("district", { length: 100 }).notNull(),
  landNumber: bigint("land_number", { mode: "bigint" }).notNull(),
  licenseArea: bigint("license_area", { mode: "number" }).notNull(),
  permission: permissionEnum("permission").notNull(),
  north: smallint("north"),
  south: smallint("south"),
  east: smallint("east"),
  west: smallint("west"),
  createdAt: timestamp("created_at").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  longtitude: bigint("longtitude", { mode: "number" }).notNull(),
  latitude: bigint("latitude", { mode: "number" }).notNull(),
});

// Subscriptions table
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  licenseNumber: varchar("license_number", { length: 50 })
    .notNull()
    .references(() => licenses.licenseNumber),
  amount: integer("amount").notNull(),
  signDate: timestamp("sign_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
});

// Notices table
export const notices = pgTable("notices", {
  id: uuid("id").primaryKey().defaultRandom(),
  licenseNumber: varchar("license_number", { length: 50 })
    .notNull()
    .references(() => licenses.licenseNumber),
  type: noticeTypeEnum("type").notNull(),
  message: varchar("message", { length: 1000 }).notNull(),
  resolved: timestamp("resolved"),
  sentDate: timestamp("sent_date").defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  noticeId: uuid("notice_id")
    .notNull()
    .references(() => notices.id),
  message: varchar("message", { length: 1000 }).notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  licenses: many(licenses),
}));

export const licensesRelations = relations(licenses, ({ one, many }) => ({
  user: one(users, {
    fields: [licenses.userId],
    references: [users.id],
  }),
  subscriptions: many(subscriptions),
  notices: many(notices),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  license: one(licenses, {
    fields: [subscriptions.licenseNumber],
    references: [licenses.licenseNumber],
  }),
}));

export const noticesRelations = relations(notices, ({ one }) => ({
  license: one(licenses, {
    fields: [notices.licenseNumber],
    references: [licenses.licenseNumber],
  }),
}));

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = Omit<
  typeof users.$inferInsert,
  "id" | "createdAt" | "updatedAt"
>;

export type License = typeof licenses.$inferSelect;
export type NewLicense = Omit<
  typeof licenses.$inferInsert,
  "createdAt" | "lastUpdated"
>;

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = Omit<typeof subscriptions.$inferInsert, "id">;

export type Notice = typeof notices.$inferSelect;
export type NewNotice = Omit<typeof notices.$inferInsert, "id" | "sentDate">;

// Type for user data without password (used in responses and sessions)
export type UserWithoutPassword = Omit<User, "password">;
