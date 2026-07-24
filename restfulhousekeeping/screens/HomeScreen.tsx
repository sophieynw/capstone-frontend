import { Pressable, ScrollView, Text, View } from 'react-native';
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
import { styles } from '@/styles/screenStyles';
import { Cleaning } from '@/types/entityTypes';
import { useUpcomingCleanings } from '@/hooks/useCleanings';

type CleaningCardProps = {
  readonly cleaningRecord: Cleaning;
  readonly imageUri?: string;
  navigation: any;
};

function CleaningCard({
  cleaningRecord,
  imageUri,
  navigation,
}: CleaningCardProps) {
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
            {/* TODO: change this to property name after implementing GET property API */}
            <Heading size='md'>{cleaningRecord.propertyId}</Heading>
            <View className='gap-1'>
              <Text>{toFriendlyDate(cleaningRecord.dateTimeStart)}</Text>
              <Text>
                Assigned to{' '}
                {/* TODO: change this to cleaner name after implementing GET cleaners API */}
                {cleaningRecord.cleanerId
                  ? `${cleaningRecord.cleanerId} ${cleaningRecord.cleanerId}`
                  : 'Unassigned'}
              </Text>
            </View>
          </View>
          {/* Right Side (Image) */}
          <Avatar className='w-20 h-20'>
            <AvatarFallbackText>Example Profile Picture</AvatarFallbackText>
            <AvatarImage
              source={
                imageUri
                  ? { uri: imageUri }
                  : {
                      uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60',
                    }
              }
            />
          </Avatar>
        </View>
      </Card>
    </Pressable>
  );
}

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
      <View style={styles.vContainer}>
        <Text style={styles.title}>
          {toTitleCase(user?.role ?? '')} Dashboard
        </Text>
        <Text>Welcome back {user?.firstName}!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.hContainer}>
        {/*<Button>*/}
        {/*  <ButtonText>Manage Properties</ButtonText>*/}
        {/*</Button>*/}
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
      {/* Made them buttons for now in case we want them to open something */}
      <ScrollView horizontal contentContainerStyle={styles.hContainer}>
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

      {/* Cleaning Cards */}
      <View style={styles.vContainer}>
        <Text style={styles.sectionTitle}>Upcoming Cleanings</Text>
        {cleanings?.map((cleaning) => (
          <CleaningCard
            key={cleaning.id}
            cleaningRecord={cleaning}
            navigation={navigation}
          />
        ))}

        {cleanings?.length === 0 && <Text>No upcoming cleanings.</Text>}
      </View>
    </ScrollView>
  );
}
