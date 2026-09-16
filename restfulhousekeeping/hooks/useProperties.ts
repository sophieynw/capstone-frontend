// hooks/useProperties.ts
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/auth/AuthContext';
import {
  createProperty,
  getAllProperties,
  getPropertyById,
} from '@/api/propertiesApi';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Property } from '@/types/entityTypes';

export function usePropertyById(propertyId: number) {
  //const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: !!propertyId,
  });
}

export function usePropertyAll() {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ['properties', user?.id],
    queryFn: () => getAllProperties(),
  });
}

// creates a new Property record
export function useCreateProperty() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: createProperty,

    onSuccess: async (createdProperty) => {
      queryClient.setQueryData<Property[]>(
        ['properties', createdProperty.managerId],
        (currentProperties = []) => [...currentProperties, createdProperty],
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['checklist-items'],
        }),
      ]);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['properties', createdProperty.managerId],
        }),
      ]);

      Alert.alert('Success', 'The property was created.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    },

    onError: (error) => {
      console.error('Create property error:', error);

      Alert.alert('Unable to save', 'The property could not be created.');
    },
  });
}
