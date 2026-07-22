// MainPage.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MoreScreen from './MoreScreen';
import AccountScreen from './AccountScreen';
import ManagePropertyChecklistScreen from './ManagePropertyChecklistScreen';
import CleaningAvailabilityScreen from './CleaningAvailabilityScreen';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import ManagerProfileScreen from './ManagerProfileScreen';
import PropertyDetailsScreen from './PropertyDetailsScreen';

const Tab = createBottomTabNavigator();

export default function MainPage() {
  const user = useContext(AuthContext);

  const role = user.user?.role;

  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      
      {role === "MANAGER" && (
        <>
        <Tab.Screen name='Manager Profile' component={ManagerProfileScreen} />
        <Tab.Screen name='Property Details' component={PropertyDetailsScreen} />
        <Tab.Screen name='Properties / Cleanings' component={MoreScreen} />
        </>
      )}
      <Tab.Screen name='Profile / Availability' component={AccountScreen} />
      <Tab.Screen name='Manage Property Checklist' component={ManagePropertyChecklistScreen} />
      {role === 'CLEANER' && (
        <Tab.Screen name='Cleaning Availability Screen' component={CleaningAvailabilityScreen} />
      )}
    </Tab.Navigator>
  );
}

