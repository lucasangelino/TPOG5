import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const RecoverCode = ({navigation}) => {
  const [alias, setAlias] = useState('');

  const handleRecoverCode = () => navigation.navigate('PasswordChange');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Codigo de verificacion"
        onChangeText={text => setAlias(text)}
        value={alias}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleRecoverCode}>
        <Text>Recuperar contraseña</Text>
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

export default RecoverCode;
