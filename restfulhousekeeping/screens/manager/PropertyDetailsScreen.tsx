import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { styles } from '@/styles/styles';
import { Save, Trash } from 'lucide-react-native';
import {
  useDeleteProperty,
  useImportAirbnbCalendar,
  usePropertyById,
  useUpdateProperty,
} from '@/hooks/useProperties';
import { useChecklistItems } from '@/hooks/useChecklistItems';
import { ChecklistEditingSection } from '@/components/ChecklistEditingSection';
import {
  createEditableProperty,
  EditableProperty,
  PropertyEditingSection,
} from '@/components/PropertyEditingSection';
import {
  ReportedIssue,
  ReportedIssuesSection,
} from '@/components/ReportedIssuesSection';

import { Card } from '@/components/ui/card';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal';
import { CloseIcon, Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';

const reportedIssues: ReportedIssue[] = [
  { id: 1, description: 'One of the dining chairs has a loose leg' },
  { id: 2, description: 'Garbage area needs to be cleaned' },
  { id: 3, description: 'Need more replacement towels' },
];

export default function PropertyDetailsScreen({ route }: any) {
  const { propertyId } = route.params;
  const deletePropertyMutation = useDeleteProperty();
  const updatePropertyMutation = useUpdateProperty();
  const importAirbnbCalendarMutation = useImportAirbnbCalendar();
  const [showAirbnbModal, setShowAirbnbModal] = useState(false);
  const [icalUrl, setIcalUrl] = useState('');
  const [propertyForm, setPropertyForm] = useState<EditableProperty>(() =>
    createEditableProperty(),
  );
  const {
    data: property,
    isPending: isPropertyPending,
    isError: isPropertyError,
    error: propertyError,
  } = usePropertyById(propertyId);
  const {
    data: checklistItems,
    isPending: isChecklistItemsPending,
    isError: isChecklistItemsError,
    error: checklistItemsError,
  } = useChecklistItems(propertyId);

  useEffect(() => {
    if (!property) return;

    setPropertyForm(createEditableProperty(property));
  }, [property]);

  if (isPropertyPending || isChecklistItemsPending) {
    return <Text>Loading...</Text>;
  }

  if (isPropertyError || isChecklistItemsError) {
    console.error('Property error:', propertyError);
    console.error('ChecklistItems error:', checklistItemsError);
    return <Text>Could not load properties.</Text>;
  }
  function handleDelete() {
    Alert.alert(
      'Delete property?',
      `Are you sure you want to delete ${propertyForm.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deletePropertyMutation.mutate(propertyId),
        },
      ],
    );
  }
  function handleUpdate() {
    if (propertyForm.checkinTime <= propertyForm.checkoutTime) {
      Alert.alert(
        'Invalid times',
        'Check-in time must be later than checkout time.',
      );
      return;
    }

    updatePropertyMutation.mutate({
      propertyId,
      property: propertyForm,
    });
  }

  function closeAirbnbModal() {
    if (importAirbnbCalendarMutation.isPending) return;
    setShowAirbnbModal(false);
    setIcalUrl('');
  }

  function handleAirbnbImport() {
    const trimmedUrl = icalUrl.trim();

    if (!trimmedUrl) {
      Alert.alert('Missing link', 'Enter your Airbnb calendar link.');
      return;
    }

    if (!trimmedUrl.startsWith('https://') || !trimmedUrl.includes('.ics')) {
      Alert.alert(
        'Invalid link',
        'Enter a secure Airbnb calendar link containing .ics.',
      );
      return;
    }

    importAirbnbCalendarMutation.mutate(
      { propertyId, icalUrl: trimmedUrl },
      {
        onSuccess: () => {
          setShowAirbnbModal(false);
          setIcalUrl('');
        },
      },
    );
  }
  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      {/* Heading */}
      <View style={styles.modalHeader}>
        <Heading size='2xl'>Property Details</Heading>
      </View>

      <View style={styles.hStack}>
        <Button className='rounded-full' size='lg' onPress={handleDelete}>
          <ButtonIcon as={Trash} />
          <ButtonText>Delete</ButtonText>
        </Button>
        <Button className='rounded-full' size='lg' onPress={handleUpdate}>
          <ButtonIcon as={Save} />
          <ButtonText>Update</ButtonText>
        </Button>
      </View>

      {/* Content */}
      <View style={styles.modalMain}>
        <Pressable onPress={() => setShowAirbnbModal(true)}>
          <Card style={styles.mediumCardWithAvatar}>
            <View style={styles.mediumCardWithAvatarLeft}>
              <Avatar>
                <AvatarFallbackText>Airbnb Logo</AvatarFallbackText>
                <AvatarImage source={require('@/assets/airbnb.png')} />
              </Avatar>
            </View>
            <View className='w-full'>
              <Text>Import Airbnb calendar</Text>
            </View>
          </Card>
        </Pressable>

        {/* Property Details */}
        <PropertyEditingSection
          property={propertyForm}
          onPropertyChange={setPropertyForm}
        />

        {/* Checklist Items */}
        <ChecklistEditingSection
          items={checklistItems}
          onItemsChange={() => console.log('Items changed.')}
        />

        {/* Issues */}
        <ReportedIssuesSection issues={reportedIssues} />
      </View>

      <Modal
        isOpen={showAirbnbModal}
        onClose={closeAirbnbModal}
        size='md'
        useRNModal
      >
        <ModalBackdrop />
        <ModalContent className='rounded-4xl'>
          <ModalHeader>
            <Heading size='lg'>Import Airbnb calendar</Heading>
            <ModalCloseButton onPress={closeAirbnbModal}>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <View className='gap-2'>
              <Text>Paste the Airbnb calendar link for this property.</Text>
              <Input className='rounded-2xl'>
                <InputField
                  value={icalUrl}
                  onChangeText={setIcalUrl}
                  placeholder='https://www.airbnb.com/calendar/ical/...ics'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='url'
                />
              </Input>
            </View>
          </ModalBody>

          <ModalFooter>
            <Button
              variant='outline'
              onPress={closeAirbnbModal}
              isDisabled={importAirbnbCalendarMutation.isPending}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={handleAirbnbImport}
              isDisabled={importAirbnbCalendarMutation.isPending}
            >
              <ButtonText>
                {importAirbnbCalendarMutation.isPending
                  ? 'Importing...'
                  : 'Confirm'}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
}
