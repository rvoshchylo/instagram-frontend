import { api } from '../axios';

export const logoutRequest = async () => {
  await api.post('/auth/logout');
};
