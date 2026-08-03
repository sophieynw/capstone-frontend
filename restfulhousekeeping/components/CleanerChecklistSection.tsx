import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Circle, CircleCheck } from 'lucide-react-native';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { ChecklistItem } from '@/types/entityTypes';

type CleanerChecklistItemProps = {
  item: ChecklistItem;
};

function CleanerChecklistItem({ item }: CleanerChecklistItemProps) {
  const [isComplete, setIsComplete] = useState(item.isComplete ?? false);

  return (
    <View className='flex-row items-center gap-2'>
      <Pressable
        onPress={() => setIsComplete((currentValue) => !currentValue)}
        accessibilityRole='checkbox'
        accessibilityState={{ checked: isComplete }}
        accessibilityLabel={`Mark ${item.description} as ${
          isComplete ? 'incomplete' : 'complete'
        }`}
      >
        <Icon as={isComplete ? CircleCheck : Circle} />
      </Pressable>
      <Text>{item.description}</Text>
    </View>
  );
}

type CleanerChecklistSectionProps = {
  items: ChecklistItem[];
};

export function CleanerChecklistSection({
  items,
}: CleanerChecklistSectionProps) {
  return (
    <View className='flex-col justify-center gap-2'>
      <Heading size='md'>Checklist</Heading>

      <View className='py-2 gap-3'>
        {items.length > 0 ? (
          items.map((item) => (
            <CleanerChecklistItem key={item.id} item={item} />
          ))
        ) : (
          <Text className='text-center text-sm italic text-gray-500'>
            No items found
          </Text>
        )}
      </View>
    </View>
  );
}
