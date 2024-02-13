export default async function Hsk() {
  return (
    <>
      <h1 className="text-primary text-center font-semibold text-2xl">
        Hanyu Shuiping Kaoshi
        <br />
        汉语水平考试
      </h1>

      <section className="max-w-screen-md grid gap-2">
        <p>
          The{" "}
          <a
            href="/dictionary/汉语水平考试"
            className="text-accent hover:underline"
          >
            Hanyu Shuiping Kaoshi
          </a>{" "}
          (HSK), translated as the <strong>Chinese Proficiency Test</strong>, is
          an internationally recognized standard skill test for non-native
          Chinese language speakers. Developed by Beijing Language and Culture
          University, this test assesses proficiency in PRC Standard Chinese for
          individuals such as foreign students and overseas Chinese.
        </p>
        <p>
          It encompasses listening, reading, and writing abilities, all assessed
          in simplified Chinese characters. The HSK comprises six levels, each
          reflecting different proficiency levels.
        </p>
        <p>The tests can be taken online or in a paper-based format.</p>
      </section>

      <section className="grid gap-2 text-xl items-center text-center w-full max-w-screen-md ">
        <h2 className="text-secondary font-semibold">Character lists</h2>
        <div className="flex justify-evenly px-12">
          {[1, 2, 3, 4, 5, 6].map((levelNumber) => (
            <a
              key={levelNumber}
              href={`/hsk/${levelNumber}`}
              className="hover:underline font-semibold"
            >
              HSK {levelNumber}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
