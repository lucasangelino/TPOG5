import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Navbar from '../components/Navbar';

const recetas = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-dfdf-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-234-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-cgh-145571e29d72',
    title: 'Third Item',
  },
];

const Home = ({navigation}) => {
  return (
    <View style={styles.AppContainer}>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.inputSearch}>
          <TextInput
            style={styles.input}
            placeholder="Nombre, ingredientes..."
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Nuevas Recetas</Text>
        <View style={styles.recetasContainer}>
          <FlatList
            style={styles.recetasList}
            data={recetas}
            renderItem={({item, index}) => (
              <RecetaCard key={index} receta={item} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const RecetaCard = ({receta}) => {
  return (
    <View style={styles.recetaCard}>
      <Text>{receta.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recetasList: {
    width: '100%',
  },
  inputSearch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'gray',
    borderRadius: 100,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginTop: 150,
  },
  recetaCard: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    color: '#6D8C00',
    marginBottom: 20,
  },
  recetasContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtn: {
    backgroundColor: '#6D8C00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  searchText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Home;
