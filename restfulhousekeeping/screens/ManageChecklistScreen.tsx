import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import React from 'react';
import { usePropertyById } from '@/hooks/useProperties';
import { CleaningChecklistItem } from '@/types/entityTypes';

// @ts-ignore
export default function ManageChecklistScreen({ route }) {
  const { cleaning } = route.params;
  const { data: property } = usePropertyById(cleaning.propertyId);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage Property Checklist</Text>

      <Text style={styles.propertyName}>{property?.name}</Text>
      <Text>
        {property?.street} {property?.name}, {property?.city}
      </Text>

      {cleaning?.cleaningChecklistItems.map((item: CleaningChecklistItem) => (
        <Card key={item.id} className='w-full max-w-96 mt-4 gap-2'>
          <View style={styles.infoGroup}>
            <Text style={styles.sectionTitle}>{item.description}</Text>
            <Text>Frequency In Days: {item.frequencyDays}</Text>
            {item.lastCompleted && (
              <Text>Frequency In Days: {item.frequencyDays}</Text>
            )}
            <Text>
              Completed: <Text>{item.isComplete ? 'Yes' : 'No'}</Text>
            </Text>

            <View style={styles.rowContainer}>
              <Button className='mt-4'>
                <ButtonText>Edit</ButtonText>
              </Button>
              <Button className='mt-4'>
                <ButtonText>Remove</ButtonText>
              </Button>
            </View>
          </View>
        </Card>
      ))}
      <Button variant='secondary' className='w-full max-w-96 mt-4'>
        <ButtonText>Add Checklist Item</ButtonText>
      </Button>
    </ScrollView>
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
  rowContainer: {
    flexDirection: 'row', // Aligns children from left to right
    justifyContent: 'space-around', // Distributes space evenly between items
    alignItems: 'center', // Centers children vertically within the row
    padding: 10,
  },
});
