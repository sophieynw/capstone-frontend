import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/api/usersApi';

export function useCleanerById(userId: number | null) {
  return useQuery({
    queryKey: ['cleaner', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}