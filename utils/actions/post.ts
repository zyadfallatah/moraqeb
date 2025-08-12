"use server";

import db from "@/database";
import { postsTable } from "@/database/schema";

export async function createPost(post: { title: string; description: string }) {
  const data = await db.insert(postsTable).values(post).returning();

  return data;
}
