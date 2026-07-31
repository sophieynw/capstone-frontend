// api/checklistItemsApi.ts
import { ChecklistItem } from '@/types/entityTypes';
import { request } from '@/api/apiClient';

export function getChecklistItems(
  propertyId: number,
): Promise<ChecklistItem[]> {
  return request<ChecklistItem[]>({
    method: 'GET',
    url: `/checklist-items/${propertyId}`,
  });
}
