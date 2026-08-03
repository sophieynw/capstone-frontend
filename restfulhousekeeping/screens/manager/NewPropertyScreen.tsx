import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { styles } from '@/styles/styles';
import { Save } from 'lucide-react-native';
import { showComingSoonAlert } from '@/components/ComingSoonAlert';
import { ChecklistEditingSection } from '@/components/ChecklistEditingSection';
import {
  createEditableProperty,
  EditableProperty,
  PropertyEditingSection,
} from '@/components/PropertyEditingSection';
import { ChecklistItem } from '@/types/entityTypes';

export default function NewPropertyScreen() {
  const [newPropertyForm, setNewPropertyForm] = useState<EditableProperty>(() =>
    createEditableProperty(),
  );
  const checklistItems: ChecklistItem[] = [];

  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      {/* Heading */}
      <View style={styles.modalHeader}>
        <Heading size='2xl'>Add Property</Heading>
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
          property={newPropertyForm}
          onPropertyChange={setNewPropertyForm}
        />

        {/* Checklist Items */}
        <ChecklistEditingSection
          items={checklistItems}
          onItemsChange={() => console.log('Items changed.')}
        />
      </View>
    </ScrollView>
  );
}
