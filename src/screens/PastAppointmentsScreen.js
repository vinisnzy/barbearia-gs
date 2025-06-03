import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { formatDate } from "../utils/dateUtils";

export default function PastAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await AsyncStorage.getItem("appointments");
    if (data) {
      const allAppointments = JSON.parse(data);
      const past = allAppointments.filter(
        (item) => new Date(item.date) < new Date()
      );
      setAppointments(past);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments.sort((a, b) => new Date(b.date) - new Date(a.date))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{formatDate(item.date)}</Text>
            <Text style={styles.cardText}>Serviço: {item.service}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum agendamento anterior.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#aaa",
  },
});
