import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const PasswordChange = ({navigation}) => {
  const [alias, setAlias] = useState('');

  const handleRecoverCode = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa la nueva contraseña"
        onChangeText={text => setAlias(text)}
        value={alias}
      />
      <TextInput
        style={styles.input}
        placeholder="Repita la nueva contraseña"
        onChangeText={text => setAlias(text)}
        value={alias}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleRecoverCode}>
        <Text>Cambiar contraseña</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 40,
    color: '#fff',
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

export default PasswordChange;
