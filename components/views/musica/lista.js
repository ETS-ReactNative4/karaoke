import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, ScreenOrientation, Constants } from 'expo';
import ajax from '../../services/fetchMusica';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const URI = URL;

export default class Lista extends React.Component {

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

    const temas = await ajax.fetchAutor(this.props.navigation.state.params.autor);
    
    this.setState({ data: temas, loading: false, fontLoaded: true });

    this.arrayholder = temas;
  }
	
  SearchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.titulo.toUpperCase()}`;
  
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
        <FlatList
          data={this.state.data}
          renderItem={({item, separators}) => (  
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.navigate('Player', {autor: item.autor, track_id: item.track_id})}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.lista}>
                <Icon name='play-circle' size={40} color={'white'}/>
                <Text style={styles.texto}>{item.titulo}</Text>
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
    alignContent: 'center',
    backgroundColor: '#133101'
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
    marginLeft: 10, 
    textAlign: 'auto'
  },
  button: {
    width: WIDTH,
    marginLeft: 5,
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    marginLeft: 5,
    minHeight: 55,
    marginHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});