// hooks/useCleanings.ts
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/auth/AuthContext';
import {
  completeCleaning,
  createCleaning,
  getCleaningById,
  getNextCleaningByProperty,
  getUpcomingCleanings,
} from '@/api/cleaningsApi';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// fetches all upcoming cleanings for a user
export function useUpcomingCleanings() {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['upcoming-cleanings'],
    queryFn: () => getUpcomingCleanings(user!.id),
    enabled: !!user?.id,

    select: (cleanings) =>
      [...cleanings].sort(
        (a, b) =>
          new Date(a.dateTimeStart).getTime() -
          new Date(b.dateTimeStart).getTime(),
      ),
  });
}

export function useNextCleaningByProperty(propertyId: number) {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['next-property-cleaning', propertyId],
    queryFn: () => getNextCleaningByProperty(propertyId),
    enabled: !!user?.id,
  });
}

export function useCleaningById(id: number) {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['cleaning-id', id],
    queryFn: () => getCleaningById(id),
    enabled: !!user?.id,
  });
}

// creates a new Cleaning record
export function useCreateCleaning() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: createCleaning,

    onSuccess: async (createdCleaning) => {
      queryClient.setQueryData(
        ['cleaning-id', createdCleaning.id],
        createdCleaning,
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['upcoming-cleanings', createdCleaning.managerId],
          exact: true,
          refetchType: 'all',
        }),

        queryClient.invalidateQueries({
          queryKey: ['next-property-cleaning', createdCleaning.propertyId],
          exact: true,
          refetchType: 'all',
        }),
      ]);

      Alert.alert('Success', 'The cleaning was created.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    },

    onError: (error) => {
      console.error('Create cleaning error:', error);

      Alert.alert('Unable to save', 'The cleaning could not be created.');
    },
  });
}

// marks cleaning as complete
export function useCompleteCleaning() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeCleaning,
    onSuccess: (updatedCleaning) => {
      queryClient.setQueryData(
        ['cleaning-id', updatedCleaning.id],
        updatedCleaning,
      );
      queryClient.invalidateQueries({ queryKey: ['upcoming-cleanings'] });
    },
  });
}
