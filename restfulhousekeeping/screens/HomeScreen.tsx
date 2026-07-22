import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { toTitleCase } from '@/utils/helpers';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';

type CleaningCardProps = {
  readonly location: string;
  readonly date: string;
  readonly cleaner?: string;
};

function CleaningCard({ location, date, cleaner }: CleaningCardProps) {
  return (
    <Card style={styles.card}>
      <View className='flex-row items-center justify-between'>
        {/* Left Side (Text) */}
        <View className='gap-2'>
          <Heading size='md'>{location}</Heading>
          <View className='gap-1'>
            <Text>{date}</Text>
            <Text>Assigned to {cleaner}</Text>
          </View>
        </View>
        {/* Right Side (Image) */}
        <Avatar className='w-20 h-20'>
          <AvatarFallbackText>Jane Doe is test</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            }}
          />
        </Avatar>
      </View>
    </Card>
  );
}

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {/* Header */}
      <View style={styles.vContainer}>
        <Text style={styles.title}>
          {toTitleCase(user?.role ?? '')} Dashboard
        </Text>
        <Text>Welcome back {user?.firstName}!</Text>
      </View>

      {/* Buttons */}
      <View style={styles.vContainer}>
        <Button>
          <ButtonText>Manage Properties</ButtonText>
        </Button>
        <Button>
          <ButtonText>Manage Team</ButtonText>
        </Button>
        <Button>
          <ButtonText>Create Cleaning</ButtonText>
        </Button>
      </View>

      {/* Info */}
      {/* Made them buttons for now in case we want them to open something */}
      <ScrollView horizontal contentContainerStyle={styles.hContainer}>
        <Button disabled>
          <ButtonText># Upcoming</ButtonText>
        </Button>
        <Button disabled>
          <ButtonText># Issues</ButtonText>
        </Button>
        <Button disabled>
          <ButtonText># Unassigned</ButtonText>
        </Button>
      </ScrollView>

      {/* Cleaning Cards */}
      <View style={styles.vContainer}>
        <Text style={styles.sectionTitle}>Upcoming Cleanings</Text>
        <CleaningCard
          date='Jul 22 2026 2:30pm'
          location='UNION AVE. CONDO'
          cleaner='Katie M.'
        />
        <CleaningCard
          date='Jul 23 2026 1:30pm'
          location='MAIN ST. CONDO'
          cleaner='Katie M.'
        />
        <CleaningCard
          date='Jul 24 2026 2:00pm'
          location='APPLE DR. HOUSE'
          cleaner='Katie M.'
        />
        <CleaningCard
          date='Jul 25 2026 2:45pm'
          location='UNION AVE. CONDO'
          cleaner='Katie M.'
        />
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
