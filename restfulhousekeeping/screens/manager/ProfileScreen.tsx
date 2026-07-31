import { useContext } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { AuthContext } from '@/auth/AuthContext';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import { toTitleCase } from '@/utils/helpers';
import { styles } from '@/styles/styles';
import { LogOut, UserPen } from 'lucide-react-native';
import { Role } from '@/types/entityTypes';

// region Manager Summary Card

function ManagerSummary() {}

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { data: cleanings } = useUpcomingCleanings();

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
            <Text>Properties: Coming soon</Text>
            <Text>Team Members: Coming soon</Text>
          </View>
        </Card>
      )}

      {user?.role == Role.CLEANER && (
        <Card className='w-full gap-3 rounded-3xl'>
          <Heading size='lg'>Cleaner Summary</Heading>
          <Text>Assigned Cleanings: {cleanings?.length ?? 0}</Text>
          <Text>Completed Cleanings: Coming soon</Text>
          <Text>Availability: Coming soon</Text>
        </Card>
      )}

      <View style={styles.hStack}>
        <Button size='lg' variant='outline' className='rounded-full'>
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
