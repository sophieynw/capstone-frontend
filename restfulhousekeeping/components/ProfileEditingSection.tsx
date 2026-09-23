import { Text, View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { styles } from '@/styles/styles';
import { User } from '@/types/entityTypes';

export type EditableProfile = {
  email: string;
  phoneNumber: string;
  //organization: string
}

export function createEditableProfile(user?: User): EditableProfile {
  return {
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    //organization: user?.organization ?? '',
  };
}

type ProfileInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
};

function ProfileInput({
  label,
  value,
  onChangeText,
  multiline = false,
}: ProfileInputProps) {
  return (
    <View className='gap-1'>
      <Text>{label}</Text>
      <Input
        className={multiline ? 'h-24 items-start rounded-2xl' : 'rounded-full'}
      >
        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </Input>
    </View>
  );
}

type ProfileEditingSectionProps = {
  user: EditableProfile;
  onProfileChange: (user: EditableProfile) => void;
};

export function ProfileEditingSection({
  user,
  onProfileChange,
}: ProfileEditingSectionProps) {
  function updateProfileField(field: keyof EditableProfile, value: string) {
    onProfileChange({
      ...user,
      [field]: value,
    });
  }

  return (
    <Card style={styles.mediumCard}>
      <View className='gap-3'>
        <Heading size='md'>Profile</Heading>
        <ProfileInput
          label='Email'
          value={user.phoneNumber}
          onChangeText={(value) => updateProfileField('phoneNumber', value)}
        />
        <ProfileInput
          label='Phone Number'
          value={user.phoneNumber}
          onChangeText={(value) => updateProfileField('phoneNumber', value)}
        />
        <ProfileInput
          label='Organization'
          value={user.phoneNumber}
          onChangeText={(value) => updateProfileField('phoneNumber', value)}
        />
      </View>
    </Card>
  );
}
