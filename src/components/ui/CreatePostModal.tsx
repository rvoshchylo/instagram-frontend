import { useState, useEffect } from 'react';
import { LoaderButton } from './LoaderButton';

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (data: { imageUrl: string; caption: string }) => void;
  isPending: boolean;
}

export default function CreatePostModal({ onClose, onSubmit, isPending }: CreatePostModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    onSubmit({ imageUrl, caption });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-xl cursor-pointer">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              required
              placeholder="https://example.com/image.jpg"
              className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Caption</label>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="mt-1 w-full border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <LoaderButton />
                  Publishing...
                </>
              ) : (
                'Publish'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
