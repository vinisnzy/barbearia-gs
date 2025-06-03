import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import PastAppointmentsScreen from "../screens/PastAppointmentsScreen";
import { useFonts } from "expo-font";

const Tab = createMaterialTopTabNavigator();

export default function Appointments() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // futuramente uma tela de loading
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#C5AB79" },
        tabBarLabelStyle: {
          color: "#3C3C3B",
          fontSize: 16,
          fontFamily: "Montserrat-Regular",
        },
        tabBarStyle: {
          height: 50,
        }
      }}
    >
      <Tab.Screen name="AGENDADOS" component={AppointmentsScreen} />
      <Tab.Screen name="ANTERIORES" component={PastAppointmentsScreen} />
    </Tab.Navigator>
  );
}
