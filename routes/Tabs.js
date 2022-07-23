import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddMusteri from "../screens/AddMusteri";
import SaticiHome from "../screens/SaticiHome";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  // console.log(props);
  return (
    <Tab.Navigator
      value={props.route.params.params}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "SaticiHome") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "Musteri Ekle") {
            iconName = focused ? "add-circle" : "add-circle";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="SaticiHome"
        component={SaticiHome}
        options={{ title: "Müşteriler" }}
      />
      <Tab.Screen
        name="Musteri Ekle"
        initialParams={{ params: props.route.params.params }}
        component={AddMusteri}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
