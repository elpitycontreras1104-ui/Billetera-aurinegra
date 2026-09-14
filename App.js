import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>C.S.D.M</Text>
      <Text style={styles.subtitulo}>Billetera Oficial</Text>
      <Text style={styles.texto}>Club Social y Deportivo Madryn</Text>
      <Text style={styles.aurinegro}>¡Vamos Aurinegro!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  texto: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
  },
  aurinegro: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
  },
});
