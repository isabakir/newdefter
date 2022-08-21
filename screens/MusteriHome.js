import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const MusteriHome = (props) => {
  console.log("id",props);
  const[mySeller,setMySeller]=useState();
  const navigation=useNavigation();

  useEffect(()=>{
axios.post("http://hediyemola.com/defter/v1/buyyer/getMySeller.php",{
  key:'allUser',
  user_id:props.route.params.id
})
.then(res=>{
    setMySeller(res.data);
  console.log("musteri",res.data);})
  },[]);
  return (
    <SafeAreaView>
      
      {mySeller?mySeller.map((item,index)=>{
        return(
          <TouchableOpacity key={index} onPress={()=>{
            navigation.navigate("Siparişler",{buyyer_id:props.route.params.id,user_id:1,type:'musteri'})
          }}>
          <View 
          style={{
            height: 50,
            borderWidth: 1,
            marginBottom: 5,
            padding: 5,
            backgroundColor: "#fafafa",
            marginTop:'7%'
          }}
          >
           
            <Text>{item.name}</Text>
            
          </View>
          </TouchableOpacity>
        )
      }):null}


    </SafeAreaView>
  )
}

export default MusteriHome