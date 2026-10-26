import { Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { styles } from '@/styles/styles';
import { Issue } from '@/api/issuesApi';
import { EmptyState } from '@/components/EmptyState';
import { toFriendlyDate, toTitleCase } from '@/utils/helpers';

type ReportedIssuesSectionProps = {
  issues: Issue[];
};

// "missing-supplies" -> "Missing Supplies"
function formatIssueType(issueType: string) {
  return toTitleCase(issueType.replace(/-/g, ' '));
}

export function ReportedIssuesSection({ issues }: ReportedIssuesSectionProps) {
  return (
    <Card style={styles.mediumCard}>
      <Heading size='md'>Issues</Heading>

      {issues.length === 0 && (
        <EmptyState title='No issues reported' inline />
      )}

      {issues.map((issue) => (
        <View key={issue.id} className='gap-0.5'>
          <Text className='font-semibold'>
            {formatIssueType(issue.issueType)}
          </Text>
          <Text>{issue.description}</Text>
          <Text className='text-sm'>
            Reported by {issue.reportedByName}
            {issue.cleaningStart
              ? ` · cleaning on ${toFriendlyDate(issue.cleaningStart)}`
              : ''}
          </Text>
        </View>
      ))}
    </Card>
  );
}