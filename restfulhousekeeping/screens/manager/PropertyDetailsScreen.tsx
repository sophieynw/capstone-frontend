import { ScrollView, Text, View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { toFriendlyDate } from '@/utils/helpers';
import { useNextCleaningByProperty } from '@/hooks/useCleanings';
import { styles } from '@/styles/styles';
import { Circle, EditIcon } from 'lucide-react-native';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';
import { usePropertyById } from '@/hooks/useProperties';
import { Icon } from '@/components/ui/icon';
import { useChecklistItems } from '@/hooks/useChecklistItems';
import { ChecklistEditingSection } from '@/components/ChecklistEditingSection';

export default function PropertyDetailsScreen({ route }: any) {
  const { propertyId } = route.params;
  const {
    data: property,
    isPending: isPropertyPending,
    isError: isPropertyError,
    error: propertyError,
  } = usePropertyById(propertyId);
  const {
    data: cleaning,
    isPending: isCleaningPending,
    isError: isCleaningError,
    error: cleaningError,
  } = useNextCleaningByProperty(propertyId);
  const {
    data: checklistItems,
    isPending: isChecklistItemsPending,
    isError: isChecklistItemsError,
    error: checklistItemsError,
  } = useChecklistItems(propertyId);

  if (isPropertyPending || isCleaningPending || isChecklistItemsPending) {
    return <Text>Loading...</Text>;
  }

  if (isPropertyError || isCleaningError || isChecklistItemsError) {
    console.error('Property error:', propertyError);
    console.error('Cleaning error:', cleaningError);
    console.error('ChecklistItems error:', checklistItemsError);
    return <Text>Could not load properties.</Text>;
  }

  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      {/* Heading */}
      <View style={styles.modalHeader}>
        <Heading size='2xl'>Property Details</Heading>
        <Button
          className='rounded-full'
          size='lg'
          onPress={showComingSoonAlert}
        >
          <ButtonIcon as={EditIcon} />
          <ButtonText>Edit</ButtonText>
        </Button>
      </View>

      {/* Content */}
      <View style={styles.modalMain}>
        {/* Property Details */}
        <Card style={styles.mediumCard}>
          <Heading size='md'>{property?.name}</Heading>
          <View>
            <Text>
              {property?.unit ? `${property.unit}-` : ''}
              {property?.street}
            </Text>
            <Text>
              {property?.city}, {property?.province} {property?.postalCode}{' '}
              {property?.country}
            </Text>
          </View>
          <View>
            <Text>{property?.accessInstructions}</Text>
          </View>
          <View>
            <Text>
              Next Cleaning: {toFriendlyDate(cleaning?.dateTimeStart)}
            </Text>
          </View>
        </Card>

        {/* Default Checklist Items */}
        <Card style={styles.mediumCard}>
          <ChecklistEditingSection
            items={checklistItems}
            onItemsChange={() => console.log('Items changed.')}
          />
        </Card>

        {/* Issues */}
        <Card style={styles.mediumCard}>
          <Heading size='md'>Reported Issues</Heading>
          <View className='flex-row items-center gap-2'>
            <Icon as={Circle} />
            <Text>One of the dining chairs has a loose leg</Text>
          </View>
          <View className='flex-row items-center gap-2'>
            <Icon as={Circle} />
            <Text>Garbage area needs to be cleaned</Text>
          </View>
          <View className='flex-row items-center gap-2'>
            <Icon as={Circle} />
            <Text>Need more replacement towels</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
