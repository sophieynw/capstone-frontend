import { Alert } from 'react-native';
import { useMutation,useQuery, useQueryClient } from '@tanstack/react-query';
import { createIssue,getIssuesByProperty,  getIssuesForManager, } from '@/api/issuesApi';

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
