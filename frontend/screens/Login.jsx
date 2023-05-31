import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => navigation.navigate('Home');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cocinando</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
            <Text style={styles.link}>¿Olvidaste tu cccccccccccontraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Crear nueva cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6D8C00',
  },
  form: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 100,
    color: '#fff',
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 20,
  },
  link: {
    color: 'white',
  },
  logo: {
    fontSize: 50,
    color: '#fff',
    marginVertical: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
