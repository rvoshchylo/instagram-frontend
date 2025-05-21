import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectPage() {
  const [pageId, setPageId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageId.trim()) return;
    navigate(`/profile?appId=${pageId.trim()}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Enter Facebook Page ID, that connected to your Instagram account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={pageId}
            onChange={e => setPageId(e.target.value)}
            placeholder="e.g. 683437724846371"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
