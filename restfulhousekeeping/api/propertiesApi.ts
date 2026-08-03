// api/propertiesApi.ts
import { request } from '@/api/apiClient';
import { CreatePropertyPayload, Property } from '@/types/entityTypes';

export function getPropertyById(propertyId: number): Promise<Property> {
  return request<Property>({
    method: 'GET',
    url: `/properties/${propertyId}`,
  });
}

export function getAllProperties(): Promise<Property[]> {
  return request<Property[]>({
    method: 'GET',
    url: `/properties`,
  });
}

export function createProperty(
  property: CreatePropertyPayload,
): Promise<Property> {
  return request<Property>({
    method: 'POST',
    url: '/properties',
    data: property,
  });
}
