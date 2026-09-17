// hooks/useAvailabilities.ts
import { useQuery } from '@tanstack/react-query';
import { getAvailabilitySlots } from '@/api/availabilitiesApi';

export function useAvailabilities(cleanerId?: number) {
  return useQuery({
    queryKey: ['availability-slots', cleanerId],
    queryFn: () => getAvailabilitySlots(cleanerId!),
    enabled: cleanerId !== undefined,
  });
}
