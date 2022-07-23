import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import React, { useState, useEffect } from "react";
import CustomerListItem from "../component/CustomerListItem";
import axios from "axios";
const SaticiHome = (props) => {
  const [allUsersData, setAllUsersData] = useState();
  const [data, setData] = useState();
  const [searchWords, setSearchWords] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let url;
    url = "http://hediyemola.com/defter/userList.php";
    axios
      .post(url, {
        key: "allUser",
        user_id: props.route.params.id,
        group_id: props.route.params.group_id,
      })
      .then((res) => {
        console.log("res", res.data);
        setAllUsersData(res.data);
        setData(res.data);
      });
  }, []);
  const onRefreshing = () => {
    let url;
    url = "http://hediyemola.com/defter/userList.php";
    axios
      .post(url, {
        key: "allUser",
        user_id: props.route.params.id,
        group_id: props.route.params.group_id,
      })
      .then((res) => {
        console.log("res", res.data);
        setAllUsersData(res.data);
        setData(res.data);
        setRefreshing(false);
      });
  };

  const renderData = ({ item }) => {
    return (
      <CustomerListItem
        unvan={item.unvan}
        id={item.buyyer_id}
        name={item.name}
        seller_id={props.route.params.id}
      />
    );
  };

  const searchFiler = (text) => {
    const newData = allUsersData.filter((item) => {
      const listItem = item.name.toLowerCase() + item.unvan.toLowerCase();
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    setData(newData);
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <TextInput
        onChangeText={(text) => {
          setSearchWords(text);
          searchFiler(text);
        }}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
          marginBottom: 15,
        }}
        placeholder="Ara..."
      />
      <FlatList
        data={data}
        renderItem={renderData}
        keyExtractor={(item) => item.buyyer_id}
        refreshing={refreshing}
        onRefresh={onRefreshing}
      />
    </SafeAreaView>
  );
};

export default SaticiHome;
