import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from "react-native";
import { getCompanyColor } from "../utils/colors";
import { validateCredentials } from "../utils/mockData";
import { saveData } from "../utils/storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const Login = ({ route, navigation }) => {
  const { companyId } = route.params || {};
  const colors = getCompanyColor(companyId);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text && !emailRegex.test(text)) {
      setEmailError("Formato de correo inválido");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (text && text.length < 6) {
      setPasswordError("Mínimo 6 caracteres");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    let isValid = true;
    
    if (!email.trim()) {
      setEmailError("Este campo es requerido");
      isValid = false;
    }
    
    if (!password.trim()) {
      setPasswordError("Este campo es requerido");
      isValid = false;
    }

    if (!isValid) return;

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
        Alert.alert(
          "Error de Autenticación",
          "El correo o contraseña son incorrectos. Por favor verifica tus credenciales.",
          [{ text: "Entendido", style: "default" }]
        );
      }
      
      setLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Recuperar Contraseña",
      "Se enviará un enlace de recuperación a tu correo electrónico registrado.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Enviar", style: "default" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header con gradiente */}
          <View style={[styles.header, { backgroundColor: colors.primary }]}>
            <View style={styles.headerContent}>
              <TouchableOpacity 
                style={styles.backArrow}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerSubtitle}>Bienvenido a</Text>
                <Text style={styles.headerTitle}>Iniciar Sesión</Text>
                <View style={styles.companyBadge}>
                  <Text style={styles.companyText}>
                    {companyId?.replace("empresa", "Empresa ")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.headerDecoration}>
              <View style={[styles.decorationCircle, { backgroundColor: colors.secondary }]} />
              <View style={[styles.decorationCircle, styles.circle2, { backgroundColor: colors.secondary }]} />
            </View>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Ingresa tus credenciales</Text>
              
              {/* Campo Email */}
              <View style={styles.inputGroup}>
                <View style={styles.inputLabelContainer}>
                  <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
                  <Text style={styles.inputLabel}>Correo Electrónico</Text>
                </View>
                <TextInput
                  style={[
                    styles.input,
                    emailError ? styles.inputError : null,
                    { borderLeftColor: colors.primary }
                  ]}
                  placeholder="ejemplo@empresa.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={validateEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!loading}
                />
                {emailError ? (
                  <View style={styles.errorContainer}>
                    <Icon name="error-outline" size={16} color="#FF3B30" />
                    <Text style={styles.errorText}>{emailError}</Text>
                  </View>
                ) : null}
              </View>

              {/* Campo Contraseña */}
              <View style={styles.inputGroup}>
                <View style={styles.inputLabelContainer}>
                  <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
                  <Text style={styles.inputLabel}>Contraseña</Text>
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      passwordError ? styles.inputError : null,
                      { borderLeftColor: colors.primary }
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={validatePassword}
                    secureTextEntry={secureText}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSecureText(!secureText)}
                    disabled={loading}
                  >
                    <Icon 
                      name={secureText ? "visibility-off" : "visibility"} 
                      size={24} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <View style={styles.errorContainer}>
                    <Icon name="error-outline" size={16} color="#FF3B30" />
                    <Text style={styles.errorText}>{passwordError}</Text>
                  </View>
                ) : null}
              </View>

              {/* Olvidé contraseña */}
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
                disabled={loading}
              >
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              {/* Botón de Login */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { 
                    backgroundColor: colors.primary,
                    opacity: loading ? 0.7 : 1
                  }
                ]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.9}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="login" size={22} color="#FFFFFF" style={styles.buttonIcon} />
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Separador */}
              <View style={styles.separator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>o</Text>
                <View style={styles.separatorLine} />
              </View>

              {/* Botón Volver */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <Icon name="business" size={20} color="#666" style={styles.buttonIcon} />
                <Text style={styles.backButtonText}>Cambiar empresa</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                ¿Problemas para ingresar?{"\n"}
                <Text style={[styles.contactText, { color: colors.primary }]}>
                  Contacta al soporte técnico
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
    overflow: "hidden",
  },
  headerContent: {
    paddingHorizontal: 20,
    zIndex: 2,
  },
  backArrow: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 20 : 40,
    left: 20,
    zIndex: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  companyBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  companyText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  headerDecoration: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  decorationCircle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
  },
  circle2: {
    top: "30%",
    right: "10%",
    width: 80,
    height: 80,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 25,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
  },
  input: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
    color: "#333",
    borderLeftWidth: 4,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    fontSize: 16,
    color: "#333",
    paddingRight: 50,
    borderLeftWidth: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 14,
    zIndex: 1,
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "500",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 10,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  separatorText: {
    marginHorizontal: 15,
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  backButton: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  backButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  contactText: {
    fontWeight: "600",
  },
});

export default Login;