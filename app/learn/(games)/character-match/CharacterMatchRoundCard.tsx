import ChoiceCard from "./ChoiceCard";

export default function CharacterMatchRoundCard({
  correctWord,
  fillerWords,
}: {
  correctWord: DictionaryEntry;
  fillerWords: DictionaryEntry[];
}) {
  const fillerWordsWithCorrectWord = [...fillerWords, correctWord].sort(
    (a, b) => a.id - b.id,
  );
  return (
    <>
      <div className="grid items-center gap-2 rounded-lg border border-light/10 p-4 text-center">
        <p>{correctWord.simplified}</p>
        <p>{correctWord.pinyin_diacritic}</p>
      </div>
      <section className="grid grid-cols-2 gap-4">
        {fillerWordsWithCorrectWord.map((choice) => (
          <ChoiceCard key={choice.id} entry={choice} />
        ))}
      </section>
    </>
  );
}
