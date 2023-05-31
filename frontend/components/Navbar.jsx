import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Navbar = ({navigation}) => {
  return (
    <View style={styles.nabvar}>
      <View>
        <Text style={styles.logo}>Cocinando</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nabvar: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6D8C00',
    paddingVertical: 20,
    height: 100,
  },
  logo: {
    fontSize: 50,
    color: '#fff',
  },
});

export default Navbar;
