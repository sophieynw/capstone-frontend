// api/propertiesApi.ts
import { request } from '@/api/apiClient';
import {
  CreatePropertyPayload,
  Property,
  UpdatePropertyPayload,
} from '@/types/entityTypes';

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

export function deletePropertyById(propertyId: number): Promise<Property> {
  return request<Property>({
    method: 'DELETE',
    url: `/properties/${propertyId}`,
  });
}

export function updatePropertyById(propertyId: number, property: UpdatePropertyPayload): Promise<Property> {
  return request<Property>({
    method: 'PATCH',
    url: `/properties/${propertyId}`,
    data: property,
  });
}