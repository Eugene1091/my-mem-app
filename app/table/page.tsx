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

export default function TablePage() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [editingMeme, setEditingMeme] = useState<Meme | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Завантаження мемів з localStorage або дефолтних мемів з memes.ts
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

  const handleEdit = (meme: Meme) => {
    setEditingMeme(meme);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingMeme) return;
    const updated = memes.map(m =>
      m.id === editingMeme.id ? editingMeme : m
    );
    setMemes(updated);
    localStorage.setItem('memes', JSON.stringify(updated));
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">📋 Таблиця мемів</h1>
        <table className="w-full border border-gray-300 text-left">
          <thead className="">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Назва</th>
              <th className="py-2 px-4 border">Лайки</th>
              <th className="py-2 px-4 border">Дії</th>
            </tr>
          </thead>
          <tbody>
            {memes.map(meme => (
              <tr key={meme.id} className="">
                <td className="py-2 px-4 border">{meme.id}</td>
                <td className="py-2 px-4 border">{meme.title}</td>
                <td className="py-2 px-4 border">{meme.likes}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(meme)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && editingMeme && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-4">Редагувати мем #{editingMeme.id}</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Назва</label>
                <input
                  type="text"
                  name="title"
                  value={editingMeme.title}
                  onChange={e =>
                    setEditingMeme({ ...editingMeme, title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  minLength={3}
                  maxLength={100}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Картинка (JPG URL)</label>
                <input
                  type="url"
                  name="image"
                  value={editingMeme.image}
                  onChange={e =>
                    setEditingMeme({ ...editingMeme, image: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  pattern="https?:\/\/.*\.(jpg|jpeg)"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Кількість лайків</label>
                <input
                  type="number"
                  name="likes"
                  value={editingMeme.likes}
                  onChange={e =>
                    setEditingMeme({ ...editingMeme, likes: +e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  min={0}
                  max={99}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Скасувати
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Зберегти
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
