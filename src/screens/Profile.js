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
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getData, saveData, removeData } from '../utils/storage';
import { getCompanyColor } from '../utils/colors';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
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
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permiso necesario', 'Necesitamos acceso a tu galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await saveData('user_profile_image', result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const updatedData = {
      ...userData,
      name: name.trim(),
      email: email.trim()
    };

    await saveData('user_data', updatedData);
    setUserData(updatedData);
    setEditing(false);
    Alert.alert('Éxito', 'Datos actualizados correctamente');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await removeData('user_data');
            navigation.reset({
              index: 0,
              routes: [{ name: 'CompanySelection' }]
            });
          }
        }
      ]
    );
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  const colors = getCompanyColor(companyId);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.headerText}>Mi Perfil</Text>
        </View>

        <View style={styles.content}>
          {/* Foto de perfil */}
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage}>
              <View style={[styles.imageWrapper, { borderColor: colors.primary }]}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                  <Text style={[styles.initials, { color: colors.primary }]}>
                    {name.substring(0, 2).toUpperCase()}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.changePhotoText}>Toca para cambiar foto</Text>
          </View>

          {/* Información del usuario */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Información Personal</Text>
              <TouchableOpacity onPress={() => setEditing(!editing)}>
                <Text style={[styles.editButton, { color: colors.primary }]}>
                  {editing ? 'Cancelar' : 'Editar'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoField}>
              <Text style={styles.label}>Nombre</Text>
              {editing ? (
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              ) : (
                <Text style={styles.value}>{name}</Text>
              )}
            </View>

            <View style={styles.infoField}>
              <Text style={styles.label}>Email</Text>
              {editing ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.value}>{email}</Text>
              )}
            </View>

            <View style={styles.infoField}>
              <Text style={styles.label}>Empresa</Text>
              <Text style={styles.value}>{companyId.toUpperCase()}</Text>
            </View>

            {editing && (
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Botón de cerrar sesión */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
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
    padding: 20,
    marginTop: 20
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  profileImage: {
    width: '100%',
    height: '100%'
  },
  initials: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  changePhotoText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  editButton: {
    fontSize: 16,
    fontWeight: '600'
  },
  infoField: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  value: {
    fontSize: 16,
    color: '#333',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee'
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  logoutButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    marginTop: 20
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default Profile;