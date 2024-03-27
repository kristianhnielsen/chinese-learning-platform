import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/auth";
import { getUser, updateUser } from "../lib/database/users";
import UserProgressDataDisplay from "./UserProgressDataDisplay";
import SubmitButton from "../ui/SubmitButton";

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
      <h1>Profile</h1>
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
        <SubmitButton className="w-full bg-green-700">Save</SubmitButton>
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
