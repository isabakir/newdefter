import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

const EmptyRow = (props) => {
  const [ordersState, setOrdersState] = useState({
    index: props.index,
    ad: "",
    olcu: "",
    adet: "",
    birimFiyat: "",
    total: "",
  });
  //console.log(props);

  const addOrderItem = () => {
    // console.log("emptyrow addOrderItem");
    // console.log("ordersState", ordersState);
    // console.log("props", props);

    setOrdersState({
      ...ordersState,
      total: (
        parseFloat(ordersState.adet) * parseFloat(ordersState.birimFiyat)
      ).toString(),
    });

    console.log("ordersState", ordersState);
    props.addOrder(ordersState, props.index);
  };

  // console.log(props);
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderTopWidth: 1,
      }}
    >
      <TextInput
        style={styles.row}
        onChangeText={(e) => {
          let obj = ordersState;
          obj.ad = e;
          setOrdersState(obj);
          addOrderItem();
        }}
      />
      <TextInput
        style={styles.row}
        onChangeText={(e) => {
          let obj = ordersState;
          obj.olcu = e;
          setOrdersState(obj);

          addOrderItem();
        }}
      />
      <TextInput
        style={styles.row}
        keyboardType="numeric"
        value={ordersState.adet.toString()}
        onChangeText={(e) => {
          let obj = ordersState;
          obj.adet = e;
          setOrdersState(obj);

          addOrderItem();
        }}
      />
      <TextInput
        style={styles.row}
        keyboardType="numeric"
        value={ordersState.birimFiyat.toString()}
        onChangeText={(e) => {
          let obj = ordersState;
          obj.birimFiyat = e;
          setOrdersState(obj);

          addOrderItem();
        }}
      />
      <TextInput
        style={styles.row}
        editable={false}
        value={
          ordersState.birimFiyat && ordersState.adet
            ? (
                parseFloat(ordersState.adet) *
                parseFloat(ordersState.birimFiyat)
              ).toString()
            : "0"
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    width: "20%",
    textAlign: "center",
    borderRightWidth: 1,
  },
});
export default EmptyRow;
