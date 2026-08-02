import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react-native';
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
  items: ChecklistItem[];
  onItemsChange: (items: ChecklistItem[]) => void;
};

export function ChecklistSection({
  items,
  onItemsChange,
}: ChecklistSectionProps) {
  const [editableItems, setEditableItems] = useState<ChecklistItem[]>([]);
  const [newItemDescription, setNewItemDescription] = useState<string>('');

  useEffect(() => {
    setEditableItems(items);
  }, [items]);

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
