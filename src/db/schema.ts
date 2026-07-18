import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  uid: text("uid").notNull().unique(),

  email: text("email").notNull().unique(),

  name: text("name"),

  phone: text("phone"),

  tier: text("tier").default("Signature").notNull(),

  points: integer("points").default(500).notNull(),

  cardId: text("card_id"),

  memberSince: text("member_since"),

  valetCode: text("valet_code"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: text("id").primaryKey(),

  userUid: text("user_uid")
    .references(() => users.uid, {
      onDelete: "cascade",
    })
    .notNull(),

  storeId: text("store_id"),

  storeName: text("store_name"),

  type: text("type").notNull(),

  date: text("date").notNull(),

  time: text("time").notNull(),

  status: text("status").default("confirmed").notNull(),

  notes: text("notes"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userUid],
    references: [users.uid],
  }),
}));
