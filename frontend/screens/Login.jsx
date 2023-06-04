import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const req = await fetch('http://192.168.0.10:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({mail, password}),
      });

      if (req.status !== 200) {
        const res = await req.json();
        setIsLoading(false);
        console.log(res);
        setError(`Error al ingresar. Code: ${res.message}`);
      } else {
        navigation.navigate('Home');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setError(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cocinando</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={mail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text>{!isLoading ? 'Ingresar' : 'Ingresando...'}</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Recover')}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Crear nueva cuenta</Text>
          </TouchableOpacity>
          <Text>{error}</Text>
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
