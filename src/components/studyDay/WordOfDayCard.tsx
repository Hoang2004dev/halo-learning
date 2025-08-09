import { VocabItemDto } from "../../models/vocabItem";

interface Props {
  words: VocabItemDto[];
}

const WordOfDayCard = ({ words }: Props) => {
  const word = words.length ? words[Math.floor(Math.random() * words.length)] : null;

  if (!word) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl shadow text-sm">
      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">📘 Word of the Day</h3>
      <p className="text-lg font-bold text-yellow-900 dark:text-yellow-100">{word.word}</p>
      <p className="italic text-yellow-800 dark:text-yellow-300">({word.foreignMeaning})</p>
      <p className="text-yellow-700 dark:text-yellow-200 mb-2">{word.nativeMeaning}</p>
      {word.example && (
        <p className="text-xs italic text-yellow-600 dark:text-yellow-300">e.g: {word.example}</p>
      )}
      {word.audioUrl && (
        <audio controls className="mt-2 w-full">
          <source src={word.audioUrl} />
        </audio>
      )}
    </div>
  );
};

export default WordOfDayCard;
