// screens/home/NewCleaningScreen.tsx
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  AddIcon,
  CalendarDaysIcon,
  CheckIcon,
  ChevronDownIcon,
  Icon,
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

type Todo = {
  id: string;
  description: string;
};

function ChecklistCard({
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

export default function NewCleaningScreen() {
  const [property, setProperty] = useState('');
  const [cleaner, setCleaner] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    <ScrollView
      contentContainerStyle={{ gap: 12 }}
      className='flex-1 bg-gray-100 p-5'
    >
      {/* Header */}
      <View className='flex-1 flex-row justify-between p-2 items-center'>
        <Heading size='2xl'>New Cleaning</Heading>
        <Button className='rounded-full' size='lg'>
          <ButtonIcon as={CheckIcon} />
          <ButtonText>Save</ButtonText>
        </Button>
      </View>

      {/* Content */}
      <Card className='w-full rounded-4xl bg-white p-6 gap-4'>
        {/* Details */}
        <Heading size='xl'>Details</Heading>
        {/* Dropdown Boxes */}
        <View className='flex-row gap-4 justify-center'>
          {/* Properties */}
          <Select selectedValue={property} onValueChange={setProperty}>
            <SelectTrigger size='md' variant='rounded'>
              <SelectInput placeholder='Property' />
              <SelectIcon className='mr-3' as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
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
            <SelectPortal>
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
        {/* Start End Times */}
        <View className='flex-col justify-center gap-4'>
          {/*Starts*/}
          <View className='flex-row gap-4 justify-center items-center'>
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
          <View className='flex-row gap-4 justify-center items-center'>
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
        {/* Checklist */}
        <View className='flex-col justify-center gap-2'>
          <Heading size='xl'>Checklist</Heading>
          <View className='py-2 gap-3'>
            {todos.map((todo) => (
              <ChecklistCard
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodo(todo.id)}
                onChangeDescription={(text) =>
                  updateTodoDescription(todo.id, text)
                }
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

        <View className='flex-col justify-center gap-2'>
          <Heading size='xl'>Notes</Heading>
          <View className='py-2'>
            <Textarea className='w-full rounded-3xl px-2'>
              <TextareaInput placeholder='Add a note here...' />
            </Textarea>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
