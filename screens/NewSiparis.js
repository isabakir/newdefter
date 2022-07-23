import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import EmptyRow from "../component/EmptyRow";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const NewSiparis = (props) => {
  const [orderList, setOrderList] = useState([]);
  const [allOrderTotal, setAllOrderTotal] = useState();
  const [data, setData] = useState();
  const [note, setNote] = useState();
  const [tahsilat, setTahsilat] = useState();
  const [iskonto, setIskonto] = useState(0);
  const navigation = useNavigation();

  const calcTotal = () => {
    let tot = 0;
    // console.log("orders", orderList);
    if (orderList.length) {
      orderList.forEach((element) => {
        if (
          parseFloat(element.birimFiyat) > 0 &&
          parseFloat(element.adet) > 0
        ) {
          tot += parseFloat(element.birimFiyat) * parseFloat(element.adet);
        }
      });
    }

    // console.log("total", tot);
    setAllOrderTotal(tot);
  };

  const addOrder = (a, i) => {
    //console.log("addorder çalıştıııı");
    console.log("gelen a", a);
    let arrs = orderList;
    arrs[i] = a;
    console.log("arrs i.=", arrs[i]);

    setOrderList(arrs);
    console.log("orderlist", orderList);
    calcTotal();

    //  console.log("arrs", arrs);
  };
  const sendData = () => {
    console.log("testt");
    axios
      .post("http://hediyemola.com/defter/v1/addOrder.php", {
        key: "addOrder",
        seller_id: props.route.params.user_id,
        buyyer_id: props.route.params.buyyer_id,
        data: orderList,
        total: allOrderTotal,
        note: note,
        tahsilat: tahsilat,
        iskonto: iskonto,
      })
      .then((res) => {
        if (res.data.key == "1") {
          navigation.navigate("Siparişler", {
            user_id: props.route.params.user_id,
            buyyer_id: props.route.params.buyyer_id,
          });
        }
      });
  };

  useEffect(() => {
    calcTotal();
    setRows(rows);
  }, [rows, orderList, rowList]);
  const [rows, setRows] = useState([
    <EmptyRow key={0} index={0} addOrder={addOrder} />,
  ]);
  const rowList = rows.map((i) => {
    return i;
  });

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          borderBottomWidth: 1,
          borderTopWidth: 1,
        }}
      >
        <Text style={styles.row}>Ad</Text>
        <Text style={styles.row}>Ölçü</Text>
        <Text style={styles.row}>Adet</Text>
        <Text style={styles.row}>Birim Fiyat</Text>
        <Text style={styles.row}>Toplam Fiyat</Text>
        {rows.map((i) => {
          return i;
        })}
        <TouchableOpacity
          style={{
            width: "100%",
            textAlign: "center",
            borderBottomWidth: 1,
            backgroundColor: "black",
          }}
          onPress={() => {
            let arr = rows;
            arr.push(
              <EmptyRow
                addOrder={addOrder}
                key={arr.length}
                index={arr.length}
              />
            );

            setRows([...arr]);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
              margin: 15,
              color: "white",
            }}
          >
            Ekle
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 17 }}>
            Sipariş Toplam:{" "}
            {Number(iskonto) > 0
              ? parseFloat(allOrderTotal).toFixed(2)
              : parseFloat(allOrderTotal).toFixed(2)}{" "}
            TL
          </Text>
          {Number(iskonto) > 0 ? (
            <Text style={{ fontSize: 17 }}>
              İskonto:{" "}
              {(Number(allOrderTotal) * (Number(iskonto) / 100)).toFixed(2)} TL
            </Text>
          ) : null}

          {Number(iskonto) > 0 ? (
            <Text style={{ fontSize: 17 }}>
              İskontolu Toplam:{" "}
              {parseFloat(allOrderTotal) *
                ((100 - Number(iskonto)) / 100).toFixed(2)}{" "}
              TL
            </Text>
          ) : null}
          <Text style={{ fontSize: 17 }}>
            Eski Bakiye: {parseFloat(props.route.params.total).toFixed(2)} TL
          </Text>
          <Text style={{ fontSize: 17 }}>
            Toplam Kalan Tutar:{" "}
            {Number(iskonto) > 0
              ? (
                  parseFloat(props.route.params.total) +
                  parseFloat(allOrderTotal * ((100 - Number(iskonto)) / 100))
                ).toFixed(2)
              : (
                  parseFloat(props.route.params.total) +
                  parseFloat(allOrderTotal)
                ).toFixed(2)}{" "}
            TL
          </Text>
          {tahsilat && parseFloat(tahsilat) > 0 ? (
            <Text style={{ fontSize: 17 }}>
              Güncel Bakiye:
              {Number(iskonto) > 0
                ? (
                    parseFloat(props.route.params.total) +
                    parseFloat(allOrderTotal) *
                      ((100 - parseFloat(iskonto)) / 100) -
                    parseFloat(tahsilat)
                  ).toFixed(2)
                : (
                    parseFloat(props.route.params.total) +
                    parseFloat(allOrderTotal) -
                    parseFloat(tahsilat)
                  ).toFixed(2)}
              TL
            </Text>
          ) : null}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginTop: 15,
          }}
        >
          <Text style={{ paddingLeft: 10 }}>Tahsil Edilen Tutar:</Text>
          <TextInput
            keyboardType="numeric"
            style={{
              width: "70%",
              textAlign: "center",
            }}
            placeholder="Tahsilat Tutarı"
            onChangeText={(e) => {
              setTahsilat(e);
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginTop: 15,
          }}
        >
          <Text style={{ width: "50%", paddingLeft: 10 }}>
            İskonto(% olarak girin):
          </Text>
          <TextInput
            keyboardType="numeric"
            style={{
              width: "50%",
              textAlign: "center",
            }}
            placeholder="İskonto"
            onChangeText={(e) => {
              setIskonto(e);
            }}
          />
        </View>
        <TextInput
          style={{
            width: "100%",
            textAlign: "center",
            borderWidth: 1,
            marginTop: 15,
            marginBottom: 5,
          }}
          placeholder="Sipariş Notu..."
          onChangeText={(e) => {
            setNote(e);
          }}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            padding: 15,
            width: "80%",
            borderRadius: 15,
            marginTop: 15,
          }}
          onPress={() => sendData()}
        >
          <Text style={{ width: "100%", textAlign: "center" }}>
            Sipariş Oluştur
          </Text>
        </TouchableOpacity>
      </View>
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

export default NewSiparis;
