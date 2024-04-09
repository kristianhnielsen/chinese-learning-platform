import DictSearch from "./ui/DictSearch";
import DictEntries from "./ui/DictEntries";
import { redirect } from "next/navigation";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    code?: string;
  };
}) {
  if (searchParams?.code) {
    // redirected from signup confirmation email
    redirect("/login");
  }
  return (
    <>
      <hgroup className="grid items-center gap-2 text-center">
        <h1>易字词典</h1>
        <p className="text-2xl text-secondary">Easy Dictionary</p>
      </hgroup>
      <DictSearch />
      {searchParams?.query && <DictEntries searchParams={searchParams} />}
    </>
  );
}
