// screens/home/ManageTeamScreen.tsx
import { Text } from '@/components/ui/text';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import {
  CheckIcon,
  Icon,
  PhoneIcon,
} from '@/components/ui/icon';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { styles } from '@/styles/styles';
import { useGetAllAvailableCleaners,useUpdateUser } from '@/hooks/useUsers';

import { User } from '@/types/entityTypes';
import { AuthContext } from '@/auth/AuthContext';
import { useContext } from 'react';
import { sendEmail } from '@/api/emailApi';
import { useSendEmail } from '@/hooks/useSendEmail';

type CleanerCardProps = {
  cleaner: User;
};

function CleanerCard({ cleaner }: CleanerCardProps) {
  const manager = useContext(AuthContext);
  const sendEmailMutation = useSendEmail();
  const { mutate: updateUser } = useUpdateUser();
  const fullName = `${cleaner.firstName} ${cleaner.lastName}`;

  const handleInvite = () => {
    const organization = manager.user?.organization;

    if (!organization) {
      console.error('Manager does not have an organization');
      return;
    }

    // updateUser({
    //   userId: cleaner.id,
    //   user: { organization: organization },
    // });

    sendEmailMutation.mutate(
      {
        to: cleaner.email,
        subject: 'RESTFul Housekeeping: Invite',
        text: `You have been invited to work for ${manager.user?.firstName} ${manager.user?.lastName} at ${organization.name}!\nPlease check the app to accept the invite. Actually, don't. Because that part hasn't been implemented yet. Too bad!`
      }
    )
  };

  return (
    <Card className='w-full gap-1.5 rounded-4xl'>
      <View className='flex-row items-center'>
        {/* Left (Image) */}
        <Avatar className='h-10 w-10'>
          <AvatarFallbackText>{fullName}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60',
            }}
          />
        </Avatar>

        {/* Middle (Text) */}
        <View className='ml-3 flex-1 gap-0'>
          <Heading size='md'>{fullName}</Heading>

          <View className='flex-row items-center gap-2'>
            <Icon as={PhoneIcon} size='sm' />

            <Text
              className='underline'
              onPress={() =>
                Linking.openURL(`tel:${cleaner.phoneNumber.replace(/\D/g, '')}`)
              }
            >
              {cleaner.phoneNumber}
            </Text>
          </View>
        </View>

        {/* Right (Icons) */}
        <View className='flex-row gap-3'>
          <Pressable onPress={handleInvite}>
            <Icon as={CheckIcon} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

export default function InviteCleanerScreen() {
  const { data: cleaners = [], isPending, isError, error } = useGetAllAvailableCleaners();

  if (isPending) {
    return <Text>Loading cleaners...</Text>;
  }

  if (isError) {
    console.error('Cleaners error:', error);
    return <Text>Something went wrong while fetching cleaners.</Text>;
  }

  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      {/* Header */}
      <View style={styles.modalHeader}>
        <Heading size='2xl'>Invite Cleaners</Heading>
      </View>

      {/* Content / Cleaner Cards */}
      <View style={styles.modalMain}>
        {cleaners.length > 0 ? (
          cleaners.map((cleaner) => (
            <CleanerCard key={cleaner.id} cleaner={cleaner} />
          ))
        ) : (
          <Text className='text-center text-gray-500'>No cleaners found.</Text>
        )}
      </View>
    </ScrollView>
  );
}
