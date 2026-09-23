import { ScrollView, View } from 'react-native';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Trash } from 'lucide-react-native';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';
import {createEditableProfile, EditableProfile, ProfileEditingSection } from '@/components/ProfileEditingSection';
import { useState } from 'react';

export default function ProfileEditScreen() {
  const [profileForm, setProfileForm] = useState<EditableProfile>(() =>
    createEditableProfile(),
  )

  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      <View style={styles.modalHeader}>
        <Heading size='2xl'>Edit Profile</Heading>
        <Button
          className='rounded-full'
          size='lg'
          onPress={showComingSoonAlert}
        >
          <ButtonIcon as={Trash} />
          <ButtonText>Delete</ButtonText>
        </Button>

      </View>

      <View style={styles.modalMain}>

      <ProfileEditingSection user={profileForm} onProfileChange={setProfileForm}/>

      </View>

    </ScrollView>
  );
}
