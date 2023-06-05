import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import Navbar from '../components/Navbar';

const recetas = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pollo Frito',
    img: 'https://cocer.deagapornis.com/wp-content/uploads/2021/09/pollo-frito-original.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Brownie',
    img: 'https://media.mykaramelli.com/galeria/recetas/brownie-de-capuchino-y-nueces-de-pecan_52_1_890x445.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Ensalada Caesar',
    img: 'https://www.goodnes.com/sites/g/files/jgfbjl321/files/srh_recipes/755f697272cbcdc6e5df2adb44b1b705.jpg',
  },
  {
    id: 'bd7acbea-c1b1-46c2-dfdf-3ad53abb28ba',
    title: 'Flan',
    img: 'https://images.aws.nestle.recipes/original/f07639d0bdf09dac4f27aa9562bf15a9_FLAN_DE_VAINILLA.jpg',
  },
  {
    id: 'bd7acbea-c1b1-46c2-dfdf-3ad53asdsad',
    title: 'Hamburguesa',
    img: 'https://clarin.com/img//2021/06/17/LC25eDtCT_1200x630__1.jpg',
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
  const image = {
    uri: receta.img,
  };
  return (
    <View style={styles.recetaCard}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>{receta.title}</Text>
      </ImageBackground>
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
    marginVertical: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 10,
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
  text: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 2,
  },
  searchText: {
    color: '#000',
    padding: 2,
    fontWeight: 'bold',
  },
});

export default Home;
