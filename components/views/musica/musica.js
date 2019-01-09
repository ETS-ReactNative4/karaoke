import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Image, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Font, ScreenOrientation, Constants } from 'expo';
import ajax from '../../services/fetchMusica';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const SIZE_ICON = 60;
const URI = URL;

export default class Musica extends React.Component {

  constructor(props) {
 
    super(props);
 
    this.state = {
 
    fontLoaded: false,
    loading: false,      
    data: [],      
    error: null, 
    temas: []
    
    }
 
    this.arrayholder = [] ;
  }


  async componentDidMount() {
    
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    const temas = await ajax.fetchMusica();
    
    this.setState({ data: temas, loading: false, fontLoaded: true });

    this.arrayholder = temas; 

  }

  async componentWillMount() {
    
  }

  SearchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.autor.toUpperCase()}`;
  
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
  
    this.setState({ data: newData });  
  };

  _renderView = () => {
    return (
      <View >
        <View style={{width: WIDTH, margin: 5}}>
        <SearchBar
            clearIcon={{ color: 'gray', size: 30 }}
            searchIcon={{
              size: 60,
              color: 'black',
            }}
            inputStyle={{
              backgroundColor: 'white',
              color: 'black',

            }}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            containerStyle={{
              backgroundColor: 'white',
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
          data={this.state.data}
          renderItem={({item, separators}) => (
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.navigate('Lista', {autor: item.autor})}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
              >
              <View style={styles.cell}>                    
                <Image style={styles.thumb} source= {require('../../resources/images/nota.png')} />
                <Text style={styles.texto}>{item.autor}</Text>
              </View>
              
            </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
    justifyContent:'center',}} >
        <View style={styles.fondo}>
          { this.state.fontLoaded ? (this._renderView()) : (<ActivityIndicator size="large" color="#ffff" />) }
        </View>
        </ImageBackground>
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
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  cargando: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 16,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
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
    //height: HEIGHT / 2 - (SIZE_ICON * 5),
    height: WIDTH / 5,
  },
  button: {
    width: WIDTH / 2 - 10,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    alignItems: 'center'
  },
  lista: {
    flex: 1,
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    alignItems: 'center',
    marginHorizontal: 5
  },
});