import { ScrollView, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { styles } from '@/styles/styles';
import { useManagerIssues } from '@/hooks/useIssues';
import { formatIssueType, toFriendlyDate } from '@/utils/helpers';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';

export default function IssuesScreen() {
  const { data: issues, isPending, isError, error } = useManagerIssues(true);

  if (isPending) {
    return <LoadingSpinner label='Loading issues...' />;
  }

  if (isError) {
    console.error('Issues error:', error);
    return <ErrorState />;
  }

  const issueList = issues ?? [];

  return (
    <ScrollView
      style={styles.modalScreen}
      contentContainerStyle={styles.modalScreenContent}
    >
      <View style={styles.modalHeader}>
        <Heading size='2xl'>Issues</Heading>
      </View>

      <View style={styles.modalMain}>
        {issueList.length === 0 && (
          <EmptyState
            title='No issues reported'
            message="When a cleaner reports a problem, it'll show up here."
          />
        )}

        {issueList.map((issue) => (
          <Card key={issue.id} style={styles.mediumCard}>
            <Heading size='md'>{formatIssueType(issue.issueType)}</Heading>
            <Text>{issue.description}</Text>

            <View className='gap-0.5'>
              {issue.propertyName && (
                <Text className='text-sm'>{issue.propertyName}</Text>
              )}
              <Text className='text-sm'>
                Reported by {issue.reportedByName} ·{' '}
                {toFriendlyDate(issue.reportedAt)}
              </Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}