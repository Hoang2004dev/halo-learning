import { useEffect, useState } from "react";
import { VocabItemDto } from "../../models/vocabItem";
import { vocabItemApi } from "../../api/vocabItemApi";

const NewWordCard = () => {
  const [randomWord, setRandomWord] = useState<VocabItemDto | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        // const all = await vocabItemApi.getAll(); 
        // if (all.length) {
        //   const word = all[Math.floor(Math.random() * all.length)];
        //   setRandomWord(word);
        // }
      } catch (err) {
        console.error("❌ Failed to load new word");
      }
    };
    fetch();
  }, []);

  if (!randomWord) return null;

  return (
    <div className="bg-emerald-50 dark:bg-emerald-900 p-4 rounded-xl shadow text-sm">
      <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">🌱 New Word</h3>
      <p className="text-lg font-bold text-emerald-900 dark:text-emerald-100">{randomWord.word}</p>
      <p className="italic text-emerald-800 dark:text-emerald-300">({randomWord.foreignMeaning})</p>
      <p className="text-emerald-700 dark:text-emerald-200 mb-2">{randomWord.nativeMeaning}</p>
      {randomWord.example && (
        <p className="text-xs italic text-emerald-600 dark:text-emerald-300">e.g: {randomWord.example}</p>
      )}
      {randomWord.audioUrl && (
        <audio controls className="mt-2 w-full">
          <source src={randomWord.audioUrl} />
        </audio>
      )}
    </div>
  );
};

export default NewWordCard;
