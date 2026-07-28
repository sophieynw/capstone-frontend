// api/cleaningsApi.ts
import { request } from '@/api/apiClient';
import { Cleaning } from '@/types/entityTypes';

export function getUpcomingCleanings(userId: number): Promise<Cleaning[]> {
  return request<Cleaning[]>({
    method: 'GET',
    url: `/cleanings/upcoming/${userId}`,
  });
}
export function getNextCleaningByProperty(propertyId: number,): Promise<Cleaning> {
  return request<Cleaning>({
    method: 'GET',
    url: `/cleanings/upcoming/${propertyId}/first`,
  });
}
export function getCleaningById(id: number,): Promise<Cleaning> {
  return request<Cleaning>({
    method: 'GET',
    url: `/cleanings/${id}`,
  });
}