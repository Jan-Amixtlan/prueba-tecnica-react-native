import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const CompanySelection = () => {
  const navigation = useNavigation();
  
  const companies = [
    { 
      id: "empresa1", 
      name: "Empresa 1", 
      primaryColor: "#2196F3",
      secondaryColor: "#0D47A1",
      icon: "business", // Icono de empresa/negocio
      description: "Sistema corporativo principal"
    },
    { 
      id: "empresa2", 
      name: "Empresa 2", 
      primaryColor: "#4CAF50",
      secondaryColor: "#2E7D32",
      icon: "corporate-fare", // Icono de corporación
      description: "Plataforma de gestión empresarial"
    },
    { 
      id: "empresa3", 
      name: "Empresa 3", 
      primaryColor: "#FF9800",
      secondaryColor: "#E65100",
      icon: "apartment", // Icono de edificio/apartamento
      description: "Solución de administración"
    }
  ];

  const selectCompany = (companyId) => {
    navigation.navigate("Login", { companyId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Bienvenido al Sistema</Text>
        <Text style={styles.title}>Selecciona tu Empresa</Text>
        <View style={styles.divider} />
        <Text style={styles.instruction}>
          Elige la empresa a la que perteneces para acceder al sistema
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.companiesContainer}>
          {companies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={[
                styles.companyCard,
                {
                  backgroundColor: company.primaryColor,
                  borderLeftWidth: 6,
                  borderLeftColor: company.secondaryColor,
                }
              ]}
              onPress={() => selectCompany(company.id)}
              activeOpacity={0.85}
            >
              <View style={styles.companyContent}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: company.secondaryColor }
                ]}>
                  <Icon 
                    name={company.icon} 
                    size={28} 
                    color="#FFFFFF" 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.companyDescription}>
                    {company.description}
                  </Text>
                </View>
                <View style={[
                  styles.arrowContainer,
                  { backgroundColor: company.secondaryColor }
                ]}>
                  <Icon 
                    name="arrow-forward" 
                    size={22} 
                    color="#FFFFFF" 
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Icon name="help-outline" size={20} color="#666" />
          <Text style={styles.footerText}>
            ¿No encuentras tu empresa?{"\n"}
            <Text style={styles.contactText}>Contacta al administrador del sistema</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 35,
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  divider: {
    width: 70,
    height: 4,
    backgroundColor: "#2196F3",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingTop: 20,
  },
  companiesContainer: {
    width: "100%",
    gap: 16,
  },
  companyCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  companyContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  companyName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.3,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  companyDescription: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 16,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    borderRadius: 16,
    marginHorizontal: -10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    flex: 1,
  },
  contactText: {
    color: "#2196F3",
    fontWeight: "600",
  },
});

export default CompanySelection;