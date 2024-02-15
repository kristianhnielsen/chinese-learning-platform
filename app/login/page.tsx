import { getAuthUser, signIn, signUp } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await getAuthUser();
  if (user) {
    redirect("/account");
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-primary">Login</h1>
      <div className="flex h-screen w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <form
          className="animate-in flex w-full flex-1 flex-col justify-center gap-2 text-light"
          action={signIn}
        >
          <label htmlFor="email">Email</label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="mb-2 rounded-md bg-green-700 px-4 py-2 text-light">
            Sign In
          </button>
          <button
            formAction={signUp}
            className="mb-2 rounded-md border border-light/20 px-4 py-2 text-light"
          >
            Sign Up
          </button>
          {searchParams?.message && (
            <p className="mt-4 rounded-md bg-light/10 p-4 text-center text-light">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
