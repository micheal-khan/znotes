"use server";

import { db } from "@/db/drizzle";
import { InsertNotes, notes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createNotes = async (values: InsertNotes) => {
  try {
    await db.insert(notes).values(values);
    return { success: true, message: "Notes created successfully" };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to create Notes";
    return { success: false, message: errMsg };
  }
};

// export const getNotes = async () => {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });
//     const userId = session?.user?.id;
//     if (!userId) {
//       return { success: false, message: "User not authenticated" };
//     }
//     const NotessByUser = await db
//       .select()
//       .from(notes)
//       .where(eq(notes.userId, userId));
//     return { success: true, Notess: NotessByUser };
//   } catch (error) {
//     return { success: false, message: error || "Failed to get Notes" };
//   }
// };

export const getNotesById = async (id: string) => {
  try {
    const NotessById = await db.select().from(notes).where(eq(notes.id, id));
    return { success: true, Notess: NotessById };
  } catch (error) {
    return { success: false, message: error || "Failed to get Notes" };
  }
};

export const updateNotes = async (id: string, values: InsertNotes) => {
  try {
    await db.update(notes).set(values).where(eq(notes.id, id));
    return { success: true, message: "Notes updated successfully" };
  } catch (error) {
    return { success: false, message: error || "Failed to get Notes" };
  }
};

export const deleteNotes = async (id: string) => {
  try {
    await db.delete(notes).where(eq(notes.id, id));
    return { success: true, message: "Notes deleted successfully" };
  } catch (error) {
    return { success: false, message: error || "Failed to get Notes" };
  }
};
