import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import TableRow from "../component/TableRow";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import Loading from "../component/Loading";

const Siparisler = (props) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [orderDatas, setOrderDatas] = useState([]);
  const countries = ["2021", "2022"];
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const isFocused=useIsFocused();
  useEffect(() => {
    axios
      .post("http://hediyemola.com/defter/v1/allOrder.php", {
        key: "allOrders",
        user_id: props.route.params.user_id,
        buyyer_id: props.route.params.buyyer_id,
        year: year,
      })
      .then((res) => {
        setOrderDatas(res.data);
        setLoad(true);
      });
  }, [year,isFocused]);
  if (!load) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <View>
        <Text style={{ marginLeft: 15 }}>
          {props.route.params.name} Siparisler
        </Text>
        <View style={{ marginLeft: 15 }}>
          <SelectDropdown
            style={{ padding: 5 }}
            buttonStyle={{ borderWidth: 1, borderRadius: 15, padding: 5 }}
            buttonTextStyle={{ fontSize: 12 }}
            data={countries}
            onSelect={(selectedItem, index) => {
              //console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              setYear(selectedItem);
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultButtonText="Yıl Seçiniz"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 15,
          }}
        >
          <Text style={styles.tableHeader}>Tarih </Text>
          <Text style={styles.tableHeader}>Toplam</Text>
          <Text style={styles.tableHeader}>Kalan</Text>
          <Text style={styles.tableHeader}>Tahsil Edilen</Text>
          <Text style={styles.tableHeader}>Toplam Kalan</Text>
          {orderDatas ? (
            <TableRow
              items={orderDatas}
              buyyerId={props.route.params.buyyer_id}
              sellerId={props.route.params.user_id}
              year={year}
            />
          ) : null}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 25,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              textAlign: "right",
              flex: 1,
              marginRight: 15,
              fontWeight: "bold",
            }}
          >
            Genel Toplam:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {orderDatas
                ? orderDatas.length
                  ? orderDatas[orderDatas.length - 1].genelToplam.toFixed(2)
                  : null
                : null}{" "}
              TL
            </Text>
          </Text>
        </View>
        {
              props.route.params.type && props.route.params.type=='musteri'? null :( <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    width: "80%",
                    marginTop: 15,
                    borderRadius: 15,
                    textAlign: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("Yeni Sipariş", {
                      user_id: props.route.params.user_id,
                      buyyer_id: props.route.params.buyyer_id,
                      total: orderDatas && orderDatas.length
                        ? orderDatas[orderDatas.length - 1].genelToplam.toFixed(2)
                        : 0,
                    })
                  }
                >
                 
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    Yeni Sipariş
                  </Text>
                </TouchableOpacity>
              </View>)
            }
       
      </View>
    );
  }
};

const styles = StyleSheet.create({
  tableHeader: {
    width: "20%",
    textAlign: "center",
    borderRightWidth: 1,
    fontSize: 12,
  },
});
export default Siparisler;
