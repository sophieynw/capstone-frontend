// api/organization.ts
import { request } from './apiClient';
import { Organization } from '@/types/entityTypes';

export function getOrganization(userId: string) {
  return request<Organization>({
    method: 'GET',
    url: `/organization/${userId}`,
    data: {
      userId,
    },
  });
}
