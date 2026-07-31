import { ScrollView, Text } from 'react-native';
import { Card } from '@/components/ui/card';
import { styles } from '@/styles/styles';
import { Heading } from '@/components/ui/heading';
import { DaysOfTheWeek } from '@/types/entityTypes';
import { toTitleCase } from '@/utils/helpers';

export default function MoreScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      {Object.values(DaysOfTheWeek).map((day) => (
        <Card className='rounded-3xl gap-1' key={day}>
          <Heading size='md'>{`${toTitleCase(day.toString())}s`}</Heading>
          <Text>9:00 am to 10:00 pm</Text>
        </Card>
      ))}
    </ScrollView>
  );
}
