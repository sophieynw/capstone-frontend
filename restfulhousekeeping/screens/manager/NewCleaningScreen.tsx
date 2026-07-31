// screens/home/NewCleaningScreen.tsx
import { Pressable, ScrollView, View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  AddIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  TrashIcon,
} from '@/components/ui/icon';
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
import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { styles } from '@/styles/styles';
import { SaveIcon } from 'lucide-react-native';
import { usePropertyAll } from '@/hooks/useProperties';

// region Details Section

type DetailsSectionProps = {
  property: string;
  setProperty: (property: string) => void;
  cleaner: string;
  setCleaner: (cleaning: string) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
};

function DetailsSection({
  property,
  setProperty,
  cleaner,
  setCleaner,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DetailsSectionProps) {
  return (
    <>
      <Heading size='xl'>Details</Heading>
      <View className='flex-row gap-4 justify-center'>
        {/* Properties */}
        <Select selectedValue={property} onValueChange={setProperty}>
          <SelectTrigger size='md' variant='rounded'>
            <SelectInput placeholder='Property' />
            <SelectIcon className='mr-3' as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal useRNModal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label='Wayward Pines' value='1' />
              <SelectItem label='Union St.' value='2' />
            </SelectContent>
          </SelectPortal>
        </Select>
        {/* Cleaner */}
        <Select selectedValue={cleaner} onValueChange={setCleaner}>
          <SelectTrigger size='md' variant='rounded'>
            <SelectInput placeholder='Cleaner' />
            <SelectIcon className='mr-3' as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal useRNModal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label='UX Research' value='ux' />
              <SelectItem label='Web Development' value='web' />
              <SelectItem
                label='Cross Platform Development Process'
                value='Cross Platform Development Process'
              />
              <SelectItem label='UI Designing' value='ui' isDisabled={true} />
              <SelectItem label='Backend Development' value='backend' />
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>
      <View className='flex-col justify-center gap-4'>
        {/*Starts*/}
        <View className='w-full flex-row gap-4 justify-center items-center'>
          <Text>Starts</Text>
          <DateTimePicker
            value={startDate}
            onChange={(date) => {
              if (date) {
                setStartDate(date);
              }
            }}
            mode='datetime'
            placeholder='Select date and time'
          >
            <DateTimePickerTrigger variant='rounded'>
              <DateTimePickerInput />
              <DateTimePickerIcon as={CalendarDaysIcon} className='mr-3' />
            </DateTimePickerTrigger>
          </DateTimePicker>
        </View>
        {/*Ends*/}
        <View className='w-full flex-row gap-4 justify-center items-center'>
          <Text>Ends</Text>
          <DateTimePicker
            value={endDate}
            onChange={(date) => {
              if (date) {
                setEndDate(date);
              }
            }}
            mode='datetime'
            placeholder='Select date and time'
          >
            <DateTimePickerTrigger variant='rounded'>
              <DateTimePickerInput />
              <DateTimePickerIcon as={CalendarDaysIcon} className='mr-3' />
            </DateTimePickerTrigger>
          </DateTimePicker>
        </View>
      </View>
    </>
  );
}

// endregion Details Section

// region Checklist Section

function ChecklistSection() {
  const [newTodoDescription, setNewTodoDescription] = useState('');

  // sample data for testing only
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', description: 'Clean kitchen counters and sink' },
    { id: '2', description: 'Clean and disinfect bathroom' },
    { id: '3', description: 'Change bed linens' },
  ]);

  function addTodo() {
    const description = newTodoDescription.trim();

    if (!description) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Date.now().toString(),
        description,
      },
    ]);

    setNewTodoDescription('');
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function updateTodoDescription(id: string, description: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, description } : todo,
      ),
    );
  }

  return (
    <View className='flex-col justify-center gap-2'>
      <Heading size='xl'>Checklist</Heading>
      <View className='py-2 gap-3'>
        {todos.map((todo) => (
          <NewCleaningCard
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id)}
            onChangeDescription={(text) => updateTodoDescription(todo.id, text)}
          />
        ))}

        <Input className='w-full rounded-full'>
          <InputField
            value={newTodoDescription}
            onChangeText={setNewTodoDescription}
            onSubmitEditing={addTodo}
            placeholder='Add checklist item'
            returnKeyType='done'
          />

          <InputSlot>
            <Pressable onPress={addTodo} className='ml-3'>
              <InputIcon as={AddIcon} />
            </Pressable>
          </InputSlot>
        </Input>
      </View>
    </View>
  );
}

// endregion Checklist Section

// region Notes Section

function NotesSection() {
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

// region New Cleaning Card Section

type Todo = {
  id: string;
  description: string;
};

function NewCleaningCard({
  todo,
  onDelete,
  onChangeDescription,
}: {
  todo: Todo;
  onDelete: () => void;
  onChangeDescription: (text: string) => void;
}) {
  return (
    <Input className='rounded-full'>
      <InputField
        value={todo.description}
        onChangeText={onChangeDescription}
        placeholder='Checklist item'
      />
      <InputSlot className='pl-3'>
        <Pressable onPress={onDelete} className='ml-3'>
          <InputIcon as={TrashIcon} />
        </Pressable>
      </InputSlot>
    </Input>
  );
}

// endregion New Cleaning Card Section

export default function NewCleaningScreen() {
  const [property, setProperty] = useState('');
  const [cleaner, setCleaner] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { data: properties, isLoading, isError, error } = usePropertyAll();

  return (
    <ScrollView
      contentContainerStyle={{ gap: 12 }}
      className='flex-1 bg-gray-100 p-5'
    >
      {/* Header */}
      <View style={styles.modalScreen}>
        <Heading size='2xl'>New Cleaning</Heading>
        <Button className='rounded-full' size='lg'>
          <ButtonIcon as={SaveIcon} />
          <ButtonText>Save</ButtonText>
        </Button>
      </View>

      {/* Content */}
      <View style={styles.modalContent}>
        <Card className='w-full rounded-4xl bg-white p-6 gap-4'>
          <DetailsSection
            property={property}
            setProperty={setProperty}
            cleaner={cleaner}
            setCleaner={setCleaner}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <ChecklistSection />
          <NotesSection />
        </Card>
      </View>
    </ScrollView>
  );
}
