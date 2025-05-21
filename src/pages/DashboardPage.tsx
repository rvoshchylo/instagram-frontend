import { useSearchParams } from 'react-router-dom';
import { InstagramProfileHeader } from '../components/instagram/InstagramProfileHeader';
import { useCreateInstagramPost, useInstagramProfile } from '../api/instagram/useInstagramProfile';
import type { InstagramPost } from '../types/InstagramPost';
import { FullPageLoader } from '../components/ui/FullPageLoader';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { InstagramPostCard } from '../components/instagram/InstagramPostCard';
import { useState } from 'react';
import PostModal from '../components/ui/PostModal';
import CreatePostModal from '../components/ui/CreatePostModal';
import type { InstagramRawPost } from '../types/CreateInstagramPost';

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('appId');
  const { data, isLoading, isError } = useInstagramProfile(pageId);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const { mutate: createPost, isPending } = useCreateInstagramPost();

  console.log('data', data);

  const handleCreatePost = async (post: InstagramRawPost) => {
    try {
      createPost(
        {
          imageUrl: post.imageUrl,
          caption: post.caption,
          userId: data.instagramAccount.id,
        },
        {
          onSuccess: () => {
            setIsCreatingPost(false);
          },
        },
      );
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (!pageId) return <ErrorMessage message="No Page ID provided" />;
  if (isLoading)
    return (
      <div className="p-4">
        <FullPageLoader />
      </div>
    );

  if (isError) return <ErrorMessage message="Failed to load profile" />;

  const { pageName, instagramAccount } = data;

  return (
    <div className="p-4 space-y-6">
      <InstagramProfileHeader
        username={instagramAccount.username}
        profilePictureUrl={instagramAccount.profilePictureUrl}
        pageName={pageName}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-lg font-bold">Posts</h2>
        <button
          onClick={() => setIsCreatingPost(true)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {instagramAccount.posts.map((post: InstagramPost) => (
          <InstagramPostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
        ))}
      </div>

      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
      {isCreatingPost && (
        <CreatePostModal onClose={() => setIsCreatingPost(false)} onSubmit={handleCreatePost} isPending={isPending} />
      )}
    </div>
  );
}
