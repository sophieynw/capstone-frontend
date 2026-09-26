import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCleaners, getUserById, updateUserById } from '@/api/usersApi';
import { AuthContext } from '@/auth/AuthContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UpdateUserPayload } from '@/types/entityTypes';
import { Alert } from 'react-native';

export function useCleanerById(userId: number | null) {
  return useQuery({
    queryKey: ['cleaner', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}

export function useCleaners() {
  const { user } = useContext(AuthContext);
  const organizationId = user?.organization?.id;

  return useQuery({
    queryKey: ['cleaners', organizationId],
    queryFn: () => getAllCleaners(organizationId!),
    enabled: !!organizationId,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { user, update } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({
      userId,
      user,
    }: {
      userId: number;
      user: UpdateUserPayload;
    }) => updateUserById(userId, user),

    onSuccess: async (updatedUser) => {
      await update(updatedUser);

      await queryClient.invalidateQueries({
        queryKey: ['cleaner', user?.id],
      });

      Alert.alert('Success', 'The user was updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    },

    onError: (error) => {
      console.error('Update user error:', error);
      Alert.alert('Unable to update', 'The user could not be updated.');
    },
  });
}