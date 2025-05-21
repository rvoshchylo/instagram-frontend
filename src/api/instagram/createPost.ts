import type { CreateInstagramPost } from '../../types/CreateInstagramPost';
import { api } from '../axios';

export const createInstagramPost = async (data: CreateInstagramPost) => {
  const res = await api.post('/instagram/posts', data);
  return res.data;
};
