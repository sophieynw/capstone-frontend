import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Circle, CircleCheck } from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { styles } from '@/styles/styles';

export type ReportedIssue = {
  id: number;
  description: string;
};

type ReportedIssuesSectionProps = {
  issues: ReportedIssue[];
};

export function ReportedIssuesSection({ issues }: ReportedIssuesSectionProps) {
  const [resolvedIssueIds, setResolvedIssueIds] = useState<Set<number>>(
    () => new Set(),
  );

  function toggleIssue(issueId: number) {
    setResolvedIssueIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(issueId)) {
        nextIds.delete(issueId);
      } else {
        nextIds.add(issueId);
      }

      return nextIds;
    });
  }

  return (
    <Card style={styles.mediumCard}>
      <Heading size='md'>Issues</Heading>

      {issues.map((issue) => {
        const isResolved = resolvedIssueIds.has(issue.id);

        return (
          <View key={issue.id} className='flex-row items-center gap-2'>
            <Pressable
              onPress={() => toggleIssue(issue.id)}
              hitSlop={8}
              accessibilityRole='checkbox'
              accessibilityState={{ checked: isResolved }}
              accessibilityLabel={`Mark ${issue.description} as ${
                isResolved ? 'unresolved' : 'resolved'
              }`}
            >
              <Icon as={isResolved ? CircleCheck : Circle} />
            </Pressable>
            <Text className='flex-1'>{issue.description}</Text>
          </View>
        );
      })}
    </Card>
  );
}
