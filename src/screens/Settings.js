import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  ScrollView
} from 'react-native';
import { getCompanyColor } from '../utils/colors';

const Settings = () => {
  const companyId = 'empresa1'; // Esto debería venir del contexto o storage
  const colors = getCompanyColor(companyId);

  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    syncData: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>Configuración</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Notificaciones</Text>
              <Text style={styles.settingDescription}>Recibir notificaciones importantes</Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={() => toggleSetting('notifications')}
              thumbColor={settings.notifications ? colors.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: colors.light }}
            />
          </View>

          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Modo Oscuro</Text>
              <Text style={styles.settingDescription}>Interfaz con colores oscuros</Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={() => toggleSetting('darkMode')}
              thumbColor={settings.darkMode ? colors.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: colors.light }}
            />
          </View>

          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Guardado Automático</Text>
              <Text style={styles.settingDescription}>Guardar cambios automáticamente</Text>
            </View>
            <Switch
              value={settings.autoSave}
              onValueChange={() => toggleSetting('autoSave')}
              thumbColor={settings.autoSave ? colors.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: colors.light }}
            />
          </View>

          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingTitle}>Sincronizar Datos</Text>
              <Text style={styles.settingDescription}>Sincronizar con la nube</Text>
            </View>
            <Switch
              value={settings.syncData}
              onValueChange={() => toggleSetting('syncData')}
              thumbColor={settings.syncData ? colors.primary : '#f4f3f4'}
              trackColor={{ false: '#767577', true: colors.light }}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información de la App</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Versión</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Empresa Actual</Text>
            <Text style={styles.infoValue}>{companyId.toUpperCase()}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Desarrollador</Text>
            <Text style={styles.infoValue}>Tu Nombre</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Prueba Técnica React Native</Text>
          <Text style={styles.footerSubtext}>© 2024</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    padding: 20
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  infoLabel: {
    fontSize: 16,
    color: '#666'
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5
  },
  footerSubtext: {
    fontSize: 14,
    color: '#999'
  }
});

export default Settings;