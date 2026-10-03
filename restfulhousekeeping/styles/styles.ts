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
    gap: 10,
    padding: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  modalScreen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 18,
  },
  modalScreenContent: {
    gap: 12,
    paddingBottom: 30,
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
    padding: 20,
    gap: 16,
  },
  mediumCard: {
    // width: '100%',
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

  inputError: {
    borderColor: '#d32f2f',
  },

  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
  },

  roleRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 12,
  },

  roleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 16,
  },

  selectedRole: {
    backgroundColor: '#32cbb6',
    borderColor: '#32cbb6',
  },

  selectedRoleText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  disabledButton: {
    opacity: 0.6,
  },
});
