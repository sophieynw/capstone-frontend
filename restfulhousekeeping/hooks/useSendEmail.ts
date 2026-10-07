import { useMutation } from '@tanstack/react-query';
import { sendEmail } from '@/api/emailApi';
import { SendEmailPayload } from '@/api/emailApi';

export function useSendEmail() {
  return useMutation({
    mutationFn: (email: SendEmailPayload) => sendEmail(email),
  });
}
