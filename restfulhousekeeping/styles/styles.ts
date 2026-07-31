import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenContent: {
    padding: 24,
    gap: 16,
  },
  vStack: {
    flex: 1,
    gap: 12,
  },
  hStack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    padding: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '700',
  },
  modalScreen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  modalContent: {
    flexDirection: 'column',
    padding: 4,
    gap: 12,
  },
});
