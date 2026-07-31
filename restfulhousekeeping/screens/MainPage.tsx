// screens/MainPage.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PropertyListScreen from './PropertyListScreen';
import CleaningAvailabilityScreen from './cleaner/CleaningAvailabilityScreen';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import ProfileScreen from './manager/ProfileScreen';
import { Role } from '@/types/entityTypes';
import { Icon } from '@/components/ui/icon';
import { Home, ListTodo, User } from 'lucide-react-native';

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
        </>
      )}
      {/*<Tab.Screen name='Profile / Availability' component={AccountScreen} />*/}
      {role === Role.CLEANER && (
        <>
          <Tab.Screen name='Cleaner Profile' component={ProfileScreen} />

          <Tab.Screen
            name='Cleaning Availability Screen'
            component={CleaningAvailabilityScreen}
          />
        </>
      )}
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={User} color={color} width={size} height={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
