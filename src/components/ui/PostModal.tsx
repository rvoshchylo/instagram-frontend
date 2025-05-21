import { useEffect } from 'react';
import type { InstagramPost } from '../../types/InstagramPost';
import { formatDate } from '../../utils/dateFormatPost';
import { formatCaption } from '../../utils/formatCaption';
import { InstagramComment } from '../instagram/InstagramComment';

interface PostModalProps {
  post: InstagramPost | null;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4 rounded-lg shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Post Details</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-xl cursor-pointer">
            ×
          </button>
        </div>

        <div className="w-full bg-black">
          {post.media_type === 'VIDEO' ? (
            <video src={post.media_url} controls className="w-full max-h-[400px] object-contain" />
          ) : (
            <img src={post.media_url} alt={post.caption} className="w-full max-h-[400px] object-contain" />
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="text-sm text-gray-500">Posted: {formatDate(post.timestamp)}</div>
          <div
            className="text-sm text-gray-800 whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: formatCaption(post.caption || 'No description'),
            }}
          />

          <div className="text-sm text-gray-600">
            <strong>Likes:</strong> {post.like_count} · <strong>Comments:</strong> {post.comments_count}
          </div>

          {post.comments && post.comments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-2">Comments</h3>
              <div className="rounded-md border divide-y">
                {post.comments.map(
                  comment =>
                    comment.text && (
                      <InstagramComment key={comment.id} text={comment.text} timestamp={comment.timestamp} />
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
