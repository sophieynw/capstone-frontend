import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 16,
    padding: 12,
    marginTop: 6,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#32cbb6',
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 16,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  link: {
    textAlign: 'center',
    marginTop: 12,
    textDecorationLine: 'underline',
  },

  logoImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 24,
  },
});
