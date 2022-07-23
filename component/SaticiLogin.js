import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaticiLogin = () => {
  const [loginInf, setLogin] = useState({ userName: "", password: "" });
  const [warning, setWarning] = useState("");
  const navigation = useNavigation();
  const loginRequest = async () => {
    const data = await axios.post(
      "http://hediyemola.com/defter/login.php",
      JSON.stringify({
        key: "Login",
        username: loginInf.userName,
        password: loginInf.password,
        type: "satici",
      })
    );
    console.log(data.data);
    if (data.data.login) {
      await AsyncStorage.setItem(
        "userSession",
        JSON.stringify({
          name: loginInf.userName,
          token: data.data.token,
          userType: data.data.type,
          login: true,
          id: data.data.userId,
        })
      );
      navigation.navigate("Tabs", {
        screen: "SaticiHome",
        params: {
          tpye: "satici",
          id: data.data.seller_id,
          token: data.data.token,
        },
      });
    } else {
      setWarning("Giriş bilgilerini kontrol ediniz");
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 24 }}>
          Defter Satıcı Giriş
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            height: 40,
            marginTop: 80,
            padding: 8,
            width: "80%",
            marginBottom: 15,
          }}
          value={loginInf.userName}
          onChangeText={(e) => setLogin({ ...loginInf, userName: e })}
          placeholder="Kullanıcı adınız"
        />
        <TextInput
          style={{
            borderWidth: 1,
            height: 40,
            padding: 8,
            width: "80%",
            marginBottom: 8,
          }}
          value={loginInf.password}
          onChangeText={(e) => setLogin({ ...loginInf, password: e })}
          secureTextEntry={true}
          placeholder="Parola"
        />
        {warning ? <Text style={{ color: "red" }}>{warning}</Text> : null}
        <TouchableOpacity
          onPress={loginRequest}
          style={{
            width: "80%",
            borderWidth: 1,
            height: 40,
            padding: 8,
            borderRadius: 25,
            textAlign: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}> Giriş</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default SaticiLogin;
