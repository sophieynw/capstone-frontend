// screens/MainPage.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PropertyListScreen from './PropertyListScreen';
import CleaningAvailabilityScreen from './cleaner/CleaningAvailabilityScreen';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import ManagerProfileScreen from './manager/ManagerProfileScreen';
import { Role } from '@/types/entityTypes';
import CleanerProfileScreen from './cleaner/CleanerProfileScreen';
import { Icon } from '@/components/ui/icon';
import { ListTodo, User, Home } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function MainPage() {
  const user = useContext(AuthContext);

  const role = user.user?.role;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Dashboard'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={ListTodo} color={color} width={size} height={size} />
          ),
        }}
      />
      {role === Role.MANAGER && (
        <>
          <Tab.Screen
            name='Properties'
            component={PropertyListScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon as={Home} color={color} width={size} height={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Profile'
            component={ManagerProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon as={User} color={color} width={size} height={size} />
              ),
            }}
          />
        </>
      )}
      {/*<Tab.Screen name='Profile / Availability' component={AccountScreen} />*/}
      {role === Role.CLEANER && (
        <>
          <Tab.Screen name='Cleaner Profile' component={CleanerProfileScreen} />

          <Tab.Screen
            name='Cleaning Availability Screen'
            component={CleaningAvailabilityScreen}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
