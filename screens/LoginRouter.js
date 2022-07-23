import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const LoginRouter = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("SaticiLogin")}
        style={{
          width: "80%",
          borderWidth: 1,
          display: "flex",
          padding: 8,
          borderRadius: 25,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ textAlign: "center" }}>Satıcı Giriş</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MusteriLogin")}
        style={{
          width: "80%",
          borderWidth: 1,
          padding: 8,
          borderRadius: 25,
          textAlign: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>Müşteri Giriş</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginRouter;
