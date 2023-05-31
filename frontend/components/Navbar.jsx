import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Navbar = ({navigation}) => {
  return (
    <View style={styles.nabvar}>
      <Text style={styles.menu}>Menu</Text>
      <Text style={styles.logo}>Cocinando</Text>
      <Text style={styles.avatar}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nabvar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6D8C00',
    height: 100,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 20,
  },
  menu: {
    fontSize: 20,
    color: '#fff',
  },
  logo: {
    fontSize: 20,
    color: '#fff',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#fff',
    color: '#fff',
  },
});

export default Navbar;
