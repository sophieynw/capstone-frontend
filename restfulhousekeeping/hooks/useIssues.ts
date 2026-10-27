import { Alert } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createIssue,
  getIssuesByProperty,
  getIssuesForManager,
  resolveIssue,
} from '@/api/issuesApi';

// saves a reported issue
export function useCreateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,

    onSuccess: (createdIssue) => {
      queryClient.invalidateQueries({
        queryKey: ['issues'],
      });

      Alert.alert('Issue submitted', 'The issue was recorded.');
    },

    onError: (error) => {
      console.error('Create issue error:', error);

      Alert.alert('Unable to submit', 'The issue could not be saved.');
    },
  });
}

export function useIssuesByProperty(propertyId: number) {
  return useQuery({
    queryKey: ['issues', 'property', propertyId],
    queryFn: () => getIssuesByProperty(propertyId),
    enabled: !!propertyId,
  });
}

// every issue on the logged-in manager's properties, newest first
export function useManagerIssues(enabled: boolean) {
  return useQuery({
    queryKey: ['issues', 'manager'],
    queryFn: getIssuesForManager,
    enabled,
  });
}

export function useResolveIssue() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: resolveIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
    onError: (error) => {
      console.error('Resolve issue error:', error);
      Alert.alert('Unable to resolve', 'The issue could not be resolved.');
    },
  });

  function confirmResolve(issueId: number) {
    Alert.alert(
      'Resolve issue?',
      'This will remove the issue from the unresolved issues list.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Resolve',
          onPress: () => mutation.mutate(issueId),
        },
      ],
    );
  }

  return { ...mutation, confirmResolve };
}
