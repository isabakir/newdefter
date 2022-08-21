import { View,SafeAreaView,TextInput,Text,TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/UserActions';
import AsyncStorage from "@react-native-async-storage/async-storage";


const MusteriLogin = () => {
  const state=useSelector((state)=>state.user);
  const dispatch=useDispatch();
    const navigation=useNavigation();
    const [loginInf,setLogin]=useState({userName:'',password:''});
    const [warning,setWarning]=useState(false);
    useState(()=>{console.log("w state",warning)},[warning])
    const loginRequest=async ()=>{
     
  
       const data= await axios.post("http://hediyemola.com/defter/login.php",
      {key:'Login',username:loginInf.userName,password:loginInf.password,type:'musteri'});
       console.log("musteri data",data.data);
       if(data.data.login){
         setWarning(false);
         await AsyncStorage.setItem(
          "userSession",
          JSON.stringify({
            name: loginInf.userName,
            token: data.data.token,
            userType: data.data.type,
            login: true,
            id: data.data.userId,
          })
        );
         dispatch(userLogin({userType:'musteri',login:'true',id:data.data.userId}));
           navigation.navigate("MusteriHome",{tpye:'musteri',id:data.data.seller_id,token:data.data.token});
       }else{
        setWarning(true);
        console.log("warning",warning);
       }
    }
   
  
    return (
     
      
     <SafeAreaView  style={{flex:1}} >
       <View style={{width:'100%',flex:1,display:'flex',flexDirection:'column',  justifyContent:'center',alignItems:'center'}}>
         <Text style={{textAlign:'center',fontSize:24}}>Defter Müşteri Giriş</Text>
         <TextInput style={{borderWidth:1, padding:8,width:'80%',marginTop:15, height:40,marginBottom:15}} value={loginInf.userName} onChangeText={e=>setLogin({...loginInf,userName:e})} placeholder='Kullanıcı adınız'/>
         <TextInput style={{borderWidth:1, padding:8,width:'80%',height:40,marginBottom:8}} value={loginInf.password} onChangeText={e=>setLogin({...loginInf,password:e})} secureTextEntry={true} placeholder='Parola'/>
         {warning ? (<Text style={{color:'red',width:'80%',height:40}}>Bilgilerinizi Kontrol Edin</Text>) : null }
         
         <TouchableOpacity onPress={loginRequest} style={{width:'80%',borderWidth:1,height:40,padding:8,borderRadius:25,textAlign:'center'}}>
          <Text style={{textAlign:'center'}}> Giriş</Text>
         </TouchableOpacity>
       
       </View>
     </SafeAreaView>
    )
  }

export default MusteriLogin