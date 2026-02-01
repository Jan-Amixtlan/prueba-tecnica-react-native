import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getData, saveData, removeData } from '../utils/storage';
import { getCompanyColor } from '../utils/colors';

const { width } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [companyId, setCompanyId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    const data = await getData('user_data');
    const savedImage = await getData('user_profile_image');
    
    if (data) {
      setUserData(data);
      setName(data.name);
      setEmail(data.email);
      setCompanyId(data.company);
    }
    
    if (savedImage) {
      setImage(savedImage);
    }
    setLoading(false);
  };

  const pickImage = async () => {
    setImageLoading(true);
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permiso necesario', 
        'Necesitamos acceso a tu galería para cambiar tu foto de perfil',
        [{ text: 'Entendido' }]
      );
      setImageLoading(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await saveData('user_profile_image', result.assets[0].uri);
      Alert.alert('Éxito', 'Foto de perfil actualizada correctamente');
    }
    
    setImageLoading(false);
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Email inválido', 'Por favor ingresa un email válido');
      return;
    }

    setSaving(true);
    
    try {
      const updatedData = {
        ...userData,
        name: name.trim(),
        email: email.trim(),
        updatedAt: new Date().toISOString()
      };

      await saveData('user_data', updatedData);
      setUserData(updatedData);
      setEditing(false);
      
      Alert.alert(
        '¡Perfecto!',
        'Tu información ha sido actualizada exitosamente',
        [{ text: 'Continuar' }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la información. Intenta nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir de tu cuenta?',
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        {
          text: 'Sí, salir',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeData('user_data');
              await removeData('user_profile_image');
              navigation.reset({
                index: 0,
                routes: [{ name: 'CompanySelection' }]
              });
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión. Intenta nuevamente.');
            }
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </SafeAreaView>
    );
  }

  const colors = getCompanyColor(companyId);
  const formatCompanyName = (id) => id?.replace('empresa', 'Empresa ') || '';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={[styles.header, { backgroundColor: colors.primary }]}>
            <View style={styles.headerOverlay} />
            <View style={styles.headerContent}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
                <Text style={styles.headerSubtitle}>Administra tu información</Text>
              </View>
            </View>
          </View>

          {/* Profile Image Section */}
          <View style={styles.profileImageSection}>
            <View style={styles.imageContainer}>
              <TouchableOpacity 
                style={styles.imageTouchable}
                onPress={pickImage}
                disabled={imageLoading}
              >
                <View style={[styles.imageWrapper, { borderColor: colors.primary }]}>
                  {image ? (
                    <Image 
                      source={{ uri: image }} 
                      style={styles.profileImage} 
                      onLoadStart={() => setImageLoading(true)}
                      onLoadEnd={() => setImageLoading(false)}
                    />
                  ) : (
                    <View style={[styles.initialsContainer, { backgroundColor: colors.secondary }]}>
                      <Text style={styles.initials}>
                        {name?.substring(0, 2).toUpperCase() || 'US'}
                      </Text>
                    </View>
                  )}
                  
                  {imageLoading && (
                    <View style={styles.imageLoader}>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    </View>
                  )}
                  
                  <View style={styles.cameraBadge}>
                    <Icon name="photo-camera" size={16} color="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
              
              <View style={styles.imageTextContainer}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>
                <TouchableOpacity 
                  style={styles.changePhotoButton}
                  onPress={pickImage}
                  disabled={imageLoading}
                >
                  <Icon name="edit" size={14} color={colors.primary} />
                  <Text style={[styles.changePhotoText, { color: colors.primary }]}>
                    Cambiar foto de perfil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Edit Profile Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.sectionTitleContainer}>
                <Icon name="person" size={22} color="#2C3E50" />
                <Text style={styles.sectionTitle}>Información Personal</Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.editToggle, editing && styles.editToggleActive]}
                onPress={() => editing ? handleCancel() : setEditing(true)}
              >
                <Icon 
                  name={editing ? "close" : "edit"} 
                  size={18} 
                  color={editing ? "#FF3B30" : colors.primary} 
                />
                <Text style={[
                  styles.editButtonText, 
                  { color: editing ? "#FF3B30" : colors.primary }
                ]}>
                  {editing ? 'Cancelar' : 'Editar'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Name Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.fieldLabelRow}>
                <Icon name="badge" size={18} color="#666" />
                <Text style={styles.fieldLabel}>Nombre completo</Text>
              </View>
              {editing ? (
                <TextInput
                  style={[styles.input, { borderColor: colors.primary }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor="#999"
                  editable={!saving}
                />
              ) : (
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{name}</Text>
                </View>
              )}
            </View>

            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.fieldLabelRow}>
                <Icon name="email" size={18} color="#666" />
                <Text style={styles.fieldLabel}>Correo electrónico</Text>
              </View>
              {editing ? (
                <TextInput
                  style={[styles.input, { borderColor: colors.primary }]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#999"
                  editable={!saving}
                />
              ) : (
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{email}</Text>
                </View>
              )}
            </View>

            {/* Company Field (Read Only) */}
            <View style={styles.fieldContainer}>
              <View style={styles.fieldLabelRow}>
                <Icon name="business" size={18} color="#666" />
                <Text style={styles.fieldLabel}>Empresa</Text>
              </View>
              <View style={[styles.valueContainer, { backgroundColor: `${colors.primary}10` }]}>
                <Text style={[styles.valueText, { color: colors.primary, fontWeight: '600' }]}>
                  {formatCompanyName(companyId)}
                </Text>
              </View>
            </View>

            {/* Save Button */}
            {editing && (
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleSave}
                disabled={saving}
                activeOpacity={0.9}
              >
                {saving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="check-circle" size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Guardar cambios</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Account Settings Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.sectionTitleContainer}>
                <Icon name="settings" size={22} color="#2C3E50" />
                <Text style={styles.sectionTitle}>Configuración de Cuenta</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="security" size={22} color="#2196F3" />
              <Text style={styles.menuItemText}>Seguridad y privacidad</Text>
              <Icon name="chevron-right" size={22} color="#999" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="notifications" size={22} color="#FF9800" />
              <Text style={styles.menuItemText}>Notificaciones</Text>
              <Icon name="chevron-right" size={22} color="#999" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="help" size={22} color="#9C27B0" />
              <Text style={styles.menuItemText}>Ayuda y soporte</Text>
              <Icon name="chevron-right" size={22} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.9}
          >
            <Icon name="logout" size={20} color="#FF3B30" />
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>

          
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginTop: 4,
  },
  profileImageSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageTouchable: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTextContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 10,
  },
  editToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  editToggleActive: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FFCDD2',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1.5,
  },
  valueContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  valueText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#FFCDD2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#CCC',
    fontWeight: '500',
  },
});

export default Profile;