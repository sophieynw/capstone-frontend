// screens/home/NewCleaningScreen.tsx
import { Alert, ScrollView, View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import {
  DateTimePicker,
  DateTimePickerIcon,
  DateTimePickerInput,
  DateTimePickerTrigger,
} from '@/components/ui/date-time-picker';
import { useContext, useState } from 'react';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { styles } from '@/styles/styles';
import { Calendar, ChevronDown, SaveIcon } from 'lucide-react-native';
import { usePropertyAll } from '@/hooks/useProperties';
import { ChecklistItem, Property, Role, User } from '@/types/entityTypes';
import { useCleaners } from '@/hooks/useCleaners';
import { ChecklistSection } from '@/screens/components/ChecklistSection';
import { AuthContext } from '@/auth/AuthContext';
import { useCreateCleaning } from '@/hooks/useCleanings';

// region Details Section

type DetailsSectionProps = {
  properties: Property[] | undefined;
  propertySelected: string;
  setPropertySelected: (property: string) => void;
  cleaners: User[] | undefined;
  cleanerSelected: string;
  setCleanerSelected: (cleaning: string) => void;
  startDateSelected: Date;
  setStartDateSelected: (startDate: Date) => void;
  endDateSelected: Date;
  setEndDateSelected: (endDate: Date) => void;
};

function DetailsSection({
  properties,
  propertySelected,
  setPropertySelected,
  cleaners,
  cleanerSelected,
  setCleanerSelected,
  startDateSelected,
  setStartDateSelected,
  endDateSelected,
  setEndDateSelected,
}: DetailsSectionProps) {
  return (
    <>
      <Heading size='xl'>Details</Heading>
      <View className='flex-row gap-4 justify-center'>
        {/* Properties */}
        <Select
          selectedValue={propertySelected}
          onValueChange={setPropertySelected}
        >
          <SelectTrigger size='md' variant='rounded'>
            <SelectInput placeholder='Property' />
            <SelectIcon className='mr-3' as={ChevronDown} />
          </SelectTrigger>
          <SelectPortal useRNModal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {properties?.map((propertyItem) => (
                <SelectItem
                  key={propertyItem.id}
                  label={propertyItem.name}
                  value={propertyItem.id.toString()}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        {/* Cleaner */}
        <Select
          selectedValue={cleanerSelected}
          onValueChange={setCleanerSelected}
        >
          <SelectTrigger size='md' variant='rounded'>
            <SelectInput placeholder='Cleaner' />
            <SelectIcon className='mr-3' as={ChevronDown} />
          </SelectTrigger>
          <SelectPortal useRNModal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {cleaners?.map((cleanerItem) => (
                <SelectItem
                  key={cleanerItem.id}
                  label={`${cleanerItem.firstName} ${cleanerItem.lastName.charAt(0)}.`}
                  value={cleanerItem.id.toString()}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>
      <View className='flex-col justify-center gap-4'>
        {/*Starts*/}
        <View className='w-full flex-row gap-4 justify-center items-center'>
          <Text>Starts</Text>
          <DateTimePicker
            value={startDateSelected}
            onChange={(date) => {
              if (date) {
                setStartDateSelected(date);
              }
            }}
            mode='datetime'
            placeholder='Select date and time'
          >
            <DateTimePickerTrigger variant='rounded'>
              <DateTimePickerInput />
              <DateTimePickerIcon as={Calendar} className='mr-3' />
            </DateTimePickerTrigger>
          </DateTimePicker>
        </View>
        {/*Ends*/}
        <View className='w-full flex-row gap-4 justify-center items-center'>
          <Text>Ends</Text>
          <DateTimePicker
            value={endDateSelected}
            onChange={(date) => {
              if (date) {
                setEndDateSelected(date);
              }
            }}
            mode='datetime'
            placeholder='Select date and time'
          >
            <DateTimePickerTrigger variant='rounded'>
              <DateTimePickerInput />
              <DateTimePickerIcon as={Calendar} className='mr-3' />
            </DateTimePickerTrigger>
          </DateTimePicker>
        </View>
      </View>
    </>
  );
}

// endregion Details Section

// region Notes Section

type NotesSectionProps = {
  notes: string;
  setNotes: (notes: string) => void;
};

function NotesSection({ notes, setNotes }: NotesSectionProps) {
  return (
    <View className='flex-col justify-center gap-2'>
      <Heading size='xl'>Notes</Heading>
      <View className='py-2'>
        <Textarea className='w-full rounded-3xl px-2'>
          <TextareaInput placeholder='Add a note here...' />
        </Textarea>
      </View>
    </View>
  );
}

// endregion Notes Section

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
