import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import { getCompanyColor } from "../utils/colors";
import { validateCredentials } from "../utils/mockData";
import { saveData } from "../utils/storage";

const Login = ({ route, navigation }) => {
  const { companyId } = route.params || {};
  const colors = getCompanyColor(companyId);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    
    // Simular petición a API
    setTimeout(() => {
      const user = validateCredentials(companyId, email, password);
      
      if (user) {
        const userData = {
          ...user,
          company: companyId
        };
        
        saveData("user_data", userData);
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }]
        });
      } else {
        Alert.alert("Error", "Credenciales incorrectas");
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>Iniciar Sesión</Text>
        <Text style={styles.companyText}>{companyId?.toUpperCase()}</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver a selección</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center"
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  },
  companyText: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    opacity: 0.9
  },
  formContainer: {
    padding: 20,
    marginTop: 30
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  loginButton: {
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  backButton: {
    marginTop: 20,
    alignItems: "center"
  },
  backButtonText: {
    color: "#666",
    fontSize: 16
  }
});

export default Login;