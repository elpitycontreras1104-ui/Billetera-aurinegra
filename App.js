import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Image 
        source={require('./logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.subtitulo}>BILLETERA DIGITAL</Text>
      <Text style={styles.ciudad}>SOMOS LA CIUDAD • AURINEGRA</Text>

      {/* SALDO */}
      <View style={styles.card}>
        <Text style={styles.saldoLabel}>Saldo disponible</Text>
        <Text style={styles.saldo}>$ 10.000.000</Text>
        <Text style={styles.csdm}>C.S.D.M • PAGOS</Text>
      </View>

      <TouchableOpacity style={styles.boton}>
        <Text style={styles.botonTexto}>PAGAR CON QR</Text>
      </TouchableOpacity>

      <Text style={styles.aurinegro}>aurinegro</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 280,
    height: 280,
    borderRadius: 140,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
  },
  ciudad: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 5,
    marginBottom: 20,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#1A1A1A',
    width: '100%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    marginBottom: 25,
  },
  saldoLabel: {
    color: '#AAA',
    fontSize: 14,
  },
  saldo: {
    color: '#FFD700',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 10,
  },
  csdm: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 10,
    letterSpacing: 2,
  },
  boton: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  aurinegro: {
    color: '#FFD700',
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'italic',
  },
});
