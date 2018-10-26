import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Font, ScreenOrientation, Constants } from 'expo';
import ajax from '../../services/fetchMusica';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const SIZE_ICON = 60;
const URI = URL;

export default class Musica extends React.Component {

  state = {
    fontLoaded: false,
    temas: []
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    const temas = await ajax.fetchMusica();
    
    this.setState({temas, fontLoaded: true});

  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
      <ImageBackground source={require('../../resources/images/fondo3.jpg')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
        <View style={styles.fondo}>
        <View style={{margin: 5}}>
        <SearchBar
          clearIcon={{ color: 'gray', size: 15 }}
          searchIcon={{size: 55}}
          inputStyle={{
            backgroundColor: 'transparent',
            color: 'white',
          }}
          containerStyle={{
            backgroundColor: 'rgba(255,255,255, 0.40)', 
            borderWidth: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0, 
            borderRadius: 30,
            borderColor: '#8CA853'
          }}
          placeholder='Buscar...' />
        </View>
        <FlatList style={styles.flatList}
          horizontal= {false}
          numColumns= {2}
          data={this.state.temas}
          renderItem={({item, separators}) => (
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.push('Lista', {album: item.album})}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
              >
              <View style={styles.cell}>                    
                <Image style={styles.thumb} source= {{uri: URI + item.thumb}} />
                <Text style={styles.texto}>{item.album} - {item.autor}</Text>
              </View>
              
            </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
        />
        </View>
      </ImageBackground>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.fontLoaded ? (this._renderView()) : (<Text style={styles.cargando}>Cargando...</Text>) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: WIDTH,
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  cargando: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 28, 
    marginHorizontal: 5, 
    textAlign: 'center'
  },
  texto: {
    flex: 1,
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 18, 
    marginHorizontal: 5, 
    textAlign: 'center'
  },
  flatList: {
    flex: 1,
    width: WIDTH,
    alignContent: 'center'
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
    marginLeft: 5,
    //backgroundColor: '#8CA853',
    borderBottomWidth: 1,
    //borderColor: '#8CA853',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    alignItems: 'center'
  },
  lista: {
    flex: 1,
    //backgroundColor: '#8CA853',
    //borderWidth: 1,
    //borderColor: '#8CA853',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    alignItems: 'center',
    marginHorizontal: 5
  },
});