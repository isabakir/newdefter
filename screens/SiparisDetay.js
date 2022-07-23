import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateableTableRow from "../component/UpdateableTableRow";
import Loading from "../component/Loading";

const SiparisDetay = (props) => {
  // console.log("gyryp", props.route.params);
  const [data, setData] = useState([]);
  const [note, setNote] = useState();
  const [kalan, setKalan] = useState(props.route.params.kalan);
  const [load, setLoad] = useState(false);
  const sendData = (table, tahsilat) => {
    console.log("table", table);
    axios.post("http://hediyemola.com/defter/v1/updateOrder.php", {
      data: table,
      key: "updateOrder",
      tahsilat: tahsilat,
      note: note,
      order_group_id: props.route.params.id,
    });
  };
  useEffect(() => {
    axios
      .post("http://hediyemola.com/defter/v1/getOrder.php", {
        key: "oldOrders",
        group_order_id: props.route.params.id,
      })
      .then((res) => {
        setData(res.data);
        console.log("gelendataaaaaa=", res.data);
        setNote(res.data.note);
        setLoad(true);
      });
  }, []);
  if (!load) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
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
          <UpdateableTableRow
            data={data.order}
            update={true}
            group_order_id={data.group_order_id}
            tahsilat={data.tahsilat}
            oldTotalPrice={data.total}
            kalan={kalan}
            note={note}
            iskonto={data.iskonto}
            iskontosuzTotal={data.iskontosuzTotal}
            iskontoTutari={data.iskontoTutari}
          />
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            Sipariş Notu:
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(e) => setNote(e)}
            value={note ? note : "Sipariş Notu yok."}
            style={{ borderWidth: 1, borderRadius: 15, padding: 5 }}
          />
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  row: {
    width: "20%",
    textAlign: "center",
    borderRightWidth: 1,
  },
});

export default SiparisDetay;
