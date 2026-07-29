import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import React from 'react';

export default function ManagePropertyChecklistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Property Checklist</Text>

      <Text style={styles.propertyName}>Property Name Goes Here</Text>
      <Text>Address Goes Here</Text>

      <Card className="w-full max-w-96 mt-4 gap-2">
              <View style={styles.infoGroup}>
                  <Text>Checklist Item Name Here</Text>
                  <Text>Checklist Item Frequency Here</Text>
                  <Text>Checklist Item Frequency Here</Text>
                  <View style={styles.rowContainer}>
                      <Button className="mt-4">
                          <ButtonText>Edit</ButtonText>
                      </Button>
                      <Button className="mt-4">
                          <ButtonText>Remove</ButtonText>
                      </Button>
                  </View>
              </View>
          </Card>
          <Button
              variant="secondary"
              className="w-full max-w-96 mt-4">
              <ButtonText>Add Checklist Item</ButtonText>
          </Button>
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
    marginBottom: 12,
  },

  propertyName: {
    fontSize: 18,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
 },
    
  infoGroup: {
    gap: 6,
 },
 rowContainer: {
    flexDirection: 'row', // Aligns children from left to right
    justifyContent: 'space-around', // Distributes space evenly between items
    alignItems: 'center', // Centers children vertically within the row
    padding: 10,
  },
});