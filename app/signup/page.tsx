import Link from "next/link";
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
      <h1>Sign Up</h1>
      <div className="flex flex-1 flex-col justify-center gap-2 sm:max-w-md">
        <form
          className="flex flex-1 flex-col justify-center gap-8 text-light"
          action={signUp}
        >
          <label htmlFor="email" className="grid">
            Email
            <input
              className="rounded-md border bg-inherit px-4 py-2 valid:outline-green-700"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label htmlFor="password" className="grid">
            Password
            <input
              className="rounded-md border bg-inherit px-4 py-2 valid:outline-green-700"
              type="password"
              name="password"
              placeholder="Your password..."
              pattern=".{6,}"
              required
            />
          </label>
          <button className="rounded-md bg-secondary px-4 py-2 text-light">
            {"Sign Up"}
          </button>
          {searchParams?.message && (
            <p className="text-balance rounded-md bg-light/10 p-4 text-center text-sm text-light">
              {searchParams.message}
            </p>
          )}
          <Link
            href="/login"
            className="mt-4 px-4 py-2 text-center text-light/80 underline"
          >
            {"I already have an account"}
          </Link>
        </form>
      </div>
    </>
  );
}
