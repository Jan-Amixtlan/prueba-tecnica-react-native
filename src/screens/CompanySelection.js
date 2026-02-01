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

const { width } = Dimensions.get("window");

const CompanySelection = () => {
  const navigation = useNavigation();
  
  const companies = [
    { 
      id: "empresa1", 
      name: "Empresa 1", 
      primaryColor: "#2196F3",
      secondaryColor: "#1565C0",
      icon: "🏢"
    },
    { 
      id: "empresa2", 
      name: "Empresa 2", 
      primaryColor: "#4CAF50",
      secondaryColor: "#2E7D32",
      icon: "💼"
    },
    { 
      id: "empresa3", 
      name: "Empresa 3", 
      primaryColor: "#FF9800",
      secondaryColor: "#EF6C00",
      icon: "🏭"
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
                <View style={styles.companyIconContainer}>
                  <Text style={styles.companyIcon}>{company.icon}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.companyHint}>Presiona para ingresar</Text>
                </View>
                <View style={[
                  styles.arrowContainer,
                  { backgroundColor: company.secondaryColor }
                ]}>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿No encuentras tu empresa?{"\n"}
            <Text style={styles.contactText}>Contacta al administrador</Text>
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
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
    marginBottom: 6,
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
    transform: [{ scale: 1 }],
  },
  companyContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  companyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  companyIcon: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  companyName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 0.3,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  companyHint: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "400",
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  arrow: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  footer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    borderRadius: 16,
    marginHorizontal: -10,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  contactText: {
    color: "#2196F3",
    fontWeight: "600",
  },
});

export default CompanySelection;