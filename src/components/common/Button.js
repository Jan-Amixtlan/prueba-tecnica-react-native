import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  ActivityIndicator 
} from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  color = '#007AFF',
  loading = false,
  disabled = false,
  style = {}
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color },
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  }
});

export default Button;