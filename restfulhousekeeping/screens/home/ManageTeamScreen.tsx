// screens/home/ManageTeamScreen.tsx
import { Text } from '@/components/ui/text';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import {
  Icon,
  MailIcon,
  MessageCircleIcon,
  TrashIcon,
} from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';

type CleanerCardProps = {
  name: string;
  phoneNumber: string;
};

function CleanerCard({ name, phoneNumber }: CleanerCardProps) {
  return (
    <Card style={styles.card}>
      <View className='flex-row items-center justify-between'>
        {/* Left (Image) */}
        <Avatar className='w-10 h-10'>
          <AvatarFallbackText>Example Profile Picture</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            }}
          />
        </Avatar>

        {/* Middle (Text) */}
        <View className='flex-1 ml-3 gap-0'>
          <Heading size='md'>{name}</Heading>
          <Text>{phoneNumber}</Text>
        </View>

        {/* Right */}
        <View className='flex-row gap-3'>
          <Icon as={MessageCircleIcon} />
          <Icon as={TrashIcon} />
        </View>
      </View>
    </Card>
  );
}

export default function ManageTeamScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {/* Header */}
      <View style={styles.hContainer}>
        {/*<Text style={styles.title}>My Cleaning Team</Text>*/}
        <Heading size='2xl'>My Cleaning Team</Heading>
        <Button>
          <ButtonIcon as={MailIcon} />
          <ButtonText>Invite</ButtonText>
        </Button>
      </View>

      {/* Cleaner Cards */}
      <View className='flex-col p-3 gap-3'>
        <CleanerCard name='Katie McEwan' phoneNumber='647-222-3344' />
        <CleanerCard name='Robert Fleming' phoneNumber='416-555-0184' />
        <CleanerCard name='Maya Patel' phoneNumber='905-555-7821' />
        <CleanerCard name='Daniel Brooks' phoneNumber='289-555-4190' />
        <CleanerCard name='Aisha Thompson' phoneNumber='647-555-2639' />
        <CleanerCard name='Liam Chen' phoneNumber='416-555-9072' />
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
    gap: 24,
  },

  vContainer: {
    flex: 1,
    gap: 12,
    // borderWidth: 1,
    // borderColor: 'gray',
  },

  hContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    gap: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  card: {
    gap: 6,
  },
});
