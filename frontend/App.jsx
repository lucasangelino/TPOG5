/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Load from './screens/Load.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import Landing from './screens/Landing.jsx';
import RegisterConfirmed from './screens/RegisterConfirmed.jsx';
import Recover from './screens/Recover.jsx';
import RecoverCode from './screens/RecoverCode.jsx';
import PasswordChange from './screens/PasswordChange.jsx';
import Home from './screens/Home.jsx';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterConfirmed" component={RegisterConfirmed} />
        <Stack.Screen name="Recover" component={Recover} />
        <Stack.Screen name="RecoverCode" component={RecoverCode} />
        <Stack.Screen name="PasswordChange" component={PasswordChange} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={styles.sectionContainer}>
    //   <Text>a</Text>
    // </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
