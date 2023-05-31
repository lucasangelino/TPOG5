import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HOME</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Email" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default Home;
