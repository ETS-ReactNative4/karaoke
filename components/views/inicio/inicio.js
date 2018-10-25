import React from 'react';
import { StyleSheet, Text, View, BackHandler, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Font, ScreenOrientation, Constants } from 'expo';
import ajax from '../../services/fetchVideo';
import URL from '../../config';

const { WIDTH, HEIGHT } = Dimensions.get('window');

export default class Inicio extends React.Component {

  
  state = {
    fontLoaded: false,
    video: [],
  };

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });

    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });

    const video = await ajax.fetchLastVideo();
    this.setState({ video: video });
  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  componentWillUnmount() {
    this.backHandler.remove();
    
  }

  _onPress = () => {
    this.props.navigation.navigate('Karaoke', {id: this.state.video.id});
  }

  _renderView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Karaoke Chamamecero</Text>
        <Text style={styles.texto}>La aplicación donde te mostraremos nuestras raíces chamameceras, tus raíces...</Text>
        <Text style={styles.infoTop}>Cantá el nuevo tema!</Text>
        
        <TouchableOpacity 
          onPress={this._onPress.bind(this)}
          style={styles.button}
          >
          <View style={styles.background}>
          <View style={styles.top}>
              
              <Text style={styles.info}>{this.state.video.titulo + ' - ' + this.state.video.autor}</Text>
          </View>
          <ImageBackground source={{ uri: URL + this.state.video.thumb }} style={styles.thumb} >
          </ImageBackground>
          </View>
          <View style={styles.bottom}>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.fontLoaded ? (this._renderView()) : (<Text style={styles.texto}>Cargando...</Text>) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#6ABB3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 1,
    fontFamily: 'berlin3',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    marginHorizontal: 10,
    marginBottom: 95,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 20,
    textAlign: 'center',
  },
  texto1: {
    flex: 5,
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 20,
    textAlign: 'center',
  },
  thumblain: {
    flex: 7,
    width: WIDTH,
    height: HEIGHT / 2,
  },
  thumb: {
    width: 300,
    height: 300,
    margin: 0,
    //borderTopLeftRadius: 30,
    //borderTopRightRadius: 30,
  },
  info: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  infoTop: {
    color: 'white',
    marginBottom: 10,
    fontSize: 24,
    fontStyle: 'italic',
    //fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  top: {
    backgroundColor: 'rgba(255,255,255, 0.50)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent:'center',
    margin: 0,
  },
  bottom: {
    backgroundColor: 'rgba(255,255,255, 0.50)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 10,
    alignItems: 'center',
    justifyContent:'center',
    margin: 0,
  },
  button: {
    flex: 8,
  }
});
