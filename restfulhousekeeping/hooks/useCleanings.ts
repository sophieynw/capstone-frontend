import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

export function useCleanings(userId: string) {
  return useQuery({
    queryKey: ['organizationId'],
    queryFn: () => api.getOrganization(userId),
  });
}
