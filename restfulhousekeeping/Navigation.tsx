import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '@/auth/AuthContext';
import LoginPage from './screens/LoginPage';
import MainPage from './screens/MainPage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { token, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name='MainPage' component={MainPage} />
        ) : (
          <Stack.Screen name='LoginPage' component={LoginPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
