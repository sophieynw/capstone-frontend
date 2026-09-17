import { request } from '@/api/apiClient';
import { AvailabilitySlot } from '@/types/entityTypes'

export function getAvailabilitySlots(cleanerId: number): Promise<AvailabilitySlot[]> {
  return request<AvailabilitySlot[]>({
    method: 'GET',
    url: `/availability-slots/cleaner/${cleanerId}`
  });
}