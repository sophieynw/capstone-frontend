// api/auth.ts
import { request } from './apiClient';
import { User } from '@/types/entityTypes';

type LoginResponse = {
  token: string;
  user: User;
};

export function authenticate(username: string, password: string) {
  return request<LoginResponse>({
    method: 'POST',
    url: '/api/v1/auth/authenticate',
    data: {
      username,
      password,
    },
  });
}
