import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchInstagramProfile } from './fetchProfile';
import type { CreateInstagramPost } from '../../types/CreateInstagramPost';
import { createInstagramPost } from './createPost';
import { uploadImage } from './uploadnImage';

export const useInstagramProfile = (pageId: string | null) => {
  return useQuery({
    queryKey: ['instagramProfile', pageId],
    queryFn: () => fetchInstagramProfile(pageId as string),
    enabled: !!pageId,
  });
};

export const useCreateInstagramPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInstagramPost) => createInstagramPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instagramProfile'] });
    },
  });
};

export const useUploadImage = (onSuccess: (url: string) => void) =>
  useMutation({
    mutationFn: uploadImage,
    onSuccess: data => onSuccess(data.url),
  });
