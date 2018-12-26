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

export default class Karaoke extends React.Component {

  state = {
    fontLoaded: false,
    videos: []
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    //const videos = await ajax.fetchMusica();
    
    //this.setState({videos, fontLoaded: true});
    this.setState({fontLoaded: true});

  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
      // <View style={{flex: 1}}>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, margin: 0, paddingTop: Constants.statusBarHeight}} >
          <View style={styles.fondo}>
          <View style={{height: 50, margin: 5, width: WIDTH - 5}}>
          
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
        {/* <FlatList style={styles.flatList}
          horizontal= {false}
          numColumns= {2}
          data={this.state.videos}
          renderItem={({item, separators}) => (
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.push('Video', {id: item.id})}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
              >
              <View style={styles.cell}>                    
                <Image style={styles.thumb} source= {{uri: URI + item.thumb}} />
                <Image style={styles.thumb} source= {require('../../resources/videos/galeria.mp4')} />
                <Text style={styles.texto}>{item.album} - {item.autor}</Text>
                <Text style={styles.texto}>Arrebol - Dustin Gassmann</Text>
              </View>
              
            </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          /> */}
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('VideoKar')} >
              <View style={styles.cell}>                    
                <Image style={styles.thumb} source= {require('../../resources/videos/arrebol-dustin.png')} />
                <Text style={styles.texto}>Arrebol - Dustin Gassmann</Text>
              </View>
              
            </TouchableOpacity>
            </View>
        </ImageBackground>
      // </View>
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
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: WIDTH,
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
    //flex: 1,
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 18, 
    //marginHorizontal: 5, 
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
    //flex: 9,
    //marginTop: 10,
    width: WIDTH / 2 - 10,
    marginLeft: 10,
    //borderWidth: 1,
    borderColor: '#8CA853',
    borderBottomColor: '#d1d1d1', 
    //marginBottom: 5,
    alignItems: 'center'
  },
  lista: {
    flex: 1,
    backgroundColor: '#8CA853',
    borderWidth: 1,
    borderColor: '#8CA853',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    alignItems: 'center',
    marginHorizontal: 5
  },
});