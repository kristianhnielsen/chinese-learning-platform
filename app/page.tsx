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
    <>
      <DictSearch />
      {searchParams?.query && <DictEntries searchParams={searchParams} />}
    </>
  );
}
