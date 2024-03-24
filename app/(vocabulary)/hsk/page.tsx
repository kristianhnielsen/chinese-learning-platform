export default async function Hsk() {
  return (
    <>
      <h1 className="text-center">
        Hanyu Shuiping Kaoshi
        <br />
        汉语水平考试
      </h1>

      <section className="grid max-w-screen-md gap-2">
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

      <section className="grid w-full max-w-screen-md items-center gap-2 text-center text-xl ">
        <h2>Character lists</h2>
        <div className="flex flex-wrap justify-evenly gap-4 px-4">
          {[1, 2, 3, 4, 5, 6].map((levelNumber) => (
            <a
              key={levelNumber}
              href={`/hsk/${levelNumber}`}
              className="font-semibold hover:underline"
            >
              HSK {levelNumber}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
