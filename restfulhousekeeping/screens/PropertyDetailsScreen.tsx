import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Cleaning, CleaningChecklistItem } from '@/types/entityTypes';
import { usePropertyById } from '@/hooks/useProperties';
import { toFriendlyDate } from '@/utils/helpers';
import { CheckIcon, Icon } from '@/components/ui/icon';
import React from 'react';
import { useCleanerById } from '@/hooks/useCleaners';

// @ts-ignore
export default function PropertyDetailsScreen({route, navigation}) {
  const { cleaning, cleanerId, propertyId } = route.params;
  const { data: property } = usePropertyById(propertyId);
  const { data: cleaner } = useCleanerById(cleanerId);
  // @ts-ignore

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <Text style={styles.title}>Cleaning Details</Text>
      <Text style={styles.propertyName}>{property?.name}</Text>
      <Text>{cleaner ? `${cleaner.firstName} ${cleaner.lastName}` : 'Unassigned'}</Text>
      <Text>
        Starts At:{' '}
        {cleaning?.dateTimeStart
          ? toFriendlyDate(cleaning.dateTimeStart)
          : 'Loading...'}
      </Text>
      <Text>Status: Not Started</Text>
      <Card className='w-full max-w-96 mt-4 gap-2'>
        <Text style={styles.cardTitle}>Property Info</Text>

        <View style={styles.infoGroup}>
          <Text>
            Address: {property?.street} {property?.name}, {property?.city}
          </Text>
          <Text>Lockbox Code: 1234</Text>
          <Text>Parking: Visitor #12</Text>
          <Text>Notes: {cleaning?.notes}</Text>
        </View>
      </Card>
      <Button className='rounded-full w-48 mt-4 mx-auto'>
        <ButtonText>Check In</ButtonText>
      </Button>
      <Text style={styles.sectionTitle}>Cleaning Checklist</Text>
      <Card className='w-full max-w-96'>
        {cleaning?.cleaningChecklistItems?.length ? (
          cleaning?.cleaningChecklistItems.map(
            (item: CleaningChecklistItem) => (
              <View key={item.id} style={styles.hStack}>
                {item.isComplete && <Icon as={CheckIcon} />}
                <Text>{item.description}</Text>
              </View>
            ),
          )
        ) : (
          <Text className='text-sm text-gray-500 italic text-center py-2'>
            No items found
          </Text>
        )}
      </Card>
      {cleaning?.cleaningChecklistItems &&
      cleaning.cleaningChecklistItems.length > 0 ? (
        <Button
          className='rounded-full w-48 mt-4 mx-auto'
          onPress={() =>
            navigation.navigate('ManageChecklistScreen', {
              cleaning: cleaning,
              propertyId: cleaning.propertyId,
            })
          }
        >
          <ButtonText>Manage</ButtonText>
        </Button>
      ) : null}
      <Button variant='secondary' className='w-full max-w-96 mt-4'>
        <ButtonText>Report Issue</ButtonText>
      </Button>
      <Button variant='secondary' className='w-full max-w-96 mt-3'>
        <ButtonText>Check Out & Submit</ButtonText>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenContent: {
    padding: 24,
    gap: 20,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  propertyName: {
    fontSize: 18,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  hStack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
  },

  infoGroup: {
    gap: 6,
  },
});
