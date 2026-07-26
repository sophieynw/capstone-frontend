import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { toFriendlyDate, toTitleCase } from '@/utils/helpers';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { AddIcon, EditIcon } from '@/components/ui/icon';
import { Cleaning } from '@/types/entityTypes';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import { useProperty } from '@/hooks/useProperties';

// region CardCard

type CleaningCardProps = {
  readonly cleaning: Cleaning;
  //readonly property: Property;
  navigation: any;
};

function CleaningCard({ cleaning, navigation }: CleaningCardProps) {
  const {
    data: property,
  } = useProperty(cleaning.propertyId);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('CleaningDetailsScreen');
      }}
    >
      <Card className='gap-6 rounded-3xl'>
        <View className='flex-row items-center justify-between'>
          {/* Left Side (Text) */}
          <View className='gap-2'>
            <Heading size='md'>{property?.name}</Heading>
            <View className='gap-1'>
              <Text>{toFriendlyDate(cleaning.dateTimeStart)}</Text>
              <Text>
                Assigned to{' '}
                {/* TODO: change this to cleaner name after implementing GET cleaners API */}
                {cleaning.cleanerId
                  ? `${cleaning.cleanerId} ${cleaning.cleanerId}`
                  : 'Unassigned'}
              </Text>
            </View>
          </View>

          {/* Right Side (Image) */}
          <Avatar className='w-20 h-20'>
            <AvatarFallbackText>Example Profile Picture</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60',
              }}
            />
          </Avatar>
        </View>
      </Card>
    </Pressable>
  );
}

// endregion CleaningCard

export default function HomeScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const { data: cleanings, isLoading, isError, error } = useUpcomingCleanings();

  if (isLoading) {
    return <Text>Loading cleanings...</Text>;
  }

  if (isError) {
    console.error(error);
    return <Text>Could not load cleanings.</Text>;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {/* Header */}
      <View style={styles.vStack}>
        <Text style={styles.title}>
          {toTitleCase(user?.role ?? '')} Dashboard
        </Text>
        <Text>Welcome back {user?.firstName}!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.hStack}>
        <Button
          className='rounded-full w-40'
          size='lg'
          onPress={() => navigation.navigate('ManageTeamScreen')}
        >
          <ButtonIcon as={EditIcon} />
          <ButtonText>My Team</ButtonText>
        </Button>
        <Button
          className='rounded-full w-40'
          size='lg'
          onPress={() => navigation.navigate('NewCleaningScreen')}
        >
          <ButtonIcon as={AddIcon} />
          <ButtonText>New Cleaning</ButtonText>
        </Button>
      </View>

      {/* Info */}
      {/* Made them buttons for now in case we want them to open something later */}
      <ScrollView horizontal contentContainerStyle={styles.hStack}>
        <Button variant='outline' className='rounded-full' disabled>
          <ButtonText># Upcoming</ButtonText>
        </Button>
        <Button variant='outline' className='rounded-full' disabled>
          <ButtonText># Issues</ButtonText>
        </Button>
        <Button variant='outline' className='rounded-full' disabled>
          <ButtonText># Unassigned</ButtonText>
        </Button>
      </ScrollView>

      {/* Upcoming Cleanings */}
      <View style={styles.vStack}>
        <Text style={styles.sectionTitle}>Upcoming Cleanings</Text>
        {cleanings?.map((cleaning) => (
          <CleaningCard
            key={cleaning.id}
            cleaning={cleaning}
            navigation={navigation}
          />
        ))}

        {cleanings?.length === 0 && <Text>No upcoming cleanings.</Text>}
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenContent: {
    padding: 24,
    gap: 20,
  },
  vStack: {
    flex: 1,
    gap: 12,
  },
  hStack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
