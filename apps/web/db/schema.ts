import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { account } from "./auth-schema";

export * from "./auth-schema";

export const gmailWatch = pgTable("gmail_watch", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountId: text("account_id")
    .notNull()
    .unique()
    .references(() => account.id, { onDelete: "cascade" }),
  historyId: text("history_id").notNull(),
  expiration: timestamp("expiration").notNull(),
  topicName: text("topic_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const gmailWatchRelations = relations(gmailWatch, ({ one }) => ({
  account: one(account, {
    fields: [gmailWatch.accountId],
    references: [account.id],
  }),
}));
