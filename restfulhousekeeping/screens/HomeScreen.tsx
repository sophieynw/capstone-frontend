import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { groupCleaningsByDate, toFriendlyDate } from '@/utils/helpers';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Cleaning,
  Invitation,
  InvitationStatus,
  Role,
} from '@/types/entityTypes';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import { useCleanerById } from '@/hooks/useUsers';
import { styles } from '@/styles/styles';
import { MessageCircle, Plus, UsersRound } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from '@/components/ui/icon';
import { findOrCreateManagerConversation } from '@/api/chatApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorState } from '@/components/ErrorState';

import {
  useCleanerInvitations,
  useAcceptInvitation,
  useDeclineInvitation,
} from '@/hooks/useInvitations';

// region Cleaning Card

type CleaningStatus = 'unassigned' | 'assigned' | 'complete';

const cleaningCardColors: Record<CleaningStatus, string> = {
  unassigned: 'border-error bg-error/25',
  assigned: 'border-neutral bg-neutral/5',
  complete: 'border-success bg-success/20',
};

function getCleaningStatus(cleaning: Cleaning): CleaningStatus {
  if (cleaning.cleanerId == null) return 'unassigned';
  return cleaning.isComplete ? 'complete' : 'assigned';
}

type CleaningCardProps = {
  readonly cleaning: Cleaning;
  readonly status: CleaningStatus;
  navigation: any;
};

function CleaningCard({ cleaning, status, navigation }: CleaningCardProps) {
  const { data: cleaner } = useCleanerById(cleaning.cleanerId);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('CleaningDetailsScreen', {
          cleaning: cleaning,
          cleanerId: cleaning.cleanerId,
        });
      }}
    >
      <Card
        className={cleaningCardColors[status]}
        style={styles.mediumCardWithAvatar}
      >
        {/* Left Side (Text) */}
        <View style={styles.mediumCardWithAvatarLeft}>
          <Heading size='md'>{cleaning.property.name}</Heading>
          <View className='gap-1'>
            <Text>{toFriendlyDate(cleaning.dateTimeStart)}</Text>
            <Text>
              {cleaning.cleanerId !== null
                ? `Assigned to ${cleaner?.firstName} ${cleaner?.lastName}`
                : 'Unassigned'}
            </Text>
          </View>
        </View>

        {/* Right Side (Image) */}
        <Avatar style={styles.mediumCardWithAvatarRight}>
          <AvatarFallbackText>Example Profile Picture</AvatarFallbackText>
          {cleaning.cleanerId !== null ? (
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60',
              }}
            />
          ) : (
            <AvatarImage source={require('../assets/unassigned.png')} />
          )}
        </Avatar>
      </Card>
    </Pressable>
  );
}

// endregion CleaningCard

// region Manager Actions

function ManagerActions({ navigation }: any) {
  return (
    <>
      <Button
        className='w-40'
        style={styles.button}
        size='lg'
        onPress={() => navigation.navigate('ManageTeamScreen')}
      >
        <ButtonIcon style={styles.buttonText} as={UsersRound} />
        <ButtonText style={styles.buttonText}>My Team</ButtonText>
      </Button>
      <Button
        className='w-40'
        style={styles.button}
        size='lg'
        onPress={() => navigation.navigate('NewCleaningScreen')}
      >
        <ButtonIcon style={styles.buttonText} as={Plus} />
        <ButtonText style={styles.buttonText}>New Cleaning</ButtonText>
      </Button>
    </>
  );
}

// endregion Manager Actions

// region Manager Info

type ManagerInfoProps = {
  upcoming: number;
  issues: number;
  unassigned: number;
};

function ManagerInfo({ upcoming, issues, unassigned }: ManagerInfoProps) {
  return (
    <>
      <Card style={styles.summaryCard} className={cleaningCardColors.assigned}>
        <View style={styles.summaryCardVisual}>
          <Heading size='2xl'>{upcoming}</Heading>
        </View>
        <Text>Upcoming</Text>
      </Card>
      <Card
        style={styles.summaryCard}
        className={cleaningCardColors.unassigned}
      >
        <View style={styles.summaryCardVisual}>
          <Heading size='2xl'>{unassigned}</Heading>
        </View>
        <Text>Unassigned</Text>
      </Card>
      <Card style={styles.summaryCard}>
        <View style={styles.summaryCardVisual}>
          <Heading size='2xl'>{issues}</Heading>
        </View>
        <Text>Issues</Text>
      </Card>
    </>
  );
}

// endregion Manager Info

// region Cleaner Info

type CleaningInfoProps = {
  upcoming: number;
  completed: number;
  isOpeningChat: boolean;
  onChatPress: () => void;
};

function CleanerInfo({
  upcoming,
  completed,
  isOpeningChat,
  onChatPress,
}: CleaningInfoProps) {
  return (
    <>
      <Card style={styles.summaryCard} className={cleaningCardColors.assigned}>
        <View style={styles.summaryCardVisual}>
          <Heading size='2xl'>{upcoming}</Heading>
        </View>
        <Text>Assigned</Text>
      </Card>

      <Card style={styles.summaryCard} className={cleaningCardColors.complete}>
        <View style={styles.summaryCardVisual}>
          <Heading size='2xl'>{completed}</Heading>
        </View>
        <Text>Completed</Text>
      </Card>

      <Card style={styles.summaryCard}>
        <Pressable
          style={styles.summaryCardAction}
          onPress={onChatPress}
          disabled={isOpeningChat}
          accessibilityRole='button'
          accessibilityLabel='Open manager chat'
        >
          <View style={styles.summaryCardVisual}>
            <Icon as={MessageCircle} size='2xl' />
          </View>
          <Text>Chat</Text>
        </Pressable>
      </Card>
    </>
  );
}

type InvitationCardProps = {
  invitation: Invitation;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
  isProcessing: boolean;
};

function InvitationCard({
  invitation,
  onAccept,
  onDecline,
  isProcessing,
}: InvitationCardProps) {
  return (
    <Card className='gap-3 rounded-2xl'>
      <Text>You've been invited to join {invitation.organizationName}.</Text>

      <View className='flex-row gap-3'>
        <Button
          className='flex-1'
          style={styles.button}
          onPress={() => onAccept(invitation.id)}
          disabled={isProcessing}
        >
          <ButtonText style={styles.buttonText}>
            {isProcessing ? 'Processing...' : 'Accept'}
          </ButtonText>
        </Button>

        <Button
          className='flex-1'
          style={styles.button}
          variant='outline'
          onPress={() => onDecline(invitation.id)}
          disabled={isProcessing}
        >
          <ButtonText style={styles.buttonText}>Decline</ButtonText>
        </Button>
      </View>
    </Card>
  );
}

// endregion Cleaner Info

export default function HomeScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [isOpeningChat, setIsOpeningChat] = useState(false);
  const {
    data: cleanings,
    isLoading,
    isError,
    error,
    refetch: refetchCleanings,
  } = useUpcomingCleanings();

  useFocusEffect(
    useCallback(() => {
      void refetchCleanings();
    }, [refetchCleanings]),
  );

  const isCleaner = user?.role === Role.CLEANER;

  const {
    data: invitations = [],
    isLoading: invitationsLoading,
    isError: invitationsError,
  } = useCleanerInvitations(isCleaner ? user?.id : undefined);

  const acceptMutation = useAcceptInvitation();
  const declineMutation = useDeclineInvitation();

  const pendingInvitations = invitations.filter(
    (invitation) => invitation.status === InvitationStatus.PENDING,
  );

  const isProcessingInvitation =
    acceptMutation.isPending || declineMutation.isPending;

  // cleanings info
  const upcoming = cleanings?.length ?? 0;
  const issues = 1; // TODO: hardcoded value
  const unassigned =
    cleanings?.filter((cleaning) => cleaning.cleanerId == null).length ?? 0;
  const completed =
    cleanings?.filter((cleaning) => cleaning.isComplete).length ?? 0;

  async function handleOpenCleanerChat() {
    setIsOpeningChat(true);

    try {
      const conversation = await findOrCreateManagerConversation();

      navigation.navigate('ChatScreen', {
        conversationId: conversation.id,
        otherUserName: conversation.otherUserName,
      });
    } catch (chatError) {
      console.error('Could not open cleaner chat:', chatError);
      Alert.alert('Chat error', 'Could not open the conversation.');
    } finally {
      setIsOpeningChat(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner label='Loading cleanings...' />;
  }

  if (isError) {
    console.error(error);
    return <ErrorState />;
  }

  const { today: cleaningsToday, upcoming: cleaningsUpcoming } =
    groupCleaningsByDate(cleanings);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {/* Buttons */}
      {user?.role == Role.MANAGER && (
        <View style={styles.hStack}>
          <ManagerActions navigation={navigation} />
        </View>
      )}

      {/* Organization Invitations */}
      {isCleaner && (
        <View className='gap-3'>
          {invitationsLoading && <Text>Checking for invitations...</Text>}

          {invitationsError && (
            <Text>Could not load organization invitations.</Text>
          )}

          {!invitationsLoading &&
            !invitationsError &&
            pendingInvitations.length > 0 && (
              <>
                <Heading size='xl'>Organization Invitations</Heading>

                {pendingInvitations.map((invitation) => (
                  <InvitationCard
                    key={invitation.id}
                    invitation={invitation}
                    onAccept={(id) => acceptMutation.mutate(id)}
                    onDecline={(id) => declineMutation.mutate(id)}
                    isProcessing={isProcessingInvitation}
                  />
                ))}
              </>
            )}
        </View>
      )}

      {/* Info */}
      <View style={styles.hStack}>
        {user?.role == Role.MANAGER && (
          <ManagerInfo
            upcoming={upcoming}
            issues={issues}
            unassigned={unassigned}
          />
        )}
        {user?.role == Role.CLEANER && (
          <CleanerInfo
            upcoming={upcoming}
            completed={completed}
            isOpeningChat={isOpeningChat}
            onChatPress={handleOpenCleanerChat}
          />
        )}
      </View>
      {/* Today's Cleanings */}
      <View style={styles.vStack}>
        <Heading size='xl'>Today</Heading>
        {cleaningsToday.map((cleaning) => (
          <CleaningCard
            key={cleaning.id}
            cleaning={cleaning}
            status={getCleaningStatus(cleaning)}
            navigation={navigation}
          />
        ))}

        {cleaningsToday.length === 0 && <Text>No cleanings today!</Text>}
      </View>
      {/* Upcoming Cleanings */}
      <View style={styles.vStack}>
        <Heading size='xl'>Upcoming</Heading>
        {cleaningsUpcoming.map((cleaning) => (
          <CleaningCard
            key={cleaning.id}
            cleaning={cleaning}
            status={getCleaningStatus(cleaning)}
            navigation={navigation}
          />
        ))}

        {cleaningsUpcoming.length === 0 && <Text>No upcoming cleanings.</Text>}
      </View>
    </ScrollView>
  );
}
