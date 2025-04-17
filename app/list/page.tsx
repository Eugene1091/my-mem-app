'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { memes as memeData } from '@/data/mem'; // Імпортуємо меми з локального файлу memes.ts

type Meme = {
  id: number;
  title: string;
  image: string;
  likes: number;
};

export default function ListPage() {
  const [memes, setMemes] = useState<Meme[]>([]);

  // Завантаження мемів з localStorage або дефолтних мемів із memes.ts
  useEffect(() => {
    const savedMemes = localStorage.getItem('memes');
    
    if (savedMemes) {
      setMemes(JSON.parse(savedMemes));
    } else {
      // Якщо в localStorage немає мемів, встановлюємо дефолтні з memes.ts
      setMemes(memeData);
      localStorage.setItem('memes', JSON.stringify(memeData)); // Зберігаємо дефолтні меми у localStorage
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">🃏 Список мемів</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memes.map((meme) => (
            <div
              key={meme.id}
              className="rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition"
            >
              <img
                src={meme.image}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{meme.title}</h2>
                <p className="text-gray-600 mb-2">👍 {meme.likes} лайків</p>
                <a
                  href={meme.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline"
                >
                  Відкрити мем 🔗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
