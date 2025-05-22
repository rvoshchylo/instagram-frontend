import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchInstagramProfile } from './fetchProfile';
import type { CreateInstagramPost } from '../../types/CreateInstagramPost';
import { createInstagramPost } from './createPost';
import { uploadImage } from './uploadnImage';
import { useNavigate } from 'react-router-dom';
import { logoutRequest } from './logout';

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

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('fb_token');
      if (!token) throw new Error('No token found');
      await logoutRequest();
    },
    onSuccess: () => {
      localStorage.removeItem('fb_token');
      queryClient.clear();
      navigate('/login');
    },
    onError: error => {
      console.error('Logout failed:', error);
      localStorage.removeItem('fb_token');
      queryClient.clear();
      navigate('/login');
    },
  });
};
