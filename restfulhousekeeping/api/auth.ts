// api/auth.ts
import { request } from './apiClient';
import { CreateUserPayload, User } from '@/types/entityTypes';

type AuthResponse = {
  token: string;
  user: User;
};

type UsernameAvailabilityResponse = {
  available: boolean;
};

export function checkUsernameAvailability(username: string) {
  return request<UsernameAvailabilityResponse>({
    method: 'GET',
    url: '/api/v1/auth/username-availability',
    params: { username },
  });
}

export function register(payload: CreateUserPayload) {
  return request<AuthResponse>({
    method: 'POST',
    url: '/api/v1/auth/register',
    data: payload,
  });
}

export function authenticate(username: string, password: string) {
  return request<AuthResponse>({
    method: 'POST',
    url: '/api/v1/auth/authenticate',
    data: {
      username,
      password,
    },
  });
}
