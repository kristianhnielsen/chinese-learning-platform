export default async function Hsk() {
  return (
    <>
      <h1 className=" text-primary font-semibold text-2xl">HSK</h1>

      <a
        href="/dictionary/汉语水平考试"
        className=" text-secondary font-semibold text-xl hover:underline"
      >
        Hanyu Shuiping Kaoshi 汉语水平考试
      </a>

      <div className="flex gap-2">
        <p>Vocabulary:</p>
        {[1, 2, 3, 4, 5, 6].map((levelNumber) => (
          <a
            key={levelNumber}
            href={`/hsk/${levelNumber}`}
            className="hover:underline"
          >
            HSK {levelNumber}
          </a>
        ))}
      </div>
      <p>What is HSK...</p>
    </>
  );
}
