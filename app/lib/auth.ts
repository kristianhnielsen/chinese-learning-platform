"use server";

import { headers } from "next/headers";
import { getSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = getSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error?.status === 400) {
    // AuthApiError - error.message == Invalid login credentials
    return redirect(`/login?message=E-mail and password doesn't match`);
  } else if (error) {
    // Any other error
    return redirect(`/login?message=${error.message}`);
  }

  return redirect("/account");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = getSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect(`/signup?message=${error.message}`);
  }

  return redirect("/signup?message=Check email to continue sign in process");
};

export const signOut = async () => {
  const supabase = getSupabaseClient();

  await supabase.auth.signOut();
  return redirect("/login");
};

export const getAuthUser = async () => {
  const supabase = getSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return user;
};
