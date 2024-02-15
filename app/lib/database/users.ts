"use server";

import { getSupabaseClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { getAuthUser } from "../auth";
import { redirect } from "next/navigation";

export async function getUser(authUser: User) {
  const supabase = getSupabaseClient();

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  // create user in database if user doesn't already exist
  if (!userData) {
    createUser(authUser.id);
    return await getUser(authUser);
  }

  if (error) throw error;

  return userData;
}

export async function createUser(authUserId: string) {
  const supabase = getSupabaseClient();

  const { data: userData, error } = await supabase
    .from("users")
    .insert({ id: authUserId });

  if (error) throw error;

  return userData;
}

export async function updateUser(formData: FormData) {
  const supabase = getSupabaseClient();
  const name = formData.get("name") as string;
  const authUser = await getAuthUser();

  const { data, error } = await supabase
    .from("users")
    .update({ name: name })
    .eq("id", authUser!.id);

  if (error) {
    return redirect("/account?message=Something went wrong, try again");
  }

  return redirect("/account?message=Changes saved");
}
