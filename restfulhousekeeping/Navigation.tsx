import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '@/auth/AuthContext';
import LoginPage from './screens/LoginPage';
import MainPage from './screens/MainPage';
import CleaningDetailsScreen from '@/screens/CleaningDetailsScreen';
import ManageTeamScreen from '@/screens/manager/ManageTeamScreen';
import NewCleaningScreen from '@/screens/manager/NewCleaningScreen';
import PropertyDetailsScreen from '@/screens/manager/PropertyDetailsScreen';
import ManageChecklistScreen from './screens/ManageChecklistScreen';
import NewPropertyScreen from '@/screens/manager/NewPropertyScreen';

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
          name='CleaningDetailsScreen'
          component={CleaningDetailsScreen}
          options={{ presentation: 'modal' }}
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
          name='PropertyDetailsScreen'
          component={PropertyDetailsScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name='ManageChecklistScreen'
          component={ManageChecklistScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name='NewPropertyScreen'
          component={NewPropertyScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
