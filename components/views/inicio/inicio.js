import React from 'react';
import { StyleSheet, Text, View, Image, BackHandler, Dimensions, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { Font, ScreenOrientation, Video, Constants } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import ajax from '../../services/fetchVideo';
import URL from '../../config';

const { WIDTH, HEIGHT } = Dimensions.get('window');

export default class Inicio extends React.Component {

  
  state = {
    fontLoaded: false,
    shouldPlay: false,
    control: true,
    video: [],
  };

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });

    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/IndieFest.ttf'),
    });

    this.setState({ fontLoaded: true });

    //const video = await ajax.fetchLastVideo();
    //this.setState({ video: video });
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
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
    justifyContent:'center',}} >
      <View style={styles.fondo}>
          <Text style={styles.titulo}>CHAMAMÉ 2.0</Text>
          <Text style={styles.texto}>La aplicación donde te mostraremos nuestras raíces chamameceras, tus raíces...</Text>
          <Text style={styles.infoTop}>#FNCH2019</Text>
          
          <Video
                //source={{uri: 'https://www.youtube.com/watch?v=Or4otjCGXio'}}
                source={require('../../resources/videos/spot.mp4')}
                ref={(ref) => {
                  this.player = ref;
                }}
                rate={1.0}
                volume={1}
                shouldPlay={this.state.shouldPlay}
                onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                resizeMode="stretch"
                useNativeControls={this.state.control}
                //style={{ width: height / 2, height: width * 0.8, alignSelf: 'center'}}
                style={{ width: 400, height: 300, alignSelf: 'center'}}
            />

            <View style={styles.footer}>
            <TouchableOpacity
              onPress={ ()=> Linking.openURL('https://www.facebook.com/FNChamame') }
              style={styles.btnClickContain}>
              <View
                style={styles.btnContainer}>
                <Icon
                  name='facebook-square'
                  size={50}
                  color='white'/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ ()=> Linking.openURL('https://www.instagram.com/FNChamame/') }
              style={styles.btnClickContain}>
              <View
                style={styles.btnContainer}>
                <Icon
                  name='instagram'
                  size={50}
                  color='white'/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ ()=> Linking.openURL('https://www.youtube.com/channel/UC_gkRuW_H3CWVeNPUbB9Ehw') }
              style={styles.btnClickContain}>
              <View
                style={styles.btnContainer}>
                <Icon
                  name='youtube'
                  size={50}
                  color='white'/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ ()=> Linking.openURL('https://twitter.com/FNChamame') }
              style={styles.btnClickContain}>
              <View
                style={styles.btnContainer}>
                <Icon
                  name='twitter-square'
                  size={50}
                  color='white'/>
              </View>
            </TouchableOpacity>
            </View>
          </View> 
        </ImageBackground>
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
    //paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#8CA853',
    //backgroundImage: `url(require("../../resources/images/fondo.jpeg"))`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 1,
    fontFamily: 'podo',
    color: 'white',
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
  },
  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: WIDTH,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  texto: {
    marginHorizontal: 10,
    marginBottom: 95,
    color: 'white',
    fontFamily: 'berlin3',
    //fontStyle: 'italic',
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
    width: 300,
    height: 300,
    
  }
});
