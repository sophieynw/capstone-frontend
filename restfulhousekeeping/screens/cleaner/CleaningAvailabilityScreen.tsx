import { Alert, Pressable, ScrollView, Text } from 'react-native';
import { Card } from '@/components/ui/card';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';
import { DaysOfTheWeek } from '@/types/entityTypes';
import { toTitleCase } from '@/utils/helpers';
import { useState } from 'react';
import { CloseIcon, Icon } from '@/components/ui/icon';
import {
  DateTimePicker,
  DateTimePickerIcon,
  DateTimePickerInput,
  DateTimePickerTrigger,
} from '@/components/ui/date-time-picker';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Clock } from 'lucide-react-native';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';

export default function MoreScreen() {
  const [showModal, setShowModal] = useState(false);

  const [selectedDay, setSelectedDay] = useState<DaysOfTheWeek | null>(null);

  const [startTime, setStartTime] = useState<Date | undefined>(new Date());
  const [endTime, setEndTime] = useState<Date | undefined>(new Date());

  const [availability, setAvailability] = useState<
  Partial<
    Record<
      DaysOfTheWeek,
      {
        startTime: Date;
        endTime: Date;
      }
    >
  >
>({});

  // TODO: implement functionality for getting and updating cleaner availability

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {Object.values(DaysOfTheWeek).map((day) => (
        
        <Pressable
          key={day}
          onPress={() => {
            setSelectedDay(day);

            const savedTime = availability[day];

            if (savedTime) {
              setStartTime(savedTime.startTime);
              setEndTime(savedTime.endTime);
            } else {
              setStartTime(new Date());
              setEndTime(new Date());
            } 

    setShowModal(true);
  }}
>
          <Card className='rounded-3xl gap-1'>
            <Heading size='md'>{`${toTitleCase(day.toString())}s`}</Heading>
            <Text>
              {availability[day]
                ? `${availability[day]!.startTime.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
              })} to ${availability[day]!.endTime.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
              })}`
            : '9:00 am to 10:00 pm'}
          </Text>
          </Card>
        </Pressable>
      ))}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='md'>
        <ModalBackdrop />

        <ModalContent className='rounded-4xl'>
          <ModalHeader>
            <Heading size='lg'>
              {selectedDay
                ? `${toTitleCase(selectedDay.toString())} Availability`
                : 'Select a time'}
            </Heading>

            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <Text className='m-2'>Start Time</Text>
            <DateTimePicker
              value={startTime}
              onChange={setStartTime}
              mode='time'
              is24Hour={true}
              format='HH:mm'
              placeholder='Select time'
            >
              <DateTimePickerTrigger className='m-2 rounded-full'>
                <DateTimePickerInput />
                <DateTimePickerIcon as={Clock} className='mr-3' />
              </DateTimePickerTrigger>
            </DateTimePicker>

            <Text className='m-2'>End Time</Text>
            <DateTimePicker
              value={endTime}
              onChange={setEndTime}
              mode='time'
              is24Hour={false}
              format='HH:mm'
              placeholder='Select time'
            >
              <DateTimePickerTrigger className='m-2 rounded-full'>
                <DateTimePickerInput />
                <DateTimePickerIcon as={Clock} />
              </DateTimePickerTrigger>
            </DateTimePicker>
          </ModalBody>

          <ModalFooter>
            <Button
              className='rounded-full'
              onPress={() => {
                if (!selectedDay || !startTime || !endTime) {
                  return;
                }

                if (endTime <= startTime) {
                  Alert.alert(
                    'Invalid time',
                    'End time must be later than start time.',
                 );
                return;
                }

                setAvailability((current) => ({
                  ...current,
                  [selectedDay]: {
                    startTime,
                    endTime,
                  },
              }));

  setShowModal(false);
}}
            >
              <ButtonText>Done</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
}
