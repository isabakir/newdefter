import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CustomerListItem = ({ unvan, name, id, seller_id }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View
      style={{
        height: 50,
        borderWidth: 1,
        marginBottom: 5,
        padding: 5,
        backgroundColor: "#fafafa",
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{
          backgroundColor: "tomato",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ display: "flex", position: "absolute", right: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ fontSize: 15 }}>x</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.navigate("Kullanıcı Güncelle", { id: id });
              }}
            >
              <Text style={styles.textStyle}>Bilgileri Güncelle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Siparişler", {
            user_id: seller_id,
            buyyer_id: id,
            name: name,
          });
        }}
        onLongPress={() => {
          changeModalVisible();
        }}
        delayLongPress={500}
      >
        <Text>
          {unvan} {id}
        </Text>
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CustomerListItem;
