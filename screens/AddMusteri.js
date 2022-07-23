import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";

const AddMusteri = (props) => {
  const countries = ["Evet", "Hayır"];
  const [userData, setUserData] = useState();
  //console.log("add user", props);
  useEffect(() => {
    setUserData({ ...userData, seller_id: props.route.params.params.id });
  }, []);

  useEffect(() => {
    // console.log("userDAta", userData);
  }, [userData]);
  const sendData = () => {
    axios
      .post("http://hediyemola.com/defter/v1/addUser.php", {
        ...userData,
      })
      .then((res) => {
        console.log("res data", res.data);
      });
  };
  return (
    <KeyboardAwareScrollView>
      <View style={style.inputGroup}>
        <Text>Ad Soyad</Text>
        <TextInput
          onChangeText={(e) => setUserData({ ...userData, newName: e })}
        />
      </View>
      <View style={style.inputGroup}>
        <Text>İş yeri ünvanı</Text>
        <TextInput
          onChangeText={(e) => {
            setUserData({ ...userData, unvan: e });
          }}
        />
      </View>
      <View style={style.inputGroup}>
        <Text>Telefon</Text>
        <TextInput
          onChangeText={(e) => {
            setUserData({ ...userData, telefon: e });
          }}
        />
      </View>
      <View style={style.inputGroup}>
        <Text>Vergi Numarası veya Tc</Text>
        <TextInput
          onChangeText={(e) => {
            setUserData({ ...userData, tax: e });
          }}
        />
      </View>
      <View style={style.inputGroup}>
        <Text>Vergi Dairesi</Text>
        <TextInput
          onChangeText={(e) => {
            setUserData({ ...userData, taxAdminis: e });
          }}
        />
      </View>
      <View style={style.inputGroup}>
        <Text>Adres</Text>
        <TextInput
          onChangeText={(e) => {
            setUserData({ ...userData, adress: e });
          }}
        />
      </View>
      <View style={style.inputGroup}>
        <Text>Şifre</Text>
        <TextInput
          onChangeText={(e) => {
            setUserData({ ...userData, password: e });
          }}
        />
      </View>
      <View style={style.inputGroup}>
        <Text>Şifre Tekrar</Text>
        <TextInput
          onChangeText={(e) => {
            setUserData({ ...userData, passwordRe: e });
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
          defaultButtonText="Hayır"
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
      </View>
    </KeyboardAwareScrollView>
  );
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
export default AddMusteri;
