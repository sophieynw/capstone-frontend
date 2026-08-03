import { Alert, ScrollView, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ChecklistItem, Role } from '@/types/entityTypes';
import { usePropertyById } from '@/hooks/useProperties';
import { toFriendlyDate } from '@/utils/helpers';
import { useContext, useState } from 'react';
import { useCleaners } from '@/hooks/useCleaners';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';
import {
  ChevronDown,
  CircleAlert,
  Save,
  SquareCheckBig,
} from 'lucide-react-native';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { AuthContext } from '@/auth/AuthContext';
import { NotesSection } from '@/components/NotesSection';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';
import { ChecklistSection } from '@/components/ChecklistSection';
import { CleanerChecklistSection } from '@/components/CleanerChecklistSection';
import { PhotosSection } from '@/components/PhotosSection';
import type { ImagePickerAsset } from 'expo-image-picker';
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
import { useCompleteCleaning } from '@/hooks/useCleanings';
import { completeCleaning } from '@/api/cleaningsApi';

const UNASSIGNED_CLEANER_VALUE = 'unassigned';

export default function CleaningDetailsScreen({ route, navigation }: any) {
  const { user } = useContext(AuthContext);
  const { cleaning, propertyId } = route.params;

  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<ImagePickerAsset[]>([]);
  const [cleanerSelected, setCleanerSelected] = useState(
    cleaning?.cleanerId?.toString() ?? UNASSIGNED_CLEANER_VALUE,
  );
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    cleaning?.cleaningChecklistItems ?? [],
  );

  const {
    data: property,
    isPending: isPropertyPending,
    isError: isPropertyError,
    error: propertyError,
  } = usePropertyById(propertyId);
  const {
    data: cleaners,
    isPending: isCleanersPending,
    isError: isCleanersError,
    error: cleanersError,
  } = useCleaners();
  const completeCleaningMutation = useCompleteCleaning();

  const selectedCleaner = cleaners?.find(
    (cleaner) => cleaner.id.toString() === cleanerSelected,
  );
  const selectedCleanerLabel =
    cleanerSelected === UNASSIGNED_CLEANER_VALUE
      ? 'Unassigned'
      : selectedCleaner
        ? `${selectedCleaner.firstName} ${selectedCleaner.lastName}`
        : undefined;

  if (isPropertyPending || isCleanersPending) {
    return <Text>Loading...</Text>;
  }

  if (isPropertyError || isCleanersError) {
    console.error('Property error:', propertyError);
    console.error('Cleaners error:', cleanersError);
    return <Text>Could not load properties.</Text>;
  }

  function handleCompleteCleaning() {
    Alert.alert(
      'Complete Cleaning',
      'Are you sure you want to mark this cleaning as complete?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            completeCleaningMutation.mutate(cleaning.id, {
              onSuccess: () => {
                navigation.goBack();
              },
              onError: () => {
                Alert.alert(
                  'Error marking cleaning as complete',
                  'Please try again later.',
                );
              },
            });
          },
        },
      ],
    );
  }

  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      {/* Header */}
      <View style={styles.modalHeader}>
        <Heading size='2xl'>Cleaning Details</Heading>

        {user?.role === Role.MANAGER ? (
          <Button
            className='rounded-full'
            size='lg'
            onPress={showComingSoonAlert}
          >
            <ButtonIcon as={Save} />
            <ButtonText>Save</ButtonText>
          </Button>
        ) : (
          <Button
            className='rounded-full'
            size='lg'
            onPress={handleCompleteCleaning}
            isDisabled={
              completeCleaningMutation.isPending || cleaning.isComplete
            }
          >
            <ButtonIcon as={SquareCheckBig} />
            <ButtonText>
              {completeCleaningMutation.isPending ? 'Completing...' : 'Done'}
            </ButtonText>
          </Button>
        )}
      </View>

      {/* Content */}
      <View style={styles.modalMain}>
        {/* Cleaning Info & Status Card */}
        <Card style={styles.mediumCardWithAvatar}>
          <View style={styles.mediumCardWithAvatarLeft}>
            <Heading size='md'>Cleaning Info</Heading>
            <View className='gap-1'>
              <Text>
                Starts:{' '}
                {cleaning?.dateTimeStart
                  ? toFriendlyDate(cleaning.dateTimeStart)
                  : 'Loading...'}
              </Text>
              <Text>
                Ends:{' '}
                {cleaning?.dateTimeEnd
                  ? toFriendlyDate(cleaning.dateTimeEnd)
                  : 'Loading...'}
              </Text>
              <Text>
                Status: {cleaning?.isComplete ? 'Complete' : 'Not Started'}
              </Text>
              {user?.role == Role.MANAGER && (
                <View className='flex-row items-center gap-2'>
                  <Text>Cleaner:</Text>
                  <Select
                    selectedValue={cleanerSelected}
                    initialLabel={selectedCleanerLabel}
                    onValueChange={setCleanerSelected}
                  >
                    <SelectTrigger size='md' variant='rounded'>
                      <SelectInput placeholder='Unassigned' />
                      <SelectIcon className='mr-3' as={ChevronDown} />
                    </SelectTrigger>
                    <SelectPortal useRNModal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem
                          label='Unassigned'
                          value={UNASSIGNED_CLEANER_VALUE}
                        />
                        {cleaners?.map((cleanerItem) => (
                          <SelectItem
                            key={cleanerItem.id}
                            label={`${cleanerItem.firstName} ${cleanerItem.lastName}`}
                            value={cleanerItem.id.toString()}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </View>
              )}
            </View>
          </View>

          <Avatar style={styles.mediumCardWithAvatarRight}>
            <AvatarFallbackText>Example Profile Picture</AvatarFallbackText>
            {cleanerSelected !== UNASSIGNED_CLEANER_VALUE ? (
              <AvatarImage
                source={{
                  uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60',
                }}
              />
            ) : (
              <AvatarImage source={require('../assets/unassigned.png')} />
            )}
          </Avatar>
        </Card>

        {/* Property Info Card */}
        <Card style={styles.mediumCard}>
          <Heading size='md'>Property Info</Heading>
          <View className='gap-1'>
            <Text>{property?.name}</Text>
            <Text>
              {property?.unit ? `${property?.unit}-` : ''}
              {property?.street}, {property?.city}
            </Text>
            <Text>{property?.accessInstructions}</Text>
          </View>
        </Card>

        {/* Checklist Card */}
        <Card style={styles.mediumCard}>
          {/* Manager View */}
          {user?.role == Role.MANAGER && (
            <ChecklistSection
              items={checklistItems}
              onItemsChange={setChecklistItems}
            />
          )}
          {/* Cleaner View */}
          {user?.role == Role.CLEANER && (
            <CleanerChecklistSection
              items={cleaning?.cleaningChecklistItems ?? []}
            />
          )}
        </Card>

        {/* Notes Section Card */}
        <Card style={styles.mediumCard}>
          <NotesSection notes={notes} setNotes={setNotes} />
        </Card>

        {/* Photos Section Card */}
        <Card style={styles.mediumCard}>
          <PhotosSection photos={photos} onPhotosChange={setPhotos} />
        </Card>
      </View>

      {user?.role == Role.CLEANER && (
        <Button
          size='lg'
          variant='outline'
          className='rounded-full'
          onPress={showComingSoonAlert}
        >
          <ButtonIcon className='text-red-500' as={CircleAlert} />
          <ButtonText className='text-red-500'>Report an Issue</ButtonText>
        </Button>
      )}

      {/*<Pressable style={globalStyles.button} onPress={console.debug()}>*/}
      {/*  <Text style={globalStyles.buttonText}>Checkout & Submit</Text>*/}
      {/*</Pressable>*/}
    </ScrollView>
  );
}
