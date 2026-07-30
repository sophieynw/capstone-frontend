import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { toFriendlyDate } from '@/utils/helpers';

export default function CleaningDetailsScreen({ route }: any) {
  const { cleaning } = route.params;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <Heading size='2xl'>Cleaning Details</Heading>

      <Card className='w-full gap-3 rounded-3xl'>
        <Heading size='lg'>Property</Heading>

        <Text>Property ID: {cleaning.propertyId}</Text>
        <Text>Scheduled: {toFriendlyDate(cleaning.dateTimeStart)}</Text>
        <Text>
          Cleaner: {cleaning.cleanerId ?? 'Unassigned'}
        </Text>
        <Text>Status: {cleaning.status ?? 'Not Started'}</Text>
      </Card>

      <Card className='w-full gap-3 rounded-3xl'>
        <Heading size='lg'>Checklist Progress</Heading>
        <Text>Checklist information will appear here.</Text>
      </Card>

      <Card className='w-full gap-3 rounded-3xl'>
        <Heading size='lg'>Reported Issues</Heading>
        <Text>No reported issues.</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button className='rounded-full'>
          <ButtonText>Change Cleaner</ButtonText>
        </Button>
      </View>
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
    gap: 16,
  },
  buttonContainer: {
    marginTop: 4,
  },
});
