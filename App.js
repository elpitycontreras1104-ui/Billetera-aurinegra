import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert, FlatList, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [saldo, setSaldo] = useState(90000000);
  const [modal, setModal] = useState(null);
  const [monto, setMonto] = useState('');
  const [destino, setDestino] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [historial, setHistorial] = useState([{ id: '1', tipo: 'Ingreso', desc: 'Carga inicial', monto: 90000000, fecha: 'Hoy' }]);

  const formatear = (n) => '$ ' + n.toLocaleString('es-AR');
  const CONTACTOS = [{ nombre: 'Kiosco Aurinegro', alias: 'kiosco.aurinegro.mp' },{ nombre: 'Mamá', alias: 'mama.mp' }];

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return; setScanned(true); setModal(null);
    Alert.alert("QR Detectado", `Pagar a: ${data}`, [
      { text: "Cancelar", onPress: () => setScanned(false) },
      { text: "PAGAR $5.000", onPress: () => { setSaldo(s=>s-5000); setHistorial([{ id: Date.now().toString(), tipo: 'QR', desc: data, monto: -5000, fecha: 'Ahora' },...historial]); setScanned(false); }}
    ]);
  };
  const abrirQR = async () => {
    if (!permission?.granted) { const res = await requestPermission(); if (!res.granted) return Alert.alert("Permiso cámara denegado"); }
    setScanned(false); setModal('qr');
  };
  const transferir = () => {
    const val = parseInt(monto); if (!val ||!destino) return Alert.alert("Completá datos"); if (val > saldo) return Alert.alert("Sin saldo");
    setSaldo(saldo - val); setHistorial([{ id: Date.now().toString(), tipo: 'Transferencia', desc: `A ${destino}`, monto: -val, fecha: 'Ahora' },...historial]);
    setModal(null); setMonto(''); setDestino(''); Alert.alert("¡Transferido!", `Enviaste ${formatear(val)} a ${destino}`);
  };
  const ingresar = () => { const val = parseInt(monto); if (!val) return; setSaldo(saldo+val); setHistorial([{ id: Date.now().toString(), tipo: 'Ingreso', desc: 'Carga', monto: val, fecha: 'Ahora' },...historial]); setModal(null); setMonto(''); };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.logoPrincipal} />
      <Text style={styles.aurinegroTop}>BILLETERA DIGITAL AURINEGRA</Text>

      <View style={styles.card}>
        <Text style={styles.saldoLabel}>Saldo disponible</Text>
        <Text style={styles.saldo}>{formatear(saldo)}</Text>
        <Text style={styles.rend}>Rinde 68% anual • + $45.320 hoy</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridBtn} onPress={() => setModal('ingresar')}><Text style={styles.gridIcon}>💵</Text><Text style={styles.gridTxt}>Ingresar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.gridBtn} onPress={() => setModal('transferir')}><Text style={styles.gridIcon}>↗️</Text><Text style={styles.gridTxt}>Transferir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.gridBtn} onPress={abrirQR}><Text style={styles.gridIcon}>📷</Text><Text style={styles.gridTxt}>Pagar QR</Text></TouchableOpacity>
        <TouchableOpacity style={styles.gridBtn} onPress={() => setModal('cobrar')}><Text style={styles.gridIcon}>💳</Text><Text style={styles.gridTxt}>Cobrar</Text></TouchableOpacity>
      </View>

      <Text style={styles.histTitle}>Movimientos</Text>
      <FlatList data={historial.slice(0,4)} style={{width:'100%'}} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.histItem}><View style={[styles.histIcon,{backgroundColor:item.monto>0?'#00FF88':'#333'}]}><Text>{item.tipo[0]}</Text></View>
        <View style={{flex:1}}><Text style={styles.histDesc}>{item.desc}</Text><Text style={styles.histFecha}>{item.tipo}</Text></View>
        <Text style={[styles.histMonto,{color:item.monto>0?'#00FF88':'#FFF'}]}>{item.monto>0?'+':''}{formatear(item.monto)}</Text></View>
      )}/>

      <Modal visible={modal==='transferir'} transparent animationType="slide"><View style={styles.modalFondo}><View style={styles.modalBox}>
        <Text style={styles.modalTitle}>Transferir</Text>
        <View style={styles.contactRow}>{CONTACTOS.map(c=>(<TouchableOpacity key={c.alias} style={styles.contactChip} onPress={()=>setDestino(c.alias)}><Text style={styles.contactName}>{c.nombre}</Text></TouchableOpacity>))}</View>
        <TextInput style={styles.input} placeholder="Alias / CBU" value={destino} onChangeText={setDestino} placeholderTextColor="#888"/>
        <TextInput style={styles.input} placeholder="Monto" keyboardType="numeric" value={monto} onChangeText={setMonto} placeholderTextColor="#888"/>
        <TouchableOpacity style={styles.modalBtn} onPress={transferir}><Text style={styles.modalBtnTxt}>TRANSFERIR</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setModal(null)}><Text style={styles.cancel}>Cerrar</Text></TouchableOpacity>
      </View></View></Modal>

      <Modal visible={modal==='qr'} animationType="slide"><View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing="back" barcodeScannerSettings={{barcodeTypes:["qr"]}} onBarcodeScanned={handleBarCodeScanned}><View style={styles.qrOverlay}><Text style={styles.qrText}>Pagar QR</Text><View style={styles.qrFrame}/></View></CameraView>
        <TouchableOpacity style={styles.closeCam} onPress={()=>setModal(null)}><Text style={styles.closeTxt}>✕ Cerrar</Text></TouchableOpacity>
      </View></Modal>

      <Modal visible={modal==='ingresar'} transparent animationType="slide"><View style={styles.modalFondo}><View style={styles.modalBox}>
        <Text style={styles.modalTitle}>Ingresar</Text><TextInput style={styles.input} placeholder="Monto" keyboardType="numeric" value={monto} onChangeText={setMonto} placeholderTextColor="#888"/>
        <TouchableOpacity style={styles.modalBtn} onPress={ingresar}><Text style={styles.modalBtnTxt}>INGRESAR</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setModal(null)}><Text style={styles.cancel}>Cerrar</Text></TouchableOpacity>
      </View></View></Modal>

      <Modal visible={modal==='cobrar'} transparent animationType="slide"><View style={styles.modalFondo}><View style={styles.modalBox}>
        <Text style={styles.modalTitle}>Cobrar</Text><View style={styles.qrFake}><Image source={require('./logo.png')} style={{width:80,height:80,borderRadius:40,marginBottom:10}}/><Text style={{fontWeight:'bold'}}>madryn.cs.dm/pity</Text></View>
        <TouchableOpacity style={styles.modalBtn} onPress={()=>{setModal(null); Alert.alert("Copiado");}}><Text style={styles.modalBtnTxt}>COPIAR ALIAS</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setModal(null)}><Text style={styles.cancel}>Cerrar</Text></TouchableOpacity>
      </View></View></Modal>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20, paddingTop: 40, alignItems: 'center' },
  logoPrincipal: { width: 130, height: 130, borderRadius: 65, marginBottom: 10 },
  aurinegroTop: { color: '#FFD700', fontWeight: 'bold', letterSpacing: 1, marginBottom: 15, fontSize: 12 },
  card: { backgroundColor: '#1A1A1A', width: '100%', borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 2, borderColor: '#FFD700', marginBottom: 15 },
  saldoLabel: { color: '#AAA', fontSize: 13 }, saldo: { color: '#FFD700', fontSize: 34, fontWeight: 'bold', marginTop: 5 }, rend: { color: '#00FF88', fontSize: 12, marginTop: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  gridBtn: { backgroundColor: '#1A1A1A', width: '48%', borderRadius: 15, padding: 14, alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  gridIcon: { fontSize: 20 }, gridTxt: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  histTitle: { color: '#FFF', fontWeight: 'bold', marginTop: 10, marginBottom: 8, width: '100%' },
  histItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', padding: 10, borderRadius: 12, marginBottom: 6 },
  histIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  histDesc: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }, histFecha: { color: '#888', fontSize: 10 }, histMonto: { fontWeight: 'bold', fontSize: 12 },
  contactRow: { flexDirection: 'row', gap: 8, marginBottom: 10 }, contactChip: { backgroundColor: '#0D0D0D', borderWidth: 1, borderColor: '#FFD700', borderRadius: 10, padding: 8 }, contactName: { color: '#FFF', fontSize: 11 },
  modalFondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#1A1A1A', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, borderWidth: 2, borderColor: '#FFD700', borderBottomWidth: 0 },
  modalTitle: { color: '#FFD700', fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { backgroundColor: '#0D0D0D', color: '#FFF', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#333', marginBottom: 10 },
  modalBtn: { backgroundColor: '#FFD700', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 }, modalBtnTxt: { color: '#000', fontWeight: 'bold' }, cancel: { color: '#AAA', textAlign: 'center', marginTop: 12 },
  cameraContainer: { flex: 1 }, camera: { flex: 1 }, qrOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  qrText: { color: '#FFD700', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }, qrFrame: { width: 250, height: 250, borderWidth: 4, borderColor: '#FFD700', borderRadius: 20 },
  closeCam: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: '#FFD700', padding: 15, borderRadius: 30, paddingHorizontal: 30 }, closeTxt: { color: '#000', fontWeight: 'bold' },
  qrFake: { backgroundColor: '#FFF', height: 160, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
});
