import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import LoginRouter from "./LoginRouter";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Loading from "../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/UserActions";

const Home = () => {
  const state = useSelector((state) => state.user);
  console.log("state", state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();

  const readSession = async () => {
    const sessionData = await AsyncStorage.getItem("userSession");
    console.log("ses",sessionData);
    if (sessionData) {
      const sessionParse = JSON.parse(sessionData);
      console.log("sessionparse",sessionParse);
      if (sessionParse.userType == "satici") {
        dispatch(userLogin(sessionParse));
        navigation.navigate("Tabs", {
          screen: "SaticiHome",
          params: {
            tpye: sessionParse.userType,
            id: sessionParse.id,
            token: sessionParse.token,
          },
        });
      }
      if(sessionParse.userType=='musteri'){
        dispatch(userLogin(sessionParse));
        navigation.navigate("MusteriHome",{tpye:'musteri',id:sessionParse.id,token:sessionParse.token});
      }
      console.log("sessionData", JSON.parse(sessionData));
    } else {
      setLoad(true);
      console.log("false")
    }
  };
  useEffect(() => {
    console.log("home çalıştı")
   //readSession();
    setLoad(true);
   
  }, []);
  return <SafeAreaView>{!load ? <Loading /> : <LoginRouter />}</SafeAreaView>;
};

export default Home;
