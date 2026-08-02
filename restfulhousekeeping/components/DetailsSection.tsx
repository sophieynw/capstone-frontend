import { Heading } from '@/components/ui/heading';
import { View } from 'react-native';
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
import { Calendar, ChevronDown } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import {
  DateTimePicker,
  DateTimePickerIcon,
  DateTimePickerInput,
  DateTimePickerTrigger,
} from '@/components/ui/date-time-picker';
import { Property, User } from '@/types/entityTypes';

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

export function DetailsSection({
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
      <Heading size='md'>Details</Heading>
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
            format='YYYY-MM-DD HH:mm'
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
            format='YYYY-MM-DD HH:mm'
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
