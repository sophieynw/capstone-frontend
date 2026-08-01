import { Pressable, ScrollView, Text, View } from 'react-native';
import { useCallback, useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { groupCleaningsByDate, toFriendlyDate } from '@/utils/helpers';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Cleaning, Role } from '@/types/entityTypes';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import { usePropertyById } from '@/hooks/useProperties';
import { useCleanerById } from '@/hooks/useCleaners';
import { styles } from '@/styles/styles';
import { Plus, UsersRound } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

// region Cleaning Card

type CleaningCardProps = {
  readonly cleaning: Cleaning;
  //readonly property: Property;
  navigation: any;
};

function CleaningCard({ cleaning, navigation }: CleaningCardProps) {
  const { data: property } = usePropertyById(cleaning.propertyId);
  const { data: cleaner } = useCleanerById(cleaning.cleanerId);
  //const { data: cleaning } = useCleaningById(cleaning.cleaningId);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('PropertyDetails', {
          cleaning: cleaning,
          propertyId: cleaning.propertyId,
          cleanerId: cleaning.cleanerId,
        });
      }}
    >
      <Card style={styles.mediumCardWithAvatar}>
        {/* Left Side (Text) */}
        <View style={styles.mediumCardWithAvatarLeft}>
          <Heading size='md'>{property?.name}</Heading>
          <View className='gap-1'>
            <Text>{toFriendlyDate(cleaning.dateTimeStart)}</Text>
            <Text>
              {cleaning.cleanerId !== null
                ? `Assigned to ${cleaner?.firstName} ${cleaner?.lastName}`
                : 'Unassigned'}
            </Text>
          </View>
        </View>

        {/* Right Side (Image) */}
        <Avatar style={styles.mediumCardWithAvatarRight}>
          <AvatarFallbackText>Example Profile Picture</AvatarFallbackText>
          {cleaning.cleanerId !== null ? (
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
    </Pressable>
  );
}

// endregion CleaningCard

// region Manager Actions

function ManagerActions({ navigation }: any) {
  return (
    <>
      <Button
        className='rounded-full w-40'
        size='lg'
        onPress={() => navigation.navigate('ManageTeamScreen')}
      >
        <ButtonIcon as={UsersRound} />
        <ButtonText>My Team</ButtonText>
      </Button>
      <Button
        className='rounded-full w-40'
        size='lg'
        onPress={() => navigation.navigate('NewCleaningScreen')}
      >
        <ButtonIcon as={Plus} />
        <ButtonText>New Cleaning</ButtonText>
      </Button>
    </>
  );
}

// endregion Manager Actions

// region Cleaner Actions

// function CleanerActions({ navigation }: any) {
//   return (
//     <>
//       <Button
//         className='rounded-full w-40'
//         size='lg'
//         onPress={() => navigation.navigate('CleanerAvailabilityScreen')}
//       >
//         <ButtonIcon as={EditIcon} />
//         <ButtonText>My Availability</ButtonText>
//       </Button>
//     </>
//   );
// }

// endregion Cleaner Actions

// region Manager Info

type ManagerInfoProps = {
  upcoming: number;
  issues: number;
  unassigned: number;
};

function ManagerInfo({ upcoming, issues, unassigned }: ManagerInfoProps) {
  return (
    <>
      <Card className='flex-1 gap-1 rounded-3xl'>
        <Text style={styles.summaryNumber}>{upcoming}</Text>
        <Text>Upcoming</Text>
      </Card>
      <Card className='flex-1 gap-1 rounded-3xl'>
        <Text style={styles.summaryNumber}>{issues}</Text>
        <Text>Issues</Text>
      </Card>
      <Card className='flex-1 gap-1 rounded-3xl'>
        <Text style={styles.summaryNumber}>{unassigned}</Text>
        <Text>Unassigned</Text>
      </Card>
    </>
  );
}

// endregion Manager Info

// region Cleaner Info

type CleaningInfoProps = {
  upcoming: number;
  completed: number;
};

function CleanerInfo({ upcoming, completed }: CleaningInfoProps) {
  return (
    <>
      <Card className='flex-1 gap-1 rounded-3xl'>
        <Text style={styles.summaryNumber}>{upcoming}</Text>
        <Text>Assigned</Text>
      </Card>
      <Card className='flex-1 gap-1 rounded-3xl'>
        <Text style={styles.summaryNumber}>{completed}</Text>
        <Text>Completed</Text>
      </Card>
    </>
  );
}

// endregion Cleaner Info

export default function HomeScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const {
    data: cleanings,
    isLoading,
    isError,
    error,
    refetch,
  } = useUpcomingCleanings();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // cleanings info
  const upcoming = cleanings?.length ?? 0;
  const issues = 1; // hardcoded value
  const unassigned =
    cleanings?.filter((cleaning) => cleaning.cleanerId == null).length ?? 0;
  const completed =
    cleanings?.filter((cleaning) => cleaning.isComplete).length ?? 0;

  if (isLoading) {
    return <Text>Loading cleanings...</Text>;
  }

  if (isError) {
    console.error(error);
    return <Text>Could not load cleanings.</Text>;
  }

  const { today: cleaningsToday, upcoming: cleaningsUpcoming } =
    groupCleaningsByDate(cleanings);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {/* Buttons */}
      {user?.role == Role.MANAGER && (
        <View style={styles.hStack}>
          <ManagerActions navigation={navigation} />
        </View>
      )}

      {/*{user?.role == Role.CLEANER && (*/}
      {/*  <CleanerActions navigation={navigation} />*/}
      {/*)}*/}

      {/* Info */}
      <ScrollView horizontal contentContainerStyle={styles.hStack}>
        {user?.role == Role.MANAGER && (
          <ManagerInfo
            upcoming={upcoming}
            issues={issues}
            unassigned={unassigned}
          />
        )}
        {user?.role == Role.CLEANER && (
          <CleanerInfo upcoming={upcoming} completed={completed} />
        )}
      </ScrollView>

      {/* Today's Cleanings */}
      <View style={styles.vStack}>
        <Text style={styles.sectionTitle}>Today</Text>
        {cleaningsToday.map((cleaning) => (
          <CleaningCard
            key={cleaning.id}
            cleaning={cleaning}
            navigation={navigation}
          />
        ))}

        {cleaningsToday.length === 0 && <Text>No cleanings today!</Text>}
      </View>

      {/* Upcoming Cleanings */}
      <View style={styles.vStack}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        {cleaningsUpcoming.map((cleaning) => (
          <CleaningCard
            key={cleaning.id}
            cleaning={cleaning}
            navigation={navigation}
          />
        ))}

        {cleaningsUpcoming.length === 0 && <Text>No upcoming cleanings.</Text>}
      </View>
    </ScrollView>
  );
}
