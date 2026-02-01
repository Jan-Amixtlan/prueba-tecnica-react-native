import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getData } from '../utils/storage';
import { getCompanyColor } from '../utils/colors';

const { width } = Dimensions.get('window');

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [companyId, setCompanyId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    const data = await getData('user_data');
    if (data) {
      setUserData(data);
      setCompanyId(data.company);
    }
    setLoading(false);
  };

  const colors = getCompanyColor(companyId);
  

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary || '#2196F3'} />
        <Text style={styles.loadingText}>Cargando información...</Text>
      </SafeAreaView>
    );
  }

  const formatCompanyName = (id) => {
    return id?.replace('empresa', 'Empresa ') || '';
  };

  const features = [
    { icon: 'person', title: 'Perfil', description: 'Ver y editar información personal', color: '#4CAF50' },
    { icon: 'photo-camera', title: 'Foto', description: 'Cambiar imagen de perfil', color: '#FF9800' },
    { icon: 'settings', title: 'Configuración', description: 'Preferencias de la cuenta', color: '#9C27B0' },
    { icon: 'security', title: 'Seguridad', description: 'Cambiar contraseña', color: '#2196F3' },
    { icon: 'notifications', title: 'Notificaciones', description: 'Configurar alertas', color: '#FF5722' },
    { icon: 'help', title: 'Ayuda', description: 'Soporte y preguntas frecuentes', color: '#607D8B' },
  ];

  const stats = [
    { label: 'Días activo', value: '24', icon: 'calendar-today' },
    { label: 'Accesos', value: '156', icon: 'login' },
    { label: 'Último acceso', value: 'Hoy', icon: 'update' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Bienvenido de vuelta</Text>
            <Text style={styles.userName}>{userData?.name || 'Usuario'}</Text>
          </View>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
              <Text style={styles.avatarText}>
                {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.companyBadge}>
          <Icon name="business" size={16} color="#FFFFFF" />
          <Text style={styles.companyBadgeText}>
            {formatCompanyName(companyId)}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: `${colors.primary}15` }]}>
                <Icon name={stat.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* User Info Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="info" size={22} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Información de la Cuenta</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="badge" size={18} color="#666" />
                <Text style={styles.infoLabel}>Nombre</Text>
              </View>
              <Text style={styles.infoValue}>{userData?.name || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="email" size={18} color="#666" />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>{userData?.email || 'N/A'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="corporate-fare" size={18} color="#666" />
                <Text style={styles.infoLabel}>Empresa</Text>
              </View>
              <Text style={[styles.infoValue, { color: colors.primary }]}>
                {formatCompanyName(companyId)}
              </Text>
            </View>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="apps" size={22} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Funcionalidades</Text>
          </View>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity key={index} style={styles.featureCard}>
                <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}20` }]}>
                  <Icon name={feature.icon} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="bolt" size={22} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="edit" size={20} color="#2196F3" />
              <Text style={styles.actionText}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="refresh" size={20} color="#4CAF50" />
              <Text style={styles.actionText}>Actualizar Datos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="logout" size={20} color="#FF5722" />
              <Text style={styles.actionText}>Cerrar Sesión</Text>
            </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
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
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  companyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 10,
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
    paddingVertical: 12,
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
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: (width - 50) / 2,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    color: '#444',
  },
});

export default Home;