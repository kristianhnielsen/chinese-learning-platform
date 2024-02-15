import { getAuthUser, signIn, signUp } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await getAuthUser();
  if (user) {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-primary text-2xl font-bold">Login</h1>
      <div className="flex-1 flex flex-col px-8 sm:max-w-md justify-center gap-2 w-full h-screen">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-light"
          action={signIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-green-700 rounded-md px-4 py-2 text-light mb-2">
            Sign In
          </button>
          <button
            formAction={signUp}
            className="border border-light/20 rounded-md px-4 py-2 text-light mb-2"
          >
            Sign Up
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-light/10 text-light text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
