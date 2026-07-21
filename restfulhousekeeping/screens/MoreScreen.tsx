import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function MoreScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Properties / Cleanings</Text>

      <Card className="w-full max-w-96">
        <Text style={styles.propertyName}>Union Condo</Text>
        <Text>123 Union St, Oakville</Text>
        <Text>Next Cleaning: Today, 2:00 PM</Text>

        <Button className="mt-4" onPress={() => navigation.navigate('PropertyDetails')}>
          <ButtonText>View Details</ButtonText>
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  propertyName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
});