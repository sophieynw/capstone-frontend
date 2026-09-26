import {
  UpdatePropertyPayload,
  UpdateUserPayload,
  User,
} from '@/types/entityTypes';
import { request } from '@/api/apiClient';

export function getUserById(userId: number | null): Promise<User> {
  return request<User>({
    method: 'GET',
    url: `/cleaners/${userId}`,
  });
}

export function updateUserById(
  userId: number | null,
  user: UpdateUserPayload,
): Promise<User> {
  return request<User>({
    method: 'PATCH',
    url: `/cleaners/${userId}`,
    data: user
  });
}

export function getAllCleaners(organizationId: number): Promise<User[]> {
  return request<User[]>({
    method: 'GET',
    url: `/cleaners/${organizationId}/cleaners`,
  });
}
