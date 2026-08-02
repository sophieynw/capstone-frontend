import { useQuery } from '@tanstack/react-query';
import { getAllCleaners, getUserById } from '@/api/usersApi';
import { AuthContext } from '@/auth/AuthContext';
import { useContext } from 'react';

export function useCleanerById(userId: number | null) {
  return useQuery({
    queryKey: ['cleaner', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}

export function useCleaners() {
  const { user } = useContext(AuthContext);
  const organizationId = user?.organization?.id;

  return useQuery({
    queryKey: ['cleaners', organizationId],
    queryFn: () => getAllCleaners(organizationId!),
    enabled: !!organizationId,
  });
}
