"use server";

import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createNotebook = async (values: InsertNotebook) => {
  try {
    await db.insert(notebooks).values(values);
    return { success: true, message: "Notebook created successfully" };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to create notebook";
    return { success: false, message: errMsg };
  }
};

export const getNotebook = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const userId = session?.user?.id;
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }
    const notebooksByUser = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: { notes: true },
    });
    return { success: true, notebooks: notebooksByUser };
  } catch (error) {
    return { success: false, message: error || "Failed to get notebook" };
  }
};

export const getNotebookById = async (id: string) => {
  try {
    const notebooksById = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, id),
      with: { notes: true },
    });
    return { success: true, notebooks: notebooksById };
  } catch (error) {
    return { success: false, message: error || "Failed to get notebook" };
  }
};

export const updateNotebook = async (id: string, values: InsertNotebook) => {
  try {
    await db.update(notebooks).set(values).where(eq(notebooks.id, id));
    return { success: true, message: "Notebook updated successfully" };
  } catch (error) {
    return { success: false, message: error || "Failed to get notebook" };
  }
};

export const deleteNotebook = async (id: string) => {
  try {
    await db.delete(notebooks).where(eq(notebooks.id, id));
    return { success: true, message: "Notebook deleted successfully" };
  } catch (error) {
    return { success: false, message: error || "Failed to get notebook" };
  }
};
