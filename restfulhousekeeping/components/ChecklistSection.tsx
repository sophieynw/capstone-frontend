import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react-native';
import { useChecklistItems } from '@/hooks/useChecklistItems';
import { ChecklistItem } from '@/types/entityTypes';

type ChecklistItemInputProps = {
  item: ChecklistItem;
  onDelete: () => void;
  onChangeDescription: (description: string) => void;
};

function ChecklistItemInput({
  item,
  onDelete,
  onChangeDescription,
}: ChecklistItemInputProps) {
  const isPreloadedItem = item.id > 0;

  return (
    <Input className='rounded-full'>
      <InputField
        value={item.description}
        editable={!isPreloadedItem}
        onChangeText={onChangeDescription}
        placeholder='Checklist item'
      />

      <InputSlot className='pl-3'>
        <Pressable onPress={onDelete} className='ml-3'>
          <InputIcon as={Trash} />
        </Pressable>
      </InputSlot>
    </Input>
  );
}

type ChecklistSectionProps = {
  propertyId?: number;
  onItemsChange: (items: ChecklistItem[]) => void;
};

export function ChecklistSection({
  propertyId,
  onItemsChange,
}: ChecklistSectionProps) {
  const [editableItems, setEditableItems] = useState<ChecklistItem[]>([]);
  const [newItemDescription, setNewItemDescription] = useState<string>('');
  const {
    data: checklistItems,
    isLoading,
    isError,
    error,
  } = useChecklistItems(propertyId);

  // normalizes date to ignore time
  function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // filters for checklist items that are due only
  function filterDueChecklistItems(items: ChecklistItem[]): ChecklistItem[] {
    const today = startOfDay(new Date());

    return items.filter((item) => {
      if (!item.lastCompleted) {
        return true;
      }

      const lastCompleted = startOfDay(new Date(item.lastCompleted));
      const nextDueDate = new Date(lastCompleted);
      nextDueDate.setDate(nextDueDate.getDate() + (item.frequencyDays ?? 0));
      // Include items due today or overdue.
      return nextDueDate <= today;
    });
  }

  useEffect(() => {
    if (checklistItems) {
      setEditableItems(filterDueChecklistItems(checklistItems));
    }
  }, [checklistItems]);

  useEffect(() => {
    onItemsChange(editableItems);
  }, [editableItems, onItemsChange]);

  function addItem() {
    const description = newItemDescription.trim();

    if (!description) return;

    const newItem: ChecklistItem = {
      // Temporary client-side ID.
      id: -Date.now(),
      description,
      frequencyDays: 1,
      lastCompleted: null,
    };

    setEditableItems((currentItems) => [...currentItems, newItem]);
    setNewItemDescription('');
  }

  function deleteItem(id: number) {
    setEditableItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  function updateItemDescription(id: number, description: string) {
    setEditableItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, description } : item,
      ),
    );
  }

  if (!propertyId) {
    return (
      <View className='gap-2'>
        <Heading size='md'>Checklist</Heading>
        <Text>Select a property to load its checklist.</Text>
      </View>
    );
  }

  if (isLoading) {
    return <Text>Loading checklist...</Text>;
  }

  if (isError) {
    console.error('Checklist error:', error);
    return <Text>Could not load checklist.</Text>;
  }

  return (
    <View className='flex-col justify-center gap-2'>
      <Heading size='md'>Checklist</Heading>

      <View className='py-2 gap-3'>
        {editableItems.map((item) => (
          <ChecklistItemInput
            key={item.id}
            item={item}
            onDelete={() => deleteItem(item.id)}
            onChangeDescription={(description) =>
              updateItemDescription(item.id, description)
            }
          />
        ))}

        <Input className='w-full rounded-full'>
          <InputField
            value={newItemDescription}
            onChangeText={setNewItemDescription}
            onSubmitEditing={addItem}
            placeholder='Add checklist item'
            returnKeyType='done'
          />

          <InputSlot>
            <Pressable onPress={addItem} className='ml-3'>
              <InputIcon as={Plus} />
            </Pressable>
          </InputSlot>
        </Input>
      </View>
    </View>
  );
}
