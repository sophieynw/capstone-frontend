import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import LoginPage from './screens/LoginPage';
import MainPage from './screens/MainPage';

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
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
