import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Dimensions, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Font, ScreenOrientation } from 'expo';
import Player from './Player.js';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const SIZE_ICON = 60;

export default class Musica extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });

    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
      <View>
      <View style={{marginBottom: 10}}>
        <SearchBar
          clearIcon={{ color: 'gray', size: 15 }}
          searchIcon={{size: 55}}
          // onChangeText={}
          // onClear={}
          inputStyle={{
            backgroundColor: 'transparent',
            color: 'gray'
          }}
          containerStyle={{
            width: Dimensions.get('window').width,
            backgroundColor: 'rgba(255,255,255, 0.40)', 
            borderWidth: 2, 
            borderRadius: 5,
            borderColor: 'gray'
          }}
          placeholder='Buscar...' />
        </View>
        <FlatList style={styles.flatList}
          horizontal= {false}
          numColumns= {2}
          data={[{title: 'Acordeón y Guitarra', anio: '2003', autor: 'La Yunta Correntina', thumb: require('../../resources/images/la-yunta-correntina.png'), key: 'item1'},
                {title: 'Pese a Todo', anio: '2003', autor: 'Grupo Integración', thumb: require('../../resources/images/grupo-integracion.jpg'), key: 'item2'},
                {title: 'El Canto de Nuestro Gente', autor: 'Grupo Reencuentro', thumb: require('../../resources/images/grupo-reencuentro.png'), key: 'item3'},
                {title: 'Rumbeando pal Litoral', autor: 'Santiago "Bocha" Sheridan', thumb: require('../../resources/images/bocha.jpg'), key: 'item4'},
                {title: 'Maravilloso Amor', autor: 'Mario Bofill', thumb: require('../../resources/images/estudiante.jpg'), key: 'item5'},
                {title: 'Soy Forastero', autor: 'Grupo Integración', thumb: require('../../resources/images/grupo-integracion.jpg'), key: 'item6'},
                {title: 'Al Fin de Cuentas', autor: 'Grupo Integración',thumb: require('../../resources/images/bocha.jpg'),  key: 'item7'},
                {title: 'Estudiante del Interior', autor: 'Mario Bofill', thumb: require('../../resources/images/estudiante.jpg'), key: 'item8'},
                {title: 'Neike Chamigo', autor: 'Julian Zini', thumb: require('../../resources/images/grupo-reencuentro.png'), key: 'item9'},
                {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', thumb: require('../../resources/images/la-yunta-correntina.png'), key: 'item10'},
                {title: 'Kilómetro 11', autor: 'Tránsito Cocomarola',thumb: require('../../resources/images/bocha.jpg'),  key: 'item11'},
                {title: 'Oración del Remanso', autor: 'Amandaye', thumb: require('../../resources/images/grupo-reencuentro.png'), key: 'item12'},
                {title: 'Estudiante del Interior', autor: 'Mario Bofill', thumb: require('../../resources/images/estudiante.jpg'), key: 'item13'},
                {title: 'Neike Chamigo', autor: 'Julian Zini', thumb: require('../../resources/images/grupo-integracion.jpg'), key: 'item14'},
                {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan',thumb: require('../../resources/images/bocha.jpg'),  key: 'item15'}]}
          renderItem={({item, separators}) => (
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.navigate('Lista', {title: item.title, autor: item.autor, key: item.key})}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
              >
              <View style={styles.cell}>                    
                <Image style={styles.thumb} source= {item.thumb} />
                <Text style={styles.texto}>{item.title} - {item.autor}</Text>
              </View>
              
            </TouchableOpacity>
            )}
        />
        </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.fontLoaded ? (this._renderView()) : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#6ABB3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 18, 
    marginHorizontal: 5, 
    textAlign: 'center'
  },
  flatList: {
    flex: 1,
  },
  cell: {
    flexDirection: 'column',
    width: WIDTH / 2 - 12,
    alignItems: 'center'
  },
  thumb: {
    resizeMode: 'contain',
    width: WIDTH / 2 - 12,
    height: HEIGHT / 2 - (SIZE_ICON * 3),
  },
  button: {
    width: WIDTH / 2 - 10,
    marginVertical: 5,
    backgroundColor: '#6ABB3A',
    borderWidth: 1,
    borderColor: '#6ABB3A',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    alignItems: 'center'
  },
  lista: {
    flex: 1,
    backgroundColor: '#6ABB3A',
    borderWidth: 1,
    borderColor: '#6ABB3A',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    alignItems: 'center',
    marginHorizontal: 5
  },
});