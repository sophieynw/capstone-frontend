import { useContext } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '@/auth/AuthContext';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { useUpcomingCleanings } from '@/hooks/useCleanings';
import { toFriendlyDate } from '@/utils/helpers';
import { Cleaning } from '@/types/entityTypes';
import { usePropertyById } from '@/hooks/useProperties';

type CleaningCardProps = {
    cleaning: Cleaning;
    navigation: any;
};

function CleaningCard({ cleaning, navigation }: CleaningCardProps) {
    const { data: property } = usePropertyById(cleaning.propertyId);

    return (
        <Pressable
            onPress={() =>
                navigation.navigate('PropertyDetails', {
                    cleaning: cleaning,
                    propertyId: cleaning.propertyId,
                    cleanerId: cleaning.cleanerId,
                })
            }
        >
            <Card className='w-full gap-2 rounded-3xl'>
                <Heading size='md'>{property?.name ?? 'Loading property...'}</Heading>

                <Text>{toFriendlyDate(cleaning.dateTimeStart)}</Text>

                <Text>
                    Status: {cleaning.isComplete ? 'Completed' : 'Not Started'}
                </Text>
            </Card>
        </Pressable>
    );
}

export default function CleanerHomeScreen({ navigation }: any) {

    const { user } = useContext(AuthContext);
    const { data: cleanings, isLoading, isError } = useUpcomingCleanings();


    const assignedCount = cleanings?.length ?? 0;

    const completedCount =
        cleanings?.filter((cleaning) => cleaning.isComplete).length ?? 0;

    const nextCleaning = cleanings?.[0];
    const otherCleanings = cleanings?.slice(1) ?? [];

    if (isLoading) {
        return <Text>Loading cleanings...</Text>;
    }

    if (isError) {
        return <Text>Could not load cleanings.</Text>;
    }

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.screenContent}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Cleaner Dashboard</Text>
                <Text>Welcome back {user?.firstName}!</Text>
            </View>

            <View style={styles.summaryRow}>
                <Card className='flex-1 gap-1 rounded-3xl'>
                    <Text style={styles.summaryNumber}>{assignedCount}</Text>
                    <Text>Assigned</Text>
                </Card>

                <Card className='flex-1 gap-1 rounded-3xl'>
                    <Text style={styles.summaryNumber}>{completedCount}</Text>
                    <Text>Completed</Text>
                </Card>
            </View>

            {nextCleaning && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Next Cleaning</Text>

                    <CleaningCard
                        cleaning={nextCleaning}
                        navigation={navigation}
                    />
                </View>
            )}

            {otherCleanings.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Cleanings</Text>

                    {otherCleanings.map((cleaning) => (
                        <CleaningCard
                            key={cleaning.id}
                            cleaning={cleaning}
                            navigation={navigation}
                        />
                    ))}
                </View>
            )}

            {cleanings?.length === 0 && <Text>No assigned cleanings.</Text>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    screenContent: {
        padding: 24,
        gap: 20,
    },
    header: {
        gap: 8,
    },
    section: {
        gap: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 12,
    },

    summaryNumber: {
        fontSize: 24,
        fontWeight: '700',
    },
});