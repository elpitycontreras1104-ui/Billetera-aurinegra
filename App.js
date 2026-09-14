import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';

export default function App() {
  const [saldo] = useState(8999000);
  const [alias, setAlias] = useState('csdm.madryn.mp');
  const [nuevoAlias, setNuevoAlias] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const guardarAlias = () => {
    if(nuevoAlias.trim().length > 3){
      setAlias(nuevoAlias.trim().toLowerCase());
      setModalVisible(false);
      setNuevoAlias('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BILLETERA CSDM</Text>
        <Text style={styles.sub}>Club Social y Deportivo Madryn</Text>
      </View>

      <View style={styles.cardSaldo}>
        <Text style={styles.label}>SALDO DISPONIBLE</Text>
        <Text style={styles.saldo}>$ {saldo.toLocaleString('es-AR')}</Text>
      </View>

      {/* ALIAS EDITABLE */}
      <View style={styles.cardAlias}>
        <View style={{flex:1}}>
          <Text style={styles.label}>TU ALIAS</Text>
          <Text style={styles.aliasText}>{alias}</Text>
        </View>
        <TouchableOpacity style={styles.btnEditar} onPress={()=>setModalVisible(true)}>
          <Text style={styles.btnEditarText}>CAMBIAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnTransferir}>
        <Text style={styles.btnTransferirText}>TRANSFERIR AHORA</Text>
      </TouchableOpacity>

      <View style={styles.historial}>
        <Text style={styles.historialTitle}>Movimientos</Text>
        <Text style={styles.mov}>→ Kiosco Aurinegro - $ 1.500</Text>
        <Text style={styles.mov}>→ Entrada Platea - $ 3.000</Text>
      </View>

      {/* MODAL PARA ELEGIR ALIAS */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalCaja}>
            <Text style={styles.modalTitle}>Elegí tu alias</Text>
            <Text style={styles.modalSub}>Escribí el que quieras, ej: pity.aurinegro.mp</Text>
            <TextInput
              value={nuevoAlias}
              onChangeText={setNuevoAlias}
              placeholder="pity.madryn.mp"
              placeholderTextColor="#999"
              style={styles.input}
              autoCapitalize="none"
            />
            <View style={{flexDirection:'row', gap:10}}>
              <TouchableOpacity style={[styles.btnModal, {backgroundColor:'#333'}]} onPress={()=>setModalVisible(false)}>
                <Text style={styles.btnModalText}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnModal, {backgroundColor:'#FFD700'}]} onPress={guardarAlias}>
                <Text style={[styles.btnModalText, {color:'#000'}]}>GUARDAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#000', padding:20, paddingTop:50},
  header:{alignItems:'center', marginBottom:20},
  title:{color:'#FFD700', fontSize:28, fontWeight:'bold'},
  sub:{color:'#fff', fontSize:12},
  cardSaldo:{backgroundColor:'#FFD700', padding:20, borderRadius:15, alignItems:'center', marginBottom:15},
  label:{color:'#666', fontSize:11, fontWeight:'bold'},
  saldo:{color:'#000', fontSize:32, fontWeight:'bold'},
  cardAlias:{backgroundColor:'#1a1a1a', padding:15, borderRadius:12, flexDirection:'row', alignItems:'center', marginBottom:15, borderWidth:1, borderColor:'#333'},
  aliasText:{color:'#FFD700', fontSize:18, fontWeight:'bold', marginTop:4},
  btnEditar:{backgroundColor:'#FFD700', paddingHorizontal:12, paddingVertical:8, borderRadius:8},
  btnEditarText:{color:'#000', fontWeight:'bold', fontSize:12},
  btnTransferir:{backgroundColor:'#fff', padding:18, borderRadius:12, alignItems:'center', marginBottom:20},
  btnTransferirText:{color:'#000', fontWeight:'bold', fontSize:16},
  historial:{backgroundColor:'#111', padding:15, borderRadius:12},
  historialTitle:{color:'#fff', fontWeight:'bold', marginBottom:10},
  mov:{color:'#aaa', marginBottom:5},
  modalFondo:{flex:1, backgroundColor:'rgba(0,0,0,0.8)', justifyContent:'center', padding:20},
  modalCaja:{backgroundColor:'#1a1a1a', padding:20, borderRadius:15, borderWidth:1, borderColor:'#FFD700'},
  modalTitle:{color:'#FFD700', fontSize:20, fontWeight:'bold', marginBottom:5},
  modalSub:{color:'#888', fontSize:12, marginBottom:15},
  input:{backgroundColor:'#fff', padding:15, borderRadius:10, fontSize:16, color:'#000', marginBottom:15},
  btnModal:{flex:1, padding:14, borderRadius:10, alignItems:'center'},
  btnModalText:{color:'#fff', fontWeight:'bold'}
});
