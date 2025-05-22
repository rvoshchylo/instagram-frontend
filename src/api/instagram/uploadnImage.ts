import { api } from '../axios';

export const uploadImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/instagram/upload', formData);
  return res.data;
};
