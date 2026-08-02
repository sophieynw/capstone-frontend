import { View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

type NotesSectionProps = {
  notes: string;
  setNotes: (notes: string) => void;
};

export function NotesSection({ notes, setNotes }: NotesSectionProps) {
  return (
    <View className='flex-col justify-center gap-2'>
      <Heading size='md'>Notes</Heading>
      <View className='py-2'>
        <Textarea className='w-full rounded-3xl px-2'>
          <TextareaInput
            placeholder='Add a note here...'
            value={notes}
            onChangeText={setNotes}
          />
        </Textarea>
      </View>
    </View>
  );
}
