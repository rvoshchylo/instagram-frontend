import { api } from '../axios';

export const fetchInstagramProfile = async (pageId: string) => {
  const res = await api.get(`/instagram/profile?pageId=${pageId}`);
  return res.data;
};
