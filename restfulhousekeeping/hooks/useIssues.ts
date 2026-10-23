import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIssue } from '@/api/issuesApi';

// saves a reported issue
export function useCreateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,

    onSuccess: (createdIssue) => {
      queryClient.invalidateQueries({
        queryKey: ['issues', createdIssue.cleaningId],
      });

      Alert.alert('Issue submitted', 'The issue was recorded.');
    },

    onError: (error) => {
      console.error('Create issue error:', error);

      Alert.alert('Unable to submit', 'The issue could not be saved.');
    },
  });
}