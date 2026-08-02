import { ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useNextCleaningByProperty } from '@/hooks/useCleanings';
import { styles } from '@/styles/styles';
import { Save } from 'lucide-react-native';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';
import { usePropertyById } from '@/hooks/useProperties';
import { useChecklistItems } from '@/hooks/useChecklistItems';
import { ChecklistEditingSection } from '@/components/ChecklistEditingSection';
import {
  createEditableProperty,
  EditableProperty,
  PropertyEditingSection,
} from '@/components/PropertyEditingSection';
import {
  ReportedIssue,
  ReportedIssuesSection,
} from '@/components/ReportedIssuesSection';

const reportedIssues: ReportedIssue[] = [
  { id: 1, description: 'One of the dining chairs has a loose leg' },
  { id: 2, description: 'Garbage area needs to be cleaned' },
  { id: 3, description: 'Need more replacement towels' },
];

export default function PropertyDetailsScreen({ route }: any) {
  const { propertyId } = route.params;
  const [propertyForm, setPropertyForm] = useState<EditableProperty>(() =>
    createEditableProperty(),
  );
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

  useEffect(() => {
    if (!property) return;

    setPropertyForm(createEditableProperty(property));
  }, [property]);

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
          <ButtonIcon as={Save} />
          <ButtonText>Save</ButtonText>
        </Button>
      </View>

      {/* Content */}
      <View style={styles.modalMain}>
        {/* Property Details */}
        <PropertyEditingSection
          property={propertyForm}
          onPropertyChange={setPropertyForm}
        />

        {/* Checklist Items */}
        <ChecklistEditingSection
          items={checklistItems}
          onItemsChange={() => console.log('Items changed.')}
        />

        {/* Issues */}
        <ReportedIssuesSection issues={reportedIssues} />
      </View>
    </ScrollView>
  );
}
