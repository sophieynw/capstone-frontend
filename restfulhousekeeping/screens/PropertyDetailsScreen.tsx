import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'components/ui/card';
import { Button, ButtonText } from 'components/ui/button';

export default function PropertyDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cleaning Details</Text>

      <Text style={styles.propertyName}>Union Condo</Text>
      <Text>Today: 2:00 PM</Text>
      <Text>Status: Not Started</Text>

      <Card className='w-full max-w-96 mt-4 gap-2'>
        <Text style={styles.cardTitle}>Property Info</Text>

        <View style={styles.infoGroup}>
          <Text>Address: 123 Union St, Oakville</Text>
          <Text>Lockbox Code: 1234</Text>
          <Text>Parking: Visitor #12</Text>
          <Text>Notes: Enter through side entrance</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
