import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";

const UpdateUser = (props) => {
  const countries = ["Evet", "Hayır"];
  const [userData, setUserData] = useState();
  const [alert, setAlert] = useState();
  useEffect(async () => {
    await axios
      .post("http://hediyemola.com/defter/v1/getUser.php", {
        id: props.route.params.id,
      })
      .then((res) => {
        //  console.log("günceeleme data", res.data);
        setUserData(res.data);
      });
  }, [props.route.params.id]);
  const sendData = () => {
    if (
      userData.name &&
      userData.phone &&
      userData.tax &&
      userData.taxAdminis &&
      userData.unvan
    ) {
      setAlert("");
      axios
        .post("http://hediyemola.com/defter/v1/updateUser.php", {
          ...userData,
          id: props.route.params.id,
        })
        .then((res) => {
          if (res.data == "1") {
            Alert.alert("Güncelleme Başarılı");
          }

          //console.log("response", res.data);
        });
    } else {
      setAlert("Bilgileri Kontrol edin.Eksiksiz olarak doldurunuz.");
    }
  };
  if (userData) {
    return (
      <KeyboardAwareScrollView>
        <View style={style.inputGroup}>
          <Text>Ad Soyad</Text>
          <TextInput
            value={userData.name ? userData.name : ""}
            onChangeText={(e) => setUserData({ ...userData, name: e })}
          />
        </View>
        <View style={style.inputGroup}>
          <Text>İş yeri ünvanı</Text>
          <TextInput
            value={userData.unvan}
            onChangeText={(e) => {
              setUserData({ ...userData, unvan: e });
            }}
          />
        </View>
        <View style={style.inputGroup}>
          <Text>Telefon</Text>
          <TextInput
            value={userData.phone}
            onChangeText={(e) => {
              setUserData({ ...userData, phone: e });
            }}
          />
        </View>
        <View style={style.inputGroup}>
          <Text>Vergi Numarası veya Tc</Text>
          <TextInput
            value={userData.tax}
            onChangeText={(e) => {
              setUserData({ ...userData, tax: e });
            }}
          />
        </View>
        <View style={style.inputGroup}>
          <Text>Vergi Dairesi</Text>
          <TextInput
            value={userData.taxAdminis}
            onChangeText={(e) => {
              setUserData({ ...userData, taxAdminis: e });
            }}
          />
        </View>
        <View style={style.inputGroup}>
          <Text>Adres</Text>
          <TextInput
            value={userData.adress}
            onChangeText={(e) => {
              setUserData({ ...userData, adress: e });
            }}
          />
        </View>
        <View style={style.inputGroup}>
          <Text>Şifre</Text>
          <TextInput
            onChangeText={(e) => {
              setUserData({ ...userData, pass: e });
            }}
          />
        </View>
        <View style={style.inputGroup}>
          <Text>Şifre Tekrar</Text>
          <TextInput
            onChangeText={(e) => {
              setUserData({ ...userData, pass: e });
            }}
          />
        </View>

        <View style={style.inputGroup}>
          <Text>Bayi mi?</Text>
          <SelectDropdown
            style={{ padding: 5 }}
            buttonStyle={{
              borderWidth: 1,
              borderRadius: 15,
              padding: 5,
              height: 40,
            }}
            buttonTextStyle={{ fontSize: 12 }}
            data={countries}
            onSelect={(selectedItem, index) => {
              //console.log(selectedItem, index)
              setUserData({ ...userData, bayi: selectedItem });
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultButtonText={userData.bayi ? userData.bayi : "Hayır"}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              sendData();
            }}
          >
            <Text
              style={{
                borderWidth: 1,
                padding: 8,
                marginBottom: 40,
                marginTop: 15,
                borderRadius: 15,
                textAlign: "center",
                width: "50%",
              }}
            >
              Kaydet
            </Text>
          </TouchableOpacity>
          {alert && alert != "" ? (
            <Text style={{ color: "red" }}>{alert}</Text>
          ) : (
            <Text></Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <View>
        <Text>Bilgiler Güncelleniyor</Text>
      </View>
    );
  }
};
const style = StyleSheet.create({
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 5,
    padding: 5,
    borderBottomWidth: 1,
  },
});

export default UpdateUser;
