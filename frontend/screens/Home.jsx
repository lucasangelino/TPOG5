import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';

const Home = ({navigation}) => {
  <SafeAreaView>
    <Navbar />
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Homeaaaaa</Text>
    </View>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#6D8C00',
  },
  text: {
    color: '#000',
  },
});
export default Home;
