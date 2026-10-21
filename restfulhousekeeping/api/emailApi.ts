import { request } from '@/api/apiClient';

export interface SendEmailPayload {
  to: string;
  subject: string;
  text: string;
}

export function sendEmail(
  email: SendEmailPayload,
): Promise<void> {
  return request<void>({
    method: 'POST',
    url: '/email',
    data: email
  });
}