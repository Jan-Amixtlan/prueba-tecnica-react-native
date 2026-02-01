import AsyncStorage from '@react-native-async-storage/async-storage';

// Claves para almacenamiento
export const StorageKeys = {
  SELECTED_COMPANY: 'selected_company',
  USER_DATA: 'user_data',
  USER_PROFILE_IMAGE: 'user_profile_image'
};

// Aqui se guardan datos en AsyncStorage
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Para obtener datos
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

// para eliminar datos
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

// Limpiar toda la sesión
export const clearSession = async () => {
  try {
    await removeData(StorageKeys.USER_DATA);
    await removeData(StorageKeys.SELECTED_COMPANY);
    return true;
  } catch (error) {
    console.error('Error clearing session:', error);
    return false;
  }
};