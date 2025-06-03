import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Barbearia GS</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bem-vindo!</Text>
        <Text style={styles.cardText}>
          Seu estilo começa aqui. Agende um horário, veja seus atendimentos ou acesse seu perfil usando as abas abaixo.
        </Text>
      </View>

      <Text style={styles.footer}>Cortes que representam você.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    color: "#000000",
    marginBottom: 40,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 25,
    marginBottom: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 22,
    color: "#C5AB79",
    marginBottom: 10,
  },
  cardText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
  },
  footer: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#C5AB79",
    textAlign: "center",
  },
});
