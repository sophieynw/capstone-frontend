import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '@/auth/AuthContext';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import { toTitleCase } from '@/utils/helpers';

export default function ManagerProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { data: cleanings } = useUpcomingCleanings();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <Heading size='2xl'>Manager Profile</Heading>

      <Card className='w-full gap-3 rounded-3xl'>
        <Heading size='lg'>
          {user?.firstName} {user?.lastName}
        </Heading>

        <Text>{toTitleCase(user?.role ?? '')}</Text>
        <Text>Username: {user?.username}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Phone: {user?.phoneNumber}</Text>
        <Text>
          Organization: {user?.organization?.name ?? 'No organization'}
        </Text>
      </Card>

      <Card className='w-full gap-3 rounded-3xl'>
        <Heading size='lg'>Manager Summary</Heading>
        <Text>Upcoming Cleanings: {cleanings?.length ?? 0}</Text>
        <Text>Properties: Coming soon</Text>
        <Text>Team Members: Coming soon</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button variant='outline' className='rounded-full'>
          <ButtonText>Edit Profile</ButtonText>
        </Button>

        <Button className='rounded-full' onPress={logout}>
          <ButtonText>Log Out</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenContent: {
    padding: 24,
    gap: 16,
  },
  buttonContainer: {
    gap: 12,
  },
});