import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { getData } from '../utils/storage';
import { getCompanyColor } from '../utils/colors';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getData('user_data');
    if (data) {
      setUserData(data);
      setCompanyId(data.company);
    }
  };

  const colors = getCompanyColor(companyId);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
        <Text style={styles.userName}>{userData.name}</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { borderLeftColor: colors.primary }]}>
          <Text style={styles.cardTitle}>Información de la Cuenta</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Empresa:</Text>
            <Text style={styles.infoValue}>{companyId.toUpperCase()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userData.email}</Text>
          </View>
        </View>

        <View style={[styles.card, { borderLeftColor: colors.secondary }]}>
          <Text style={styles.cardTitle}>Funcionalidades</Text>
          <Text style={styles.featureText}>• Ver perfil de usuario</Text>
          <Text style={styles.featureText}>• Editar información personal</Text>
          <Text style={styles.featureText}>• Cambiar foto de perfil</Text>
          <Text style={styles.featureText}>• Configurar preferencias</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  welcomeText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  userName: {
    color: 'white',
    fontSize: 20,
    marginTop: 5
  },
  content: {
    padding: 20,
    marginTop: 20
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  infoLabel: {
    color: '#666',
    fontSize: 16
  },
  infoValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500'
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    marginLeft: 10
  }
});

export default Home;