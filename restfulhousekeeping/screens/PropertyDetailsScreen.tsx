import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Cleaning } from '@/types/entityTypes';
import { usePropertyById } from '@/hooks/useProperties';
import { useCleanerById } from '@/hooks/useCleaners';
import { useCleaningById } from '@/hooks/useCleanings';
import { toFriendlyDate } from '@/utils/helpers';

// @ts-ignore
export default function PropertyDetailsScreen({route}) {
  const { cleaning, propertyId, cleanerId } = route.params;

  const { data: property } = usePropertyById(propertyId);
  //const { data: cleaner } = useCleanerById(cleanerId);
  //const { data: cleaning } = useCleaningById(cleaning);
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <Text style={styles.title}>Cleaning Details</Text>

      <Text style={styles.propertyName}>{property?.name}</Text>
      {/*<Text>Today: 2:00 PM</Text>*/}
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

      <Button className='w-full max-w-96 mt-4'>
        <ButtonText>Check In</ButtonText>
      </Button>

      <Text style={styles.sectionTitle}>Cleaning Checklist</Text>

      <Card className='w-full max-w-96'>
        <Text>[ ] Change bed sheets</Text>
        <Text>[ ] Clean bathroom</Text>
        <Text>[ ] Take out garbage</Text>
        <Text>[ ] Sweep floor</Text>
      </Card>

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

  infoGroup: {
    gap: 6,
  },
});
