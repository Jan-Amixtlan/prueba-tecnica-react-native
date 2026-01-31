import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CompanySelection = () => {
  const navigation = useNavigation();
  
  const companies = [
    { id: "empresa1", name: "Empresa 1", color: "#FF6B6B" },
    { id: "empresa2", name: "Empresa 2", color: "#4ECDC4" },
    { id: "empresa3", name: "Empresa 3", color: "#FFD166" }
  ];

  const selectCompany = (companyId) => {
    navigation.navigate("Login", { companyId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu Empresa</Text>
      <View style={styles.companiesContainer}>
        {companies.map((company) => (
          <TouchableOpacity
            key={company.id}
            style={[styles.companyButton, { backgroundColor: company.color }]}
            onPress={() => selectCompany(company.id)}
          >
            <Text style={styles.companyText}>{company.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333"
  },
  companiesContainer: {
    width: "100%",
    gap: 20
  },
  companyButton: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  companyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  }
});

export default CompanySelection;