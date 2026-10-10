import { useContext, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LogOut, UserPen } from 'lucide-react-native';

import { AuthContext } from '@/auth/AuthContext';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import {
  useProfilePicture,
  useUploadProfilePicture,
} from '@/hooks/useUsers';
import { styles } from '@/styles/styles';
import { Role } from '@/types/entityTypes';
import { toTitleCase } from '@/utils/helpers';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useContext(AuthContext);
  const { data: cleanings } = useUpcomingCleanings();
  // load profile picture from the backend
  const { data: profilePicture } = useProfilePicture(user?.id);
  const uploadMutation = useUploadProfilePicture();

  // show initials instead if the image doesn't load
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const showImage = !!profilePicture && profilePicture !== failedImage;

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logout successful', 'You have been logged out successfully.');
    } catch (error) {
      console.error('Logout error', error);
      Alert.alert('Logout failed', 'Something went wrong while logging out.');
    }
  };

  // pick an image and upload it
  const handlePickProfilePicture = async () => {
    if (!user) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    uploadMutation.mutate({
      userId: user.id,
      image: {
        uri: asset.uri,
        mimeType: asset.mimeType,
        fileName: asset.fileName,
      },
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <Card className='rounded-3xl gap-3'>
        {/* profile picture, tap to change */}
        <Pressable
          onPress={handlePickProfilePicture}
          disabled={uploadMutation.isPending}
          accessibilityRole='button'
          accessibilityLabel='Change profile picture'
          style={{ alignSelf: 'center', alignItems: 'center', gap: 4 }}
        >
          <Avatar style={{ width: 80, height: 80 }}>
            <AvatarFallbackText className='text-2xl'>
              {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
            </AvatarFallbackText>
            {showImage && (
              <AvatarImage
                source={{ uri: profilePicture }}
                onError={() => setFailedImage(profilePicture)}
              />
            )}
          </Avatar>
          <Text style={{ fontSize: 12, color: '#888' }}>
            {uploadMutation.isPending ? 'Uploading...' : 'Tap to change'}
          </Text>
        </Pressable>

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

      {user?.role === Role.MANAGER && (
        <Card className='rounded-3xl gap-3'>
          <Heading size='lg'>Account Summary</Heading>
          <View className='gap-2'>
            <Text>Upcoming Cleanings: {cleanings?.length ?? 0}</Text>
            <Text>Properties: Coming soon</Text>
            <Text>Team Members: Coming soon</Text>
          </View>
        </Card>
      )}

      {user?.role === Role.CLEANER && (
        <Card className='w-full gap-3 rounded-3xl'>
          <Heading size='lg'>Cleaner Summary</Heading>
          <View className='gap-2'>
            <Text>Assigned Cleanings: {cleanings?.length ?? 0}</Text>
            <Text>Completed Cleanings: Coming soon</Text>
            <Text>Availability: Coming soon</Text>
          </View>
        </Card>
      )}

      <View style={styles.hStack}>
        <Button
          size='lg'
          variant='outline'
          className='rounded-full'
          onPress={() => navigation.navigate('ProfileEditScreen')}
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
