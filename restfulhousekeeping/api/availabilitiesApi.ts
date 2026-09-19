import { request } from '@/api/apiClient';
import { AvailabilitySlot } from '@/types/entityTypes'

export function getAvailabilitySlots(cleanerId: number): Promise<AvailabilitySlot[]> {
  return request<AvailabilitySlot[]>({
    method: 'GET',
    url: `/availability-slots/cleaner/${cleanerId}`
  });
}

export function updateAvailabilitySlot(
    id: number, payload: {startTime: string, endTime: string}): Promise<AvailabilitySlot> {
    return request<AvailabilitySlot>({
        method: 'PATCH',
        url: `/availability-slots/${id}`,
        data: payload
  });
}