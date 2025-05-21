import type { InstagramPost } from '../../types/InstagramPost';
import { formatDate } from '../../utils/dateFormatPost';
import { formatCaption } from '../../utils/formatCaption';

interface InstagramPostCardProps {
  post: InstagramPost;
  onClick: (post: InstagramPost) => void;
}

export const InstagramPostCard = ({ post, onClick }: InstagramPostCardProps) => {
  return (
    <div
      onClick={() => onClick(post)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all border border-gray-200"
    >
      <div className="h-64 w-full overflow-hidden">
        {post.media_type === 'VIDEO' ? (
          <video src={post.media_url} className="w-full h-full object-cover" muted controls preload="none" />
        ) : (
          <img src={post.media_url} alt={post.caption || 'Instagram media'} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-3">
        <div className="text-sm text-gray-500">Posted: {formatDate(post.timestamp)}</div>
        <p
          className="text-sm text-gray-800 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: formatCaption(post.caption || 'No description'),
          }}
        />
      </div>
    </div>
  );
};
