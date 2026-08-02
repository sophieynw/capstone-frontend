// screens/home/ManageTeamScreen.tsx
import { Text } from '@/components/ui/text';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import {
  Icon,
  MailIcon,
  MessageCircleIcon,
  PhoneIcon,
  TrashIcon,
} from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { styles } from '@/styles/styles';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';

type CleanerCardProps = {
  name: string;
  phoneNumber: string;
};

function CleanerCard({ name, phoneNumber }: CleanerCardProps) {
  return (
    <Card className='w-full gap-1.5 rounded-4xl'>
      <View className='flex-row items-center'>
        {/* Left (Image) */}
        <Avatar className='h-10 w-10'>
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60',
            }}
          />
        </Avatar>
        {/* Middle (Text) */}
        <View className='ml-3 flex-1 gap-0'>
          <Heading size='md'>{name}</Heading>
          <View className='flex-row items-center gap-2'>
            <Icon as={PhoneIcon} size='sm' />
            <Text
              className='underline'
              onPress={() =>
                Linking.openURL(`tel:${phoneNumber.replace(/\D/g, '')}`)
              }
            >
              {phoneNumber}
            </Text>
          </View>
        </View>
        {/* Right (Icons) */}
        <View className='flex-row gap-3'>
          <Pressable onPress={showComingSoonAlert}>
            <Icon as={MessageCircleIcon} />
          </Pressable>
          <Pressable onPress={showComingSoonAlert}>
            <Icon as={TrashIcon} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

export default function ManageTeamScreen() {
  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      {/* Header */}
      <View style={styles.modalHeader}>
        <Heading size='2xl'>My Cleaning Team</Heading>
        <Button
          className='rounded-full'
          size='lg'
          onPress={showComingSoonAlert}
        >
          <ButtonIcon as={MailIcon} />
          <ButtonText>Invite</ButtonText>
        </Button>
      </View>

      {/* Content / Cleaner Cards */}
      <View style={styles.modalMain}>
        <CleanerCard name='Katie McEwan' phoneNumber='226-224-0336' />
        <CleanerCard name='Robert Fleming' phoneNumber='905-608-3833' />
        <CleanerCard name='Maya Patel' phoneNumber='905-555-7821' />
        <CleanerCard name='Daniel Brooks' phoneNumber='289-555-4190' />
        <CleanerCard name='Aisha Thompson' phoneNumber='647-555-2639' />
        <CleanerCard name='Liam Chen' phoneNumber='416-555-9072' />
      </View>
    </ScrollView>
  );
}
