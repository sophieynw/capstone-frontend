import { StyleSheet, Text, View } from 'react-native';

export default function CleaningDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cleaning Details Screen</Text>
      <Text>Welcome to the Cleaning Details screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
