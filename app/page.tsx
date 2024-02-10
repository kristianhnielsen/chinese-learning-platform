import DictSearch from "./ui/DictSearch";
import DictEntries from "./ui/DictEntries";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  return (
    <main className="flex flex-col items-center gap-8 p-12 w-full">
      <DictSearch />
      {searchParams?.query && <DictEntries searchParams={searchParams} />}
    </main>
  );
}
