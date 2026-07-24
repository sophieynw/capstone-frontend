// hooks/useCleanings.ts
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/auth/AuthContext';
import { getUpcomingCleanings } from '@/api/cleaningsApi';

export function useUpcomingCleanings() {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['upcoming-cleanings', user?.id],
    queryFn: () => getUpcomingCleanings(user!.id),
    enabled: !!user?.id,
  });
}
