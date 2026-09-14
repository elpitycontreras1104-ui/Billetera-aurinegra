import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, Alert, Image } from 'react-native';
import { useState } from 'react';

const MI_CVU = "1430001713049041500012";
const MI_ALIAS = "kiosco.aurinegro.mp";

export default function App() {
  const [destino, setDestino] = useState(MI_ALIAS);
  const [monto, setMonto] = useState("1500");

  const transferir = async () => {
    if (!destino || !monto) {
      Alert.alert("Falta dato", "Poné destino y monto");
      return;
    }
    let cbuFinal = destino;
    if (destino.toLowerCase() === MI_ALIAS) {
      cbuFinal = MI_CVU;
    }
    // Esto abre MODO con plata REAL
    const url = `https://www.modo.com.ar/app/transferir?cbu=${cbuFinal}&monto=${monto}`;
    const soporta = await Linking.canOpenURL(url);
    if (soporta) {
      Linking.openURL(url);
    } else {
      Alert.alert("Listo", `Transferir $${monto} a ${destino} -> CBU ${cbuFinal} por MODO/Brubank`);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.logo}>CSDM</Text>
      <Text style={s.titulo}>BILLETERA AURINEGRO</Text>
      <Text style={s.sub}>Alias del Kiosco: {MI_ALIAS}</Text>

      <Text style={s.label}>Enviar a (alias, CBU o CVU):</Text>
      <TextInput style={s.input} value={destino} onChangeText={setDestino} placeholder="kiosco.aurinegro.mp o CBU" />

      <Text style={s.label}>Monto $:</Text>
      <TextInput style={s.input} value={monto} onChangeText={setMonto} keyboardType="numeric" placeholder="1500" />

      <TouchableOpacity style={s.boton} onPress={transferir}>
        <Text style={s.botonTexto}>TRANSFERIR PLATA REAL</Text>
      </TouchableOpacity>

      <Text style={s.ayuda}>Al tocar se abre MODO / Brubank para confirmar con tu clave. Es plata real sin MercadoPago.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFD500", padding: 20, paddingTop: 70 },
  logo: { fontSize: 48, fontWeight: "900", textAlign: "center", color: "#000" },
  titulo: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 5, color: "#000" },
  sub: { textAlign: "center", marginBottom: 25, fontWeight: "600" },
  label: { fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: "#fff", borderRadius: 12, padding: 14, fontSize: 16, borderWidth: 2, borderColor: "#000" },
  boton: { backgroundColor: "#000", borderRadius: 12, padding: 18, marginTop: 30, alignItems: "center" },
  botonTexto: { color: "#FFD500", fontWeight: "bold", fontSize: 16 },
  ayuda: { textAlign: "center", marginTop: 20, fontSize: 12, opacity: 0.7 }
});
