import { User } from '@/types/entityTypes';
import { request } from '@/api/apiClient';

export function getUserById(userId: number | null): Promise<User> {
  return request<User>({
    method: 'GET',
    url: `/cleaners/${userId}`,
  });
}

export function getAllCleaners(organizationId: number): Promise<User[]> {
  return request<User[]>({
    method: 'GET',
    url: `/cleaners/${organizationId}/cleaners`,
  });
}
