import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TopTabScreen from '../screens/TopTabScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            paddingTop: 7, 
            height: 80,
            alignItems: 'center',
            justifyContent: "center",
            backgroundColor: '#3C3C3B'
          },
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'TopTabs') iconName = 'calendar';
            else if (route.name === 'Settings') iconName = 'person';
            return <Ionicons name={iconName} size={26} color={color} />;
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Tab.Screen name="TopTabs" component={TopTabScreen} options={{ title: 'Agendamento', headerShown: false }} />
        <Tab.Screen name="Settings" component={ProfileScreen} options={{ title: 'Perfil', headerShown: false }} />
      </Tab.Navigator>
    </>
  );
}