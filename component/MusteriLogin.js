import { View,SafeAreaView,TextInput,Text,TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const MusteriLogin = () => {
    const navigation=useNavigation();
    const [loginInf,setLogin]=useState({userName:'',password:''});
    const [warning,setWarning]=useState('');

    const loginRequest=async ()=>{
  
       const data= await axios.post("http://hediyemola.com/defter/login.php",
       JSON.stringify({key:'Login',username:loginInf.userName,password:loginInf.password,type:'musteri'}));
       console.log(data);
       if(data.data.login){
           navigation.navigate("MusteriHome",{tpye:'musteri',id:data.data.seller_id,token:data.data.token});
       }else{
        setWarning("Giriş bilgilerini kontrol ediniz");
    }
    }
  
    return (
     
      
     <SafeAreaView  >
       <View style={{width:'100%',flex:1,display:'flex',flexDirection:'column',  justifyContent:'center',alignItems:'center',marginTop:'10%'}}>
         <Text style={{textAlign:'center',fontSize:24}}>Defter Müşteri Giriş</Text>
         <TextInput style={{borderWidth:1, padding:8,width:'80%',marginTop:80, height:40,marginBottom:15}} value={loginInf.userName} onChangeText={e=>setLogin({...loginInf,userName:e})} placeholder='Kullanıcı adınız'/>
         <TextInput style={{borderWidth:1, padding:8,width:'80%',height:40,marginBottom:8}} value={loginInf.password} onChangeText={e=>setLogin({...loginInf,password:e})} secureTextEntry={true} placeholder='Parola'/>
         {warning?(<Text style={{color:'red'}}>{warning}</Text>):null}
         <TouchableOpacity onPress={loginRequest} style={{width:'80%',borderWidth:1,height:40,padding:8,borderRadius:25,textAlign:'center'}}>
          <Text style={{textAlign:'center'}}> Giriş</Text>
         </TouchableOpacity>
       </View>
     </SafeAreaView>
    )
  }

export default MusteriLogin