import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  screenContent: {
    padding: 24,
    gap: 20,
  },

  vContainer: {
    flex: 1,
    gap: 12,
  },

  hContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
});
