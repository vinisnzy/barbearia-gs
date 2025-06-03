import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    verificarLogin();
  }, []);

  const verificarLogin = async () => {
    const usuario = await AsyncStorage.getItem("usuarioLogado");
    if (usuario) {
      setUsuarioLogado(JSON.parse(usuario));
    }
  };

  const handleLogin = async () => {
    const usuariosSalvos = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      await AsyncStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioEncontrado)
      );
      setUsuarioLogado(usuarioEncontrado);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } else {
      Alert.alert("Erro", "Email ou senha incorretos.");
    }
  };

  const handleCadastro = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const usuariosSalvos = await AsyncStorage.getItem("usuarios");
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    const jaExiste = usuarios.find((u) => u.email === email);

    if (jaExiste) {
      Alert.alert("Erro", "Este e-mail já está cadastrado.");
      return;
    }

    const novoUsuario = { email, senha };
    const novaLista = [...usuarios, novoUsuario];
    await AsyncStorage.setItem("usuarios", JSON.stringify(novaLista));
    await AsyncStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    setUsuarioLogado(novoUsuario);
    Alert.alert("Sucesso", "Cadastro realizado!");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuarioLogado");
    setUsuarioLogado(null);
    setEmail("");
    setSenha("");
  };

  return (
    <View style={styles.container}>
      {usuarioLogado ? (
        <View style={styles.loggedInContainer}>
          <Text style={styles.welcomeText}>
            Bem-vindo, {usuarioLogado.email}
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6c757d" }]}
            onPress={handleCadastro}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  label: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#C5AB79",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loggedInContainer: {
    alignItems: "center",
    width: "100%",
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
