// hooks/useCleanings.ts
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/auth/AuthContext';
import {
  getNextCleaningByProperty,
  getUpcomingCleanings,
} from '@/api/cleaningsApi';

export function useUpcomingCleanings() {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['upcoming-cleanings', user?.id],
    queryFn: () => getUpcomingCleanings(user!.id),
    enabled: !!user?.id,
  });
}

export function useNextCleaningByProperty(propertyId: number) {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['next-property-clening', propertyId],
    queryFn: () => getNextCleaningByProperty(propertyId),
    enabled: !!user?.id,
  });
}