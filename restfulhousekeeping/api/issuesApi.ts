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