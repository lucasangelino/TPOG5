import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.logo}>Cocinando</Text>
        <Text style={styles.title}>Iniciar Sesion</Text>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginBtnText}>Ingresar con alias o Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newAccountBtn}
            onPress={() => navigation.navigate('Register')}>
            <Text>Crear un nuevo usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>Ingresar sin registrarme</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6D8C00',
    paddingVertical: 20,
  },
  loginBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newAccountBtn: {
    textDecorationLine: 'underline',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  logo: {
    fontSize: 50,
    color: '#fff',
    marginTop: 100,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#BCAF4D',
    borderRadius: 16,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginBtnText: {
    color: '#fff',
    paddingHorizontal: 20,
  },
});

export default LandingScreen;
