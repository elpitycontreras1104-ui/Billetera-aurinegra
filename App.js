import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
export default function App(){
 const [saldo,setSaldo]=useState(12500);
 const [monto,setMonto]=useState('');
 return(
  <View style={{flex:1, backgroundColor:'#f5f5f5'}}>
   <View style={{backgroundColor:'#000', paddingTop:50, paddingBottom:20, alignItems:'center'}}>
    <Text style={{color:'#FFD600', fontWeight:'900', fontSize:22}}>C.S.D. MADRYN</Text>
    <Text style={{color:'#fff'}}>BILLETERA AURINEGRA</Text>
   </View>
   <View style={{backgroundColor:'#FFD600', margin:15, borderRadius:16, padding:20}}>
    <Text>SALDO DISPONIBLE</Text>
    <Text style={{fontSize:36, fontWeight:'900'}}>$ {saldo}</Text>
    <Text style={{fontSize:11, fontWeight:'700'}}>SOCIO: EL PITY #1104 - ACTIVO</Text>
   </View>
   <View style={{backgroundColor:'#fff', margin:15, borderRadius:16, padding:15}}>
    <TextInput placeholder="$ Monto a cargar" value={monto} onChangeText={setMonto} style={{borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:14}} keyboardType="numeric"/>
    <TouchableOpacity onPress={()=>{const n=parseFloat(monto); if(n>0){setSaldo(saldo+n); setMonto(''); Alert.alert('¡Carga OK Aurinegro!')}}} style={{backgroundColor:'#000', padding:16, borderRadius:10, marginTop:10, alignItems:'center'}}>
     <Text style={{color:'#FFD600', fontWeight:'900'}}>CARGAR BILLETERA</Text>
    </TouchableOpacity>
   </View>
  </View>
 );
}
