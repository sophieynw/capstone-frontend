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
    backgroundColor: '#f5f5f5',
    padding: 18,
  },
  modalScreenContent: {
    gap: 12,
  },
  modalHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  modalMain: {
    flexDirection: 'column',
    padding: 4,
    gap: 12,
  },
  bigCard: {
    width: '100%',
    borderRadius: 32,
    padding: 24,
    gap: 16,
  },
  mediumCard: {
    width: '100%',
    borderRadius: 28,
    padding: 18,
    gap: 4,
  },
  mediumCardWithAvatar: {
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mediumCardWithAvatarLeft: {
    gap: 6,
  },
  mediumCardWithAvatarRight: {
    width: 70,
    height: 70,
  },
});
