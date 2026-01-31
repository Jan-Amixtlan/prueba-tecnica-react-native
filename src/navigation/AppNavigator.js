import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Importa desde ./ (mismo nivel) o ../ (subir un nivel)
import CompanySelection from "../screens/CompanySelection";  // ← ../
import Login from "../screens/Login";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          else if (route.name === "Settings") iconName = focused ? "settings" : "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Inicio" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Perfil" }} />
      <Tab.Screen name="Settings" component={Settings} options={{ title: "Configuración" }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="CompanySelection">
      <Stack.Screen name="CompanySelection" component={CompanySelection} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ title: "Iniciar Sesión" }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}