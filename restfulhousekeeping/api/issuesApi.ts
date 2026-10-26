import { request } from '@/api/apiClient';

export interface CreateIssuePayload {
  cleaningId: number;
  issueType: string;
  description: string;
}

export interface Issue {
  id: number;
  cleaningId: number;
  reportedById: number;
  reportedByName: string;
  issueType: string;
  description: string;
  cleaningStart: string | null;
  propertyName: string | null;
  reportedAt: string | null;

}

export function createIssue(payload: CreateIssuePayload): Promise<Issue> {
  return request<Issue>({
    method: 'POST',
    url: '/issues',
    data: payload,
  });
}

export function getIssuesByCleaning(cleaningId: number): Promise<Issue[]> {
  return request<Issue[]>({
    method: 'GET',
    url: `/issues/cleaning/${cleaningId}`,
  });

}

export function getIssuesByProperty(propertyId: number): Promise<Issue[]> {
  return request<Issue[]>({
    method: 'GET',
    url: `/issues/property/${propertyId}`,
  });
}

export function getIssuesForManager(): Promise<Issue[]> {
  return request<Issue[]>({
    method: 'GET',
    url: '/issues/manager',
  });
}