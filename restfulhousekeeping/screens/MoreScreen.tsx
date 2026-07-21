import { StyleSheet, Text, View } from "react-native";

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More Screen</Text>
      <Text>Additional options and settings go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});