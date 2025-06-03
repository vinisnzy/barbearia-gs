import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDate } from "../utils/dateUtils";

export default function AppointmentsScreen() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [service, setService] = useState("Corte");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await AsyncStorage.getItem("appointments");
    if (data) setAppointments(JSON.parse(data));
  };

  const saveAppointment = async () => {
    const newAppointment = {
      id: Date.now(),
      date: date.toISOString(),
      service,
    };
    const updatedAppointments = [...appointments, newAppointment];
    await AsyncStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );
    setAppointments(updatedAppointments);
    setModalVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentDate);
  };

  const upcomingAppointments = appointments.filter(
    (item) => new Date(item.date) >= new Date()
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+ NOVO ATENDIMENTO</Text>
      </TouchableOpacity>

      <FlatList
        data={upcomingAppointments.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{formatDate(item.date)}</Text>
            <Text style={styles.cardText}>Serviço: {item.service}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Image
            style={styles.noAppointmentsImage}
            source={require("../assets/images/no-appointments.svg")}
          />
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Atendimento</Text>

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.selectButton}
            >
              <Text style={styles.selectButtonText}>Selecionar Data</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.selectButton}
            >
              <Text style={styles.selectButtonText}>Selecionar Horário</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            <Picker
              selectedValue={service}
              onValueChange={(itemValue) => setService(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Corte" value="Corte" />
              <Picker.Item label="Barba" value="Barba" />
              <Picker.Item label="Corte + Barba" value="Corte + Barba" />
            </Picker>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveAppointment}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    borderColor: "#3C3C3B",
    borderWidth: 1,
    backgroundColor: "#EDEDED",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 17,
    fontFamily: "Montserrat-Regular",
  },
  noAppointmentsImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#C5AB79",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    height: 400,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 19,
    fontFamily: "Montserrat-Bold",
    marginBottom: 15,
    textAlign: "center",
  },
  selectButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontFamily: "Montserrat-Regular",
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "#3C3C3B",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  cancelText: {
    fontFamily: "Montserrat-Regular",
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
