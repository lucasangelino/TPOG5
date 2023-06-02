import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const handleContinue = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro exitoso</Text>
      <Text style={styles.subtitle}>
        Por favor, revise la casilla de correo electronico para verificar su
        cuenta
      </Text>
      <TouchableOpacity style={styles.continuarBtn} onPress={handleContinue}>
        <Text>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6D8C00',
  },
  title: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 20,
  },
  continuarBtn: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;
