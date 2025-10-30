"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "Sign-in successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Sign-in failed" };
  }
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    return { success: true, message: "Sign-up successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Sign-in failed" };
  }
};

export const updateUserName = async (name: string, userId: string) => {
  try {
    await db
      .update(user)
      .set({ name }) // <- must be an object { column: value }
      .where(eq(user.id, userId));

    return { success: true, message: "Username updated successfully" };
  } catch (error) {
    console.error("Error updating username:", error);
    return { success: false, message: "Failed to update username" };
  }
};
