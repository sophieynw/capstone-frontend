// hooks/useProperties.ts
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/auth/AuthContext';
import { getAllProperties, getPropertyById } from '@/api/propertiesApi';

export function usePropertyById(propertyId: number) {
  //const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: !!propertyId,
  });
}

export function usePropertyAll() {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['properties', user?.id],
    queryFn: () => getAllProperties(),
  });
}