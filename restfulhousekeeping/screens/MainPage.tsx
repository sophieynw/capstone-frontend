// screens/MainPage.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PropertyListScreen from './PropertyListScreen';
import ManageChecklistScreen from './ManageChecklistScreen';
import CleaningAvailabilityScreen from './cleaner/CleaningAvailabilityScreen';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import ManagerProfileScreen from './manager/ManagerProfileScreen';
import { Role } from '@/types/entityTypes';
import CleanerHomeScreen from './cleaner/CleanerHomeScreen';
import CleanerProfileScreen from './cleaner/CleanerProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainPage() {
  const user = useContext(AuthContext);  

  const role = user.user?.role;

  return (
    <Tab.Navigator>
      {role === Role.MANAGER && (
        <Tab.Screen name='Home' component={HomeScreen} />
      )}

      {role === Role.CLEANER && (
        <Tab.Screen name='Home' component={CleanerHomeScreen} />
      )}
      {role === Role.MANAGER && (
        <>
          <Tab.Screen name='Manager Profile' component={ManagerProfileScreen} />
          <Tab.Screen name='Properties' component={PropertyListScreen} />
        </>
      )}
      {/*<Tab.Screen name='Profile / Availability' component={AccountScreen} />*/}
      {role === Role.CLEANER && (
        <>
        <Tab.Screen
          name='Cleaner Profile'
          component={CleanerProfileScreen}
        />

        <Tab.Screen
          name='Cleaning Availability Screen'
          component={CleaningAvailabilityScreen}
        />
        </>
        
      )}
    </Tab.Navigator>
  );
}
