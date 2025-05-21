import { formatDistanceToNow } from 'date-fns';

interface InstagramCommentProps {
  text: string;
  timestamp: string;
}

export const InstagramComment = ({ text, timestamp }: InstagramCommentProps) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <div className="p-3 border-b last:border-none">
      <p className="text-sm text-gray-800">{text}</p>
      <span className="text-xs text-gray-500 mt-1 block">{timeAgo}</span>
    </div>
  );
};
