import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const TableRow = (props) => {
  const navigation = useNavigation();

  const itemDetail = props.items;
  // console.log(itemDetail);

  return (
    <>
      {itemDetail.map((item) => {
        let kalan = 0;
        kalan =
          item.oldGenelToplam || item.allTotal
            ? parseFloat(item.oldGenelToplam) + parseFloat(item.allTotal)
            : 0;
        let s = item.date;
        let tarih = s[0] + s[1] + s[2] + s[3];
        let ay = s[5] + s[6];
        let gun = s[8] + s[9];
        if (tarih == props.year) {
          let it = item;
          kalan = isNaN(kalan) ? 0 : kalan;

          return (
            <TouchableOpacity
              key={item.id}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderTopWidth: 1,
              }}
              onPress={() => {
                navigation.navigate("Siparis Detay", {
                  id: item.order_group_id,
                  genelToplam: item.genelToplam,
                  tahsilat: item.tahsilat,
                  kalan: kalan,
                });
              }}
            >
              <Text style={styles.row}>{tarih + "-" + ay + "-" + gun} </Text>
              <Text style={styles.row}>{item.allTotal}</Text>
              <Text style={styles.row}>{kalan ? kalan.toFixed(2) : 0}</Text>
              <Text style={styles.row}>
                {parseFloat(item.tahsilat).toFixed(2)}
              </Text>
              <Text style={styles.row}>
                {kalan == 0
                  ? (Number(item.allTotal) - Number(item.tahsilat)).toFixed(2)
                  : (parseFloat(kalan) - parseFloat(item.tahsilat)).toFixed(2)}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </>
  );
};
const styles = StyleSheet.create({
  row: {
    width: "20%",
    textAlign: "center",
    borderRightWidth: 1,
  },
});

export default TableRow;
