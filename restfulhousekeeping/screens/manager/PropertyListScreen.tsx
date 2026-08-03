import { Pressable, ScrollView, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { usePropertyAll } from '@/hooks/useProperties';
import { Property } from '@/types/entityTypes';
import { useNextCleaningByProperty } from '@/hooks/useCleanings';
import { toFriendlyDate } from '@/utils/helpers';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';
import { Icon } from '@/components/ui/icon';
import { HousePlus, Plus } from 'lucide-react-native';

// region Property Card

type PropertyCardProps = {
  readonly property: Property;
  navigation: any;
};

function PropertyCard({ property, navigation }: PropertyCardProps) {
  const { data: cleaning } = useNextCleaningByProperty(property?.id);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('PropertyDetailsScreen', {
          propertyId: property.id,
        });
      }}
    >
      <Card style={styles.mediumCard}>
        <Heading size='md'>{property?.name}</Heading>
        <View className='gap-1'>
          <Text>
            {property?.unit ? `${property.unit}-` : ''}
            {property?.street}, {property?.city}
          </Text>
          <Text>
            Next Cleaning:{' '}
            {cleaning?.dateTimeStart
              ? toFriendlyDate(cleaning.dateTimeStart)
              : 'None scheduled'}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}

// endregion Property Card

export default function PropertyListScreen({ navigation }: any) {
  const { data: properties, isLoading, isError, error } = usePropertyAll();

  if (isLoading) {
    return <Text>Loading properties...</Text>;
  }

  if (isError) {
    console.error(error);
    return <Text>Could not load properties.</Text>;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <View style={styles.vStack}>
        {properties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            navigation={navigation}
          />
        ))}

        {/* Connect Accounts Cards */}
        <Pressable onPress={() => navigation.navigate('NewPropertyScreen')}>
          <Card style={styles.mediumCardWithAvatar}>
            <View style={styles.mediumCardWithAvatarLeft}>
              <Avatar>
                <Icon as={HousePlus} size='xl' />
              </Avatar>
            </View>
            <View className='w-full'>
              <Text>Add a property</Text>
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={showComingSoonAlert}>
          <Card style={styles.mediumCardWithAvatar}>
            <View style={styles.mediumCardWithAvatarLeft}>
              <Avatar>
                <AvatarFallbackText>Airbnb Logo</AvatarFallbackText>
                <AvatarImage source={require('@/assets/airbnb.png')} />
              </Avatar>
            </View>
            <View className='w-full'>
              <Text>Connect your Airbnb account</Text>
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={showComingSoonAlert}>
          <Card style={styles.mediumCardWithAvatar}>
            <View style={styles.mediumCardWithAvatarLeft}>
              <Avatar>
                <AvatarFallbackText>VRBO Logo</AvatarFallbackText>
                <AvatarImage source={require('@/assets/vrbo.webp')} />
              </Avatar>
            </View>
            <View className='w-full'>
              <Text>Connect your VRBO account</Text>
            </View>
          </Card>
        </Pressable>
      </View>
    </ScrollView>
  );
}
