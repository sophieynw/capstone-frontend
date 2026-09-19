import { Alert, Pressable, ScrollView, Text } from 'react-native';
import { Card } from '@/components/ui/card';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';
import { AvailabilitySlot, DaysOfTheWeek } from '@/types/entityTypes';
import {dateToTimeString,formatTime, timeStringToDate, toTitleCase } from '@/utils/helpers';
import { useContext, useState } from 'react';
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
import { useAvailabilities,useUpdateAvailability } from '@/hooks/useAvailabilities';
import { AuthContext } from '@/auth/AuthContext';

export default function CleaningAvailabilityScreen() {
  const { user } = useContext(AuthContext);
  const { data: availabilitySlots } = useAvailabilities(user?.id);
  const [showModal, setShowModal] = useState(false);

  const [selectedDay, setSelectedDay] = useState<DaysOfTheWeek | null>(null);

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);

  const updateAvailability = useUpdateAvailability(user?.id);
  // TODO: implement functionality for getting and updating cleaner availability

  function openEditor(slot: AvailabilitySlot) {
    setEditingSlot(slot);
    setStartTime(timeStringToDate(slot.startTime));
    setEndTime(timeStringToDate(slot.endTime));
    setShowModal(true);
  }

  function TimeField({label, value, onChange}: {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
    }) {
    return (
      <>
        <Text className='m-2'>{label}</Text>
        <DateTimePicker
          value={value}
          onChange={(date) => {
            if (date) onChange(date);
          }}
          mode='time'
          format='HH:mm'
        >
          <DateTimePickerTrigger className='m-2 rounded-full'>
            <DateTimePickerInput />
            <DateTimePickerIcon as={Clock} className='mr-3' />
          </DateTimePickerTrigger>
        </DateTimePicker>
      </>
    );
  }

return (
  <ScrollView
    style={styles.screen}
    contentContainerStyle={styles.screenContent}
  >
    {availabilitySlots?.map((slot) => (
      <Pressable key={slot.id} onPress={() => openEditor(slot)}>
        <Card className='rounded-3xl gap-1'>
          <Heading size='md'>{toTitleCase(slot?.dayOfWeek.toString())}</Heading>
          <Text>
            {formatTime(slot.startTime)} to {formatTime(slot.endTime)}
          </Text>
        </Card>
      </Pressable>
    ))}

    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='md'>
      <ModalBackdrop />
      <ModalContent className='rounded-4xl'>
        <ModalHeader>
          <Heading size='lg'>Select a time</Heading>

          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <TimeField
            label='Start Time'
            value={startTime}
            onChange={setStartTime}
          ></TimeField>
          <TimeField
            label='End Time'
            value={endTime}
            onChange={setEndTime}
          ></TimeField>
        </ModalBody>

        <ModalFooter>
          <Button
            className='rounded-full'
            onPress={() => {
              if (!editingSlot) return;
              // @ts-ignore
              if (endTime <= startTime) {
                Alert.alert(
                  'Invalid time',
                  'End time must be later than start time.',
                );
                return;
              }

              updateAvailability.mutate(
                {
                  id: editingSlot.id,
                  startTime: dateToTimeString(startTime),
                  endTime: dateToTimeString(endTime),
                },
                { onSuccess: () => setShowModal(false) },
              );
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
