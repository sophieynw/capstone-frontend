/* Run these commands to fix any potential issues with dependencies.
git checkout -- package.json package-lock.json
rm -rf node_modules
npm ci
npx expo start -c
*/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import LoginPage from './screens/LoginPage';
import MainPage from './screens/MainPage';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode='light'>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name='Login' component={LoginPage} />
            <Stack.Screen name='MainPage' component={MainPage} />
            <Stack.Screen name='PropertyDetails' component={PropertyDetailsScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
