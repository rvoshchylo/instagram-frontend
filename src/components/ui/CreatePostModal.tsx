import { useState, useEffect } from 'react';
import { LoaderButton } from './LoaderButton';
import { useUploadImage } from '../../api/instagram/useInstagramProfile';

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (data: { imageUrl: string; caption: string }) => void;
  isPending: boolean;
}

export default function CreatePostModal({ onClose, onSubmit, isPending }: CreatePostModalProps) {
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { mutate: uploadFile, isPending: isUploading } = useUploadImage(url => {
    setImageUrl(url);
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      uploadFile(file);
    }
  };

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
            <label className="block text-sm font-medium text-gray-700">Upload Image/Video</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {previewUrl && (
              <div className="mt-2">
                {selectedFile?.type.startsWith('video') ? (
                  <video src={previewUrl} controls className="w-full max-h-60 rounded" />
                ) : (
                  <img src={previewUrl} alt="Preview" className="w-full max-h-60 rounded object-contain" />
                )}
              </div>
            )}
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
              {isPending || isUploading ? (
                <>
                  <LoaderButton />
                  {isUploading ? 'Uploading...' : 'Publishing...'}
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
