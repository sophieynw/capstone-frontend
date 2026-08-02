import { Alert, ScrollView, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { ChecklistItem, Role } from '@/types/entityTypes';
import { usePropertyById } from '@/hooks/useProperties';
import { toFriendlyDate } from '@/utils/helpers';
import { useContext, useState } from 'react';
import { useCleanerById } from '@/hooks/useCleaners';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';
import { Save, SquareCheckBig } from 'lucide-react-native';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { AuthContext } from '@/auth/AuthContext';
import { NotesSection } from '@/components/NotesSection';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';
import { ChecklistSection } from '@/components/ChecklistSection';

export default function CleaningDetailsScreen({ route }: any) {
  const { user } = useContext(AuthContext);
  const { cleaning, cleanerId, propertyId } = route.params;
  const { data: property } = usePropertyById(propertyId);
  const { data: cleaner } = useCleanerById(cleanerId);
  const [notes, setNotes] = useState('');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    cleaning?.cleaningChecklistItems ?? [],
  );

  function handleCompleteCleaning() {
    Alert.alert(
      'Complete Cleaning',
      'Are you sure you want to mark this cleaning as complete?',
      [
        // TODO: implement PATCH request to update Cleaning record
        { text: 'Yes', onPress: () => console.log('Cleaning completed.') },
        { text: 'No', onPress: () => console.log('Cancelled.') },
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
          >
            <ButtonIcon as={SquareCheckBig} />
            <ButtonText>Complete</ButtonText>
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
                Cleaner:{' '}
                {cleaning?.cleanerId
                  ? `${cleaner?.firstName} ${cleaner?.lastName}`
                  : 'Unassigned'}
              </Text>
              <Text>
                Status: {cleaning?.isComplete ? 'Complete' : 'Not Started'}
              </Text>
            </View>
          </View>

          <Avatar style={styles.mediumCardWithAvatarRight}>
            <AvatarFallbackText>Example Profile Picture</AvatarFallbackText>
            {cleaning?.cleanerId !== null ? (
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
        </Card>

        {/* Notes Section Card */}
        <Card style={styles.mediumCard}>
          <NotesSection notes={notes} setNotes={setNotes} />
        </Card>
      </View>

      {/*<Pressable style={globalStyles.button} onPress={console.debug()}>*/}
      {/*  <Text style={globalStyles.buttonText}>Checkout & Submit</Text>*/}
      {/*</Pressable>*/}

      {/*<Button variant='secondary' style={globalStyles.link}>*/}
      {/*  <ButtonText>Check Out & Submit</ButtonText>*/}
      {/*</Button>*/}
    </ScrollView>
  );
}
