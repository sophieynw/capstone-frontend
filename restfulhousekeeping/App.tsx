/* Run these commands to fix any potential issues with dependencies.
git checkout -- package.json package-lock.json
rm -rf node_modules
npm ci
npx expo start -c
*/
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import { AuthProvider } from '@/auth/AuthProvider';
import Navigation from '@/Navigation';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  useEffect(() => {
    SecureStore.deleteItemAsync('token');
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode='light'>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
