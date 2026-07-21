// MainPage.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MoreScreen from './MoreScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

export default function MainPage() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Properties / Cleanings' component={MoreScreen} />
      <Tab.Screen name='Profile / Availability' component={AccountScreen} />
    </Tab.Navigator>
  );
}
