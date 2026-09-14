import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [saldo, setSaldo] = useState(9000000);
  const [monto, setMonto] = useState('');
  const [historial, setHistorial] = useState([]);

  const transferir = () => {
    const valor = parseInt(monto);
    if (!valor || valor <= 0) { Alert.alert('Monto inválido'); return; }
    if (valor > saldo) { Alert.alert('Saldo insuficiente'); return; }
    setSaldo(saldo - valor);
    setHistorial([{ id: Date.now(), desc: `Transferencia a Kiosco Aurinegro`, monto: -valor }, ...historial]);
    setMonto('');
    Alert.alert('¡Listo Pity!', `Transferiste $${valor}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>BILLETERA CSDM</Text>
      <Text style={styles.escudo}>⚫🟡 CLUB SOCIAL Y DEPORTIVO MADRYN 🟡⚫</Text>
      
      <View style={styles.cardSaldo}>
        <Text style={styles.saldoLabel}>Saldo disponible</Text>
        <Text style={styles.saldo}>${saldo.toLocaleString()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Transferir a:</Text>
        <Text style={styles.contacto}>Kiosco Aurinegro (CSDM)</Text>
        <TextInput style={styles.input} placeholder="$ Monto" keyboardType="numeric" value={monto} onChangeText={setMonto} />
        <TouchableOpacity style={styles.boton} onPress={transferir}>
          <Text style={styles.botonTexto}>TRANSFERIR AHORA</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Historial</Text>
        {historial.map(h => (
          <Text key={h.id} style={styles.historial}>{h.desc}: ${h.monto}</Text>
        ))}
        {historial.length === 0 && <Text style={styles.historial}>Sin movimientos</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20, paddingTop: 60 },
  titulo: { color: '#FFD700', fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  escudo: { color: '#fff', textAlign: 'center', marginVertical: 10 },
  cardSaldo: { backgroundColor: '#FFD700', padding: 20, borderRadius: 15, marginVertical: 15 },
  saldoLabel: { color: '#000', fontWeight: 'bold' },
  saldo: { color: '#000', fontSize: 32, fontWeight: 'bold' },
  card: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, marginVertical: 10 },
  label: { color: '#FFD700', fontWeight: 'bold', marginBottom: 10 },
  contacto: { color: '#fff', marginBottom: 10 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 },
  boton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, alignItems: 'center' },
  botonTexto: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  historial: { color: '#ccc', marginVertical: 4 }
});
