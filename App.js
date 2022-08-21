import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import SaticiLogin from "./component/SaticiLogin";
import MusteriLogin from "./component/MusteriLogin";
import SaticiHome from "./screens/SaticiHome";
import MusteriHome from "./screens/MusteriHome";
import Siparisler from "./screens/Siparisler";
import SiparisDetay from "./screens/SiparisDetay";
import NewSiparis from "./screens/NewSiparis";
import UpdateUser from "./component/UpdateUser";
import Tabs from "./routes/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SaticiLogin" component={SaticiLogin} />
          <Stack.Screen name="MusteriLogin" component={MusteriLogin} />
          <Stack.Screen name="SaticiHome" component={SaticiHome} />
          <Stack.Screen name="MusteriHome" component={MusteriHome}   options={{ headerShown: false }}/>
          <Stack.Screen name="Siparişler" component={Siparisler} />
          <Stack.Screen name="Siparis Detay" component={SiparisDetay} />
          <Stack.Screen name="Yeni Sipariş" component={NewSiparis} />
          <Stack.Screen name="Kullanıcı Güncelle" component={UpdateUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
