import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const UpdateableTableRow = (props) => {
  const state=useSelector(state=>state.user);
  const [data, setData] = useState();
  const [tahsilat, setTahsilat] = useState();

  const [changeState, setChangeState] = useState(false);
  const [table, setTable] = useState([]);
  const [newTable, setNewTable] = useState([]);
  const [total, setTotal] = useState(0);
  const [note, setNote] = useState(note);
  const [loading, setLoading] = useState(false);
  //console.log("tablee", props.data);
  //console.log("stateeee",state)
  //console.log("updateable",props);
  const sendData = () => {
    console.log("table",table);
    console.log("note",note);
    setLoading(true);
    axios
      .post("http://hediyemola.com/defter/v1/updateOrder.php", {
        data: table,
        key: "updateOrder",
        tahsilat: tahsilat,
        note: note,
        order_group_id: props.group_order_id,
        iskonto:props.iskonto
      })
      .then((res) => {
        setLoading(false);
         console.log("gelen data", res.data);
      });
  };
  useEffect(() => {
    console.log("props note", props);
    setNote(props.note);
  }, [props.note]);

  useEffect(() => {
    props.data ? setData(props.data) : null;
    setTahsilat(props.tahsilat);
    data ? setNewTable([data]) : setNewTable([data]);
    //console.log("newdata", newTable);

    data ? setTable(Object.values(data)) : setTable([...table]);

    props.oldTotalPrice ? setTotal(props.oldTotalPrice) : null;
  }, [props.data, data, total]);
  useEffect(() => {
    let all = 0;

    table.forEach((item) => {
      all += parseFloat(item.total);
    });
    setTotal(all);
  }, [table]);
  const totalOrder = () => {
    let all = 0;

    table.forEach((item) => {
      all += parseFloat(item.total);
    });
    setTotal(all);
  };
  if (!loading) {
    return (
      <>
        {data
          ? table.map((item, index) => {
              return (
                <View
                  key={item.id}
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
                    editable={state.userType=='musteri'?false:true}
                    onChangeText={(text) => {
                      table[index]["pro_name"] = text;

                      setTable([...table]);
                      setChangeState(true);
                    }}
                    value={table[index]["pro_name"]}
                  />
                  <TextInput style={styles.row}  editable={state.userType=='musteri'?false:true} onChangeText={(text) => {
                      table[index]["pro_size"] = text;
                      totalOrder();
                      setTable([...table]);
                    }} value={item.pro_size} />
                  <TextInput
                    style={styles.row}
                    editable={state.userType=='musteri'?false:true}
                    onChangeText={(text) => {
                      table[index]["piece"] = text;
                      totalOrder();
                      setTable([...table]);
                    }}
                    value={item.piece}
                  />
                  <TextInput
                    style={styles.row}
                    editable={state.userType=='musteri'?false:true}
                    onChangeText={(text) => {
                      table[index]["unit_price"] = text;
                      table[index]["total"] = (
                        parseFloat(text) * parseFloat(table[index]["piece"])
                      ).toString();
                      totalOrder();
                      setTable([...table]);
                    }}
                    value={item.unit_price}
                  />
                  <TextInput style={styles.row} value={item.total} />
                </View>
              );
            })
          : null}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            alignItems: "center",
            width: "100%",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{ width: "100%", display: "flex", flexDirection: "row" }}
          >
            <Text
              style={{ fontWeight: "bold", width: "80%", textAlign: "right" }}
            >
              Toplam Sipariş Tutarı:
            </Text>
            <Text
              style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}
            >
              {total ? parseFloat(total).toFixed(2) : 0} TL
            </Text>
          </View>
          {Number(props.iskontoTutari) > 0 ? (
            <View
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  width: "80%",
                  textAlign: "right",
                  color: "#880808",
                }}
              >
                İskonto Tutarı:
              </Text>
              <Text
                style={{
                  width: "20%",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#880808",
                }}
              >
                {props.iskontoTutari
                  ? parseFloat(props.iskontoTutari).toFixed(2)
                  : 0}{" "}
                TL
              </Text>
            </View>
          ) : null}
          {Number(props.iskonto) > 0 ? (
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  width: "80%",
                  textAlign: "right",
                  color: "#880808",
                }}
              >
                İskonto Oranı:
              </Text>
              <Text
                style={{
                  width: "20%",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#880808",
                }}
              >
                {props.iskonto}%
              </Text>
            </View>
          ) : null}

          <View
            style={{ width: "100%", display: "flex", flexDirection: "row" }}
          >
            <Text
              style={{ fontWeight: "bold", width: "80%", textAlign: "right" }}
            >
              Eski Bakiye:
            </Text>
            <Text
              style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}
            >
              {props.oldKalan?(parseFloat(props.oldKalan)).toFixed(2):0} TL
            </Text>
          </View>
          <View
            style={{ width: "100%", display: "flex", flexDirection: "row" }}
          >
            <Text
              style={{ fontWeight: "bold", width: "80%", textAlign: "right" }}
            >
              Genel Toplam:
            </Text>
            <Text
              style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}
            >
              {Number(total)+Number(props.oldKalan)-Number(props.iskontoTutari)}{" "}
              TL
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: "bold", width: "80%", textAlign: "right" }}
            >
              Tahsilat:
            </Text>
            <TextInput
              placeholder="Tahsil edilen"
              style={{
                fontWeight: "bold",
                borderWidth: 1,
                textAlign: "center",
                width: "20%",
              }}
              editable={state.userType=='musteri'?false:true}
              value={tahsilat ? tahsilat : "0"}
              onChangeText={(e) => {
                setTahsilat(e);
              }}
            />
          </View>

          <View
            style={{ width: "100%", display: "flex", flexDirection: "row" }}
          >
            <Text
              style={{ fontWeight: "bold", width: "80%", textAlign: "right" }}
            >
              Kalan:
            </Text>
            <Text
              style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}
            >
              {(total || tahsilat)&&props.kalan
                ? (
                    parseFloat(total)+Number(props.oldKalan) -
                    tahsilat -
                    Number(props.iskontoTutari)
                  ).toFixed(2)
                : (parseFloat(total) + Number(props.oldKalan)-parseFloat(props.iskontoTutari)-Number(tahsilat)).toFixed(2)}{" "}
              TL
            </Text>
          </View>
        </View>
        {state.userType=='musteri'?null :(
          <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 250,
              padding: 15,
              borderWidth: 1,
              margin: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => sendData()}
          >
            <Text>Onayla</Text>
          </TouchableOpacity>
        </View>
        )}
        
      </>
    );
  } else {
    return (
      <>
        <Loading />
      </>
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

export default UpdateableTableRow;
