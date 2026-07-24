import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '@/auth/AuthContext';
import LoginPage from './screens/LoginPage';
import MainPage from './screens/MainPage';
import PropertyDetailsScreen from '@/screens/PropertyDetailsScreen';
import ManageTeamScreen from '@/screens/home/ManageTeamScreen';
import NewCleaningScreen from '@/screens/home/NewCleaningScreen';
import CleaningDetailsScreen from '@/screens/CleaningDetailsScreen';

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
        <Stack.Screen
          name='PropertyDetails'
          component={PropertyDetailsScreen}
        />
        <Stack.Screen
          name='ManageTeamScreen'
          component={ManageTeamScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name='NewCleaningScreen'
          component={NewCleaningScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name='CleaningDetailsScreen'
          component={CleaningDetailsScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
