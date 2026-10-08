import { useContext } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { AuthContext } from '@/auth/AuthContext';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { useUpcomingCleanings,  useCompletedCleanings,} from '@/hooks/useCleanings';
import { toTitleCase } from '@/utils/helpers';
import { styles } from '@/styles/styles';
import { LogOut, UserPen } from 'lucide-react-native';
import { Role } from '@/types/entityTypes';
import { usePropertyAll } from '@/hooks/useProperties';
import { useCleaners } from '@/hooks/useUsers';
import { useAvailabilities } from '@/hooks/useAvailabilities';
// region Manager Summary Card

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useContext(AuthContext);
  const { data: cleanings } = useUpcomingCleanings();
  const { data: completedCleanings } = useCompletedCleanings();
  const { data: properties } = usePropertyAll();
  const { data: cleaners } = useCleaners();
  const { data: availabilities } = useAvailabilities(
  user?.role === Role.CLEANER ? user.id : undefined,
);


  const handleLogout = async () => {
    try {
      await logout();

      Alert.alert(
        'Logout successful',
        'You have been logged out successfully.',
      );
    } catch (error) {
      console.error('Logout error', error);
      Alert.alert('Logout failed', 'Something went wrong while logging out.');
    }
  };

  function formatTime(time: string) {
    const [hourString, minute] = time.split(':');
    const hour = Number(hourString);

    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minute} ${period}`;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <Card className='rounded-3xl gap-3'>
        <Heading size='lg'>
          {user?.firstName} {user?.lastName}
        </Heading>

        <View className='gap-2'>
          <Text>Account Type: {toTitleCase(user?.role ?? '')}</Text>
          <Text>Username: {user?.username}</Text>
          <Text>Email: {user?.email}</Text>
          <Text>Phone: {user?.phoneNumber}</Text>
          <Text>
            Organization: {user?.organization?.name ?? 'No organization'}
          </Text>
        </View>
      </Card>

      {user?.role == Role.MANAGER && (
        <Card className='rounded-3xl gap-3'>
          <Heading size='lg'>Account Summary</Heading>
          <View className='gap-2'>
            <Text>Upcoming Cleanings: {cleanings?.length ?? 0}</Text>
            <Text>Properties: {properties?.length ?? 0}</Text>
            <Text>Team Members: {cleaners?.length ?? 0}</Text>
          </View>
        </Card>
      )}

      {user?.role == Role.CLEANER && (
        <Card className='w-full gap-3 rounded-3xl'>
          <Heading size='lg'>Cleaner Summary</Heading>
          <View className='gap-2'>
            <Text>Assigned Cleanings: {cleanings?.length ?? 0}</Text>
            <Text>
              Completed Cleanings: {completedCleanings?.length ?? 0}
            </Text>
            <Text>Availability:</Text>

            {availabilities?.map((availability) => (
              <Text key={availability.id}>
                {toTitleCase(availability.dayOfWeek)}:{' '}
                {formatTime(availability.startTime)} -{' '}
                {formatTime(availability.endTime)}
              </Text>
          ))}
          </View>
        </Card>
      )}

      <View style={styles.hStack}>
        <Button
          size='lg'
          variant='outline'
          className='rounded-full'
          onPress={() => navigation.navigate("ProfileEditScreen")}
        >
          <ButtonIcon as={UserPen} />
          <ButtonText>Edit Profile</ButtonText>
        </Button>

        <Button size='lg' className='rounded-full' onPress={handleLogout}>
          <ButtonIcon as={LogOut} />
          <ButtonText>Log Out</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}
