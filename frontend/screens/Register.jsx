import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const RegisterConfirmed = ({navigation}) => {
  const [nickname, setNickName] = useState('');
  const [mail, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const req = await fetch('http://192.168.0.10:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nickname, mail}),
      });

      if (req.status !== 200) {
        setLoading(false);
        const res = await req.json();
        setError(`Error al registrar usuario. Code: ${res.message}`);
      } else {
        navigation.navigate('RegisterConfirmed');
      }
    } catch (err) {
      setLoading(false);
      setError('Error al registrar');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Alias"
        onChangeText={text => setNickName(text)}
        value={nickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={mail}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
        <Text>{isLoading ? 'Registrando...' : 'Registrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Crear nueva cuenta</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 100,
  },
  error: {
    color: 'red',
    padding: 10,
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    color: 'white',
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

export default RegisterConfirmed;
