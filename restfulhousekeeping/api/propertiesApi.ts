// api/propertiesApi.ts
import { request } from '@/api/apiClient';
import { Property } from '@/types/entityTypes';

export function getPropertyById(propertyId: number): Promise<Property> {
  return request<Property>({
    method: 'GET',
    url: `/properties/${propertyId}`,
  });
}
