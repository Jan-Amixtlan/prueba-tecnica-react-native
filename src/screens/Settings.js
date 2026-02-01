import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getData, saveData } from '../utils/storage';
import { getCompanyColor } from '../utils/colors';

const { width } = Dimensions.get('window');

const Settings = ({ navigation }) => {
  const [companyId, setCompanyId] = useState('');
  const [colors, setColors] = useState(getCompanyColor(''));
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    syncData: false,
    biometrics: false,
    dataSaver: true,
    analytics: true,
    autoUpdate: true
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getData('user_data');
    if (data) {
      setCompanyId(data.company);
      setColors(getCompanyColor(data.company));
    }
    
    const savedSettings = await getData('user_settings');
    if (savedSettings) {
      setSettings(prev => ({
        ...prev,
        ...savedSettings
      }));
    }
  };

  const toggleSetting = async (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    
    setSettings(newSettings);
    await saveData('user_settings', newSettings);
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contactar Soporte',
      '¿Deseas enviar un correo al equipo de soporte?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Enviar Email', 
          onPress: () => Linking.openURL('mailto:soporte@empresa.com')
        }
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Limpiar Caché',
      '¿Estás seguro de que deseas limpiar la caché de la aplicación?\n\nEsto no afectará tus datos personales.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpiar', 
          onPress: () => {
            Alert.alert('Éxito', 'La caché ha sido limpiada correctamente.');
          }
        }
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Exportar Datos',
      '¿Deseas exportar todos tus datos en formato JSON?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Exportar', 
          onPress: () => {
            Alert.alert('Datos Exportados', 'Tus datos han sido exportados correctamente.');
          }
        }
      ]
    );
  };

  const formatCompanyName = (id) => {
    return id?.replace('empresa', 'Empresa ') || 'Empresa';
  };

  const settingOptions = [
    {
      icon: 'notifications',
      title: 'Notificaciones',
      description: 'Recibir notificaciones importantes',
      color: '#FF9800',
      key: 'notifications'
    },
    {
      icon: 'dark-mode',
      title: 'Modo Oscuro',
      description: 'Interfaz con colores oscuros',
      color: '#424242',
      key: 'darkMode'
    },
    {
      icon: 'save',
      title: 'Guardado Automático',
      description: 'Guardar cambios automáticamente',
      color: '#4CAF50',
      key: 'autoSave'
    },
    {
      icon: 'cloud-sync',
      title: 'Sincronización',
      description: 'Sincronizar datos en la nube',
      color: '#2196F3',
      key: 'syncData'
    },
    {
      icon: 'fingerprint',
      title: 'Biometría',
      description: 'Usar huella digital o Face ID',
      color: '#9C27B0',
      key: 'biometrics'
    },
    {
      icon: 'data-saver-on',
      title: 'Ahorro de Datos',
      description: 'Optimizar uso de datos móviles',
      color: '#607D8B',
      key: 'dataSaver'
    },
    {
      icon: 'analytics',
      title: 'Análisis de Uso',
      description: 'Compartir datos de uso anónimos',
      color: '#00BCD4',
      key: 'analytics'
    },
    {
      icon: 'update',
      title: 'Actualizaciones',
      description: 'Descargar actualizaciones automáticamente',
      color: '#FF5722',
      key: 'autoUpdate'
    }
  ];

  const actionOptions = [
    {
      icon: 'backup',
      title: 'Exportar Datos',
      description: 'Exportar toda tu información',
      action: handleExportData,
      color: '#4CAF50'
    },
    {
      icon: 'delete',
      title: 'Limpiar Caché',
      description: 'Liberar espacio de almacenamiento',
      action: handleClearCache,
      color: '#FF9800'
    },
    {
      icon: 'help',
      title: 'Ayuda y Soporte',
      description: 'Contáctanos para asistencia',
      action: handleContactSupport,
      color: '#2196F3'
    },
    {
      icon: 'description',
      title: 'Términos y Privacidad',
      description: 'Ver términos de servicio y privacidad',
      action: () => Alert.alert('Términos', 'Contenido de términos y privacidad...'),
      color: '#9C27B0'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con gradiente */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Configuración</Text>
            <Text style={styles.headerSubtitle}>Personaliza tu experiencia</Text>
          </View>
        </View>
        <View style={styles.companyBadge}>
          <Icon name="settings" size={16} color="#FFFFFF" />
          <Text style={styles.companyBadgeText}>
            {formatCompanyName(companyId)}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Configuración de Preferencias */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="tune" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Preferencias</Text>
          </View>
          
          <View style={styles.settingsGrid}>
            {settingOptions.map((item, index) => (
              <View key={index} style={styles.settingCard}>
                <View style={styles.settingHeader}>
                  <View style={[styles.settingIconContainer, { backgroundColor: `${item.color}20` }]}>
                    <Icon name={item.icon} size={22} color={item.color} />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{ false: '#E0E0E0', true: `${item.color}80` }}
                  thumbColor={settings[item.key] ? item.color : '#F5F5F5'}
                  ios_backgroundColor="#E0E0E0"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="build" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Acciones</Text>
          </View>
          
          <View style={styles.actionsGrid}>
            {actionOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={item.action}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: `${item.color}15` }]}>
                  <Icon name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.actionTitle}>{item.title}</Text>
                <Text style={styles.actionDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Información de la App */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="info" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Información</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="apps" size={20} color="#666" />
                <Text style={styles.infoLabel}>Versión de la App</Text>
              </View>
              <View style={styles.versionBadge}>
                <Text style={styles.versionText}>1.0.0</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="business" size={20} color="#666" />
                <Text style={styles.infoLabel}>Empresa</Text>
              </View>
              <Text style={[styles.infoValue, { color: colors.primary }]}>
                {formatCompanyName(companyId)}
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="person" size={20} color="#666" />
                <Text style={styles.infoLabel}>Desarrolladora</Text>
              </View>
              <Text style={styles.infoValue}>Janeth Amixtlan</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="date-range" size={20} color="#666" />
                <Text style={styles.infoLabel}>Última actualización</Text>
              </View>
              <Text style={styles.infoValue}>31 Enero 2026</Text>
            </View>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="bar-chart" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Estadísticas</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Días activo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Accesos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Estabilidad</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>A+</Text>
              <Text style={styles.statLabel}>Rendimiento</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Icon name="code" size={28} color={colors.primary} />
            <Text style={styles.footerTitle}>Prueba Técnica React Native</Text>
            <Text style={styles.footerSubtitle}>Desarrollo de Aplicaciones Móviles</Text>
            <View style={styles.footerDivider} />
            <Text style={styles.footerText}>
              Aplicación desarrollada con React Native y Expo
            </Text>
            <Text style={styles.footerCopyright}>© 2026 - Janeth Amixtlan</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginTop: 2,
  },
  companyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  companyBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
    marginTop: -15,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
     marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginLeft: 10,
  },
  settingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  settingCard: {
    width: (width - 50) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 14,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 50) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
  },
  infoValue: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },
  versionBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  versionText: {
    color: '#1976D2',
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footerContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  footerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerCopyright: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
});

export default Settings;