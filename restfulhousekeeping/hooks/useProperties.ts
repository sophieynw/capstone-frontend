// hooks/useProperties.ts
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/auth/AuthContext';
import { getPropertyById } from '@/api/propertiesApi';

export function useProperty(propertyId: number) {
  //const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: !!propertyId,
  });
}
