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
      <hgroup className="grid items-center gap-2 text-center">
        <h1 className="text-5xl font-bold text-primary">易字词典</h1>
        <p>Easy Dictionary</p>
      </hgroup>
      <DictSearch />
      {searchParams?.query && <DictEntries searchParams={searchParams} />}
    </>
  );
}
