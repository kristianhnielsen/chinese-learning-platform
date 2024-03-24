import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/auth";
import { getUser, updateUser } from "../lib/database/users";
import UserProgressDataDisplay from "./UserProgressDataDisplay";

export default async function Account({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  const user = await getUser(authUser);

  return (
    <>
      <h1 className="text-2xl text-primary">Profile</h1>
      {user.name && <p>Welcome back {user.name}!</p>}
      <form action={updateUser} className="text-light">
        <label htmlFor="name" className="grid">
          Name
          <input
            type="text"
            name="name"
            id="name"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            defaultValue={user.name || undefined}
            placeholder="What is your name?"
          />
        </label>
        <button
          type="submit"
          className="group mb-2 flex w-full items-center justify-center gap-4 rounded-md border border-light/20 bg-green-700 px-4 py-2 transition-all"
        >
          Save
        </button>
        {searchParams?.message && (
          <p className="mt-4 rounded-md bg-light/10 p-4 text-center text-light">
            {searchParams.message}
          </p>
        )}
      </form>
      <UserProgressDataDisplay authUserId={authUser.id} />
    </>
  );
}
