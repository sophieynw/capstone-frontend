import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePropertyAll } from '@/hooks/useProperties';
import { Property } from '@/types/entityTypes';
import { useNextCleaningByProperty } from '@/hooks/useCleanings';
import { toFriendlyDate } from '@/utils/helpers';

type PropertyCardProps = {
  readonly property: Property;
  navigation: any;
};

export default function PropertyListScreen({ navigation }: any) {
  const { data: properties } = usePropertyAll();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {/*<Text style={styles.title}>Properties</Text>*/}

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

function PropertyCard({property, navigation} : PropertyCardProps) {
  // @ts-ignore
  const { data: cleaning } = useNextCleaningByProperty(property?.id);
  return (
    <Card className='w-full max-w-96'>
      <Text style={styles.propertyName}>{property?.name}</Text>
      <Text>
        {property?.street} {property?.name}, {property?.city}
      </Text>
      <Text>
        Next Cleaning:{' '}
        {cleaning?.dateTimeStart
          ? toFriendlyDate(cleaning.dateTimeStart)
          : 'None scheduled'}
      </Text>

      <Button
        className='mt-4'
        onPress={() => {
          navigation.navigate('PropertyDetails', {
            cleaning: cleaning,
            propertyId: cleaning?.propertyId,
            cleanerId: cleaning?.cleanerId,
          });
        }}
      >
      <ButtonText>View Details</ButtonText>
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenContent: {
    padding: 24,
    gap: 20,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  propertyName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
});
