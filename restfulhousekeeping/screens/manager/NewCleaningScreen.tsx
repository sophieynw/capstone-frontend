// screens/home/NewCleaningScreen.tsx
import { Alert, ScrollView, View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useContext, useState } from 'react';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { styles } from '@/styles/styles';
import { SaveIcon } from 'lucide-react-native';
import { usePropertyAll } from '@/hooks/useProperties';
import { ChecklistItem, Role } from '@/types/entityTypes';
import { useCleaners } from '@/hooks/useCleaners';
import { ChecklistSection } from '@/components/ChecklistSection';
import { AuthContext } from '@/auth/AuthContext';
import { useCreateCleaning } from '@/hooks/useCleanings';
import { NotesSection } from '@/components/NotesSection';
import { DetailsSection } from '@/components/DetailsSection';

function formatLocalDateTime(date: Date): string {
  const pad = (value: number) => value.toString().padStart(2, '0');

  return (
    `${date.getFullYear()}-` +
    `${pad(date.getMonth() + 1)}-` +
    `${pad(date.getDate())}T` +
    `${pad(date.getHours())}:` +
    `${pad(date.getMinutes())}:00`
  );
}

export default function NewCleaningScreen() {
  const { user } = useContext(AuthContext);
  const createCleaningMutation = useCreateCleaning();

  const [propertySelected, setPropertySelected] = useState('');
  const [cleanerSelected, setCleanerSelected] = useState('');
  const [startDateSelected, setStartDateSelected] = useState(new Date());
  const [endDateSelected, setEndDateSelected] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

  const {
    data: properties,
    isLoading: isPropertiesLoading,
    isError: isPropertiesError,
    error: propertiesError,
  } = usePropertyAll();
  const {
    data: cleaners,
    isLoading: isCleanersLoading,
    isError: isCleanersError,
    error: cleanersError,
  } = useCleaners();

  function handleSubmit() {
    if (!user) {
      Alert.alert('Error', 'You must be signed in.');
      return;
    }

    if (!propertySelected) {
      Alert.alert('Missing property', 'Please select a property.');
      return;
    }

    if (endDateSelected <= startDateSelected) {
      Alert.alert('Invalid time', 'The end time must be after the start time.');
      return;
    }

    const cleaningChecklistItems = checklistItems
      .filter((item) => item.description.trim())
      .map((item) =>
        item.id > 0
          ? { checklistItem: { id: item.id } }
          : { customDescription: item.description.trim() },
      );

    createCleaningMutation.mutate({
      manager: { id: user.id, role: Role.MANAGER },
      cleaner: cleanerSelected
        ? { id: Number(cleanerSelected), role: Role.CLEANER }
        : null,
      property: { id: Number(propertySelected) },
      dateTimeStart: formatLocalDateTime(startDateSelected),
      dateTimeEnd: formatLocalDateTime(endDateSelected),
      notes: notes.trim() || null,
      cleaningChecklistItems,
    });
  }

  if (isPropertiesLoading || isCleanersLoading) {
    return <Text>Loading properties...</Text>;
  }

  if (isPropertiesError || isCleanersError) {
    console.error('Properties error:', propertiesError);
    console.error('Cleaners error:', cleanersError);
    return <Text>Could not load properties.</Text>;
  }

  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      {/* Header */}
      <View style={styles.modalHeader}>
        <Heading size='2xl'>New Cleaning</Heading>
        <Button
          className='rounded-full'
          size='lg'
          onPress={handleSubmit}
          isDisabled={createCleaningMutation.isPending}
        >
          <ButtonIcon as={SaveIcon} />
          <ButtonText>
            {createCleaningMutation.isPending ? 'Saving...' : 'Save'}
          </ButtonText>
        </Button>
      </View>

      {/* Content */}
      <View style={styles.modalMain}>
        <Card style={styles.bigCard}>
          <DetailsSection
            properties={properties}
            propertySelected={propertySelected}
            setPropertySelected={setPropertySelected}
            cleaners={cleaners}
            cleanerSelected={cleanerSelected}
            setCleanerSelected={setCleanerSelected}
            startDateSelected={startDateSelected}
            setStartDateSelected={setStartDateSelected}
            endDateSelected={endDateSelected}
            setEndDateSelected={setEndDateSelected}
          />
          <ChecklistSection
            propertyId={propertySelected ? Number(propertySelected) : undefined}
            onItemsChange={setChecklistItems}
          />

          <NotesSection notes={notes} setNotes={setNotes} />
        </Card>
      </View>
    </ScrollView>
  );
}
