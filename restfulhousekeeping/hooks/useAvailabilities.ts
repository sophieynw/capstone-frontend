// hooks/useAvailabilities.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAvailabilitySlots,
  updateAvailabilitySlot,
} from '@/api/availabilitiesApi';
import { Alert } from 'react-native';

export function useAvailabilities(cleanerId?: number) {
  return useQuery({
    queryKey: ['availability-slots', cleanerId],
    queryFn: () => getAvailabilitySlots(cleanerId!),
    enabled: cleanerId !== undefined,
  });
}

export function useUpdateAvailability(id?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: {
      id: number;
      startTime: string;
      endTime: string;
    }) => updateAvailabilitySlot(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['availability-slots', id] }),
    onError: () =>
      Alert.alert('Unable to save', 'The availability could not be updated.'),
  });
}