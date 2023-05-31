import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

function Load({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Landing');
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.logoSection}>Cocinando</Text>
      <Text style={styles.loadingSection}>loading...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#6D8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    fontSize: 42,
    color: '#fff',
  },
  loadingSection: {
    fontSize: 18,
  },
});

export default Load;
