import { Pressable, ScrollView, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { usePropertyAll } from '@/hooks/useProperties';
import { Property } from '@/types/entityTypes';
import { useNextCleaningByProperty } from '@/hooks/useCleanings';
import { toFriendlyDate } from '@/utils/helpers';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';

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
      <Card className='rounded-3xl gap-2'>
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
      {properties?.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}
