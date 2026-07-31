import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AuthContext } from '@/auth/AuthContext';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import { toTitleCase } from '@/utils/helpers';
import { styles } from '@/styles/styles';
import { LogOut, UserPen } from 'lucide-react-native';

export default function ManagerProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { data: cleanings } = useUpcomingCleanings();

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

      <Card className='rounded-3xl gap-3'>
        <Heading size='lg'>Manager Summary</Heading>
        <View className='gap-2'>
          <Text>Upcoming Cleanings: {cleanings?.length ?? 0}</Text>
          <Text>Properties: Coming soon</Text>
          <Text>Team Members: Coming soon</Text>
        </View>
      </Card>

      <View style={styles.hStack}>
        <Button size='lg' variant='outline' className='rounded-full'>
          <ButtonIcon as={UserPen} />
          <ButtonText>Edit Profile</ButtonText>
        </Button>

        <Button size='lg' className='rounded-full' onPress={logout}>
          <ButtonIcon as={LogOut} />
          <ButtonText>Log Out</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}
