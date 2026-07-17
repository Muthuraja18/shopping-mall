import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  phone: text('phone'),
  tier: text('tier').default('Signature'), // 'Signature' | 'Elite' | 'Prestige' | 'Inner Circle'
  points: integer('points').default(500),
  cardId: text('card_id'),
  memberSince: text('member_since'),
  valetCode: text('valet_code'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(), // Generated random string ID
  userUid: text('user_uid')
    .references(() => users.uid)
    .notNull(),
  storeId: text('store_id'),
  storeName: text('store_name'),
  type: text('type').notNull(), // 'personal_shopper' | 'private_fitting' | 'champagne_service' | 'lounge_access' | 'valet_parking'
  date: text('date').notNull(),
  time: text('time').notNull(),
  status: text('status').default('confirmed'), // 'confirmed' | 'cancelled'
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userUid],
    references: [users.uid],
  }),
}));
