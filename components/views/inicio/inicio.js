import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ImageBackground, TouchableOpacity, Linking, WebView } from 'react-native';
import { Font, ScreenOrientation, Constants } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const { WIDTH, HEIGHT } = Dimensions.get('window');

export default class Inicio extends React.Component {

  
  state = {
    fontLoaded: false,
    shouldPlay: true,
    control: true,
    video: [],
    isReady: false,
  };

  async componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //   this.props.navigation.goBack(); // works best when the goBack is async
    //   return true;
    // });

    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });

  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  componentWillUnmount() {
    //this.backHandler.remove();
    
  }

  _onPress = () => {
    //this.props.navigation.navigate('Karaoke', {id: this.state.video.id});
  }

  _renderView = () => {
    return (
      <View style={styles.fondo}>
          <Text style={styles.titulo}>CHAMAMÉ 2.0</Text>
          <Text style={styles.subtitulo}>Sembrando Chamamé...</Text>
          <Text style={styles.texto}>La aplicación donde te mostraremos nuestras raíces chamameceras, tus raíces...</Text>
          <Text style={styles.infoTop}>#FNCH2019</Text>

          {/* <Video
                source={ {uri: "http://dustingassmann.ddns.net/resources/videos/arrebol.mp4"} }
                //source={require('../../resources/videos/spot.mp4')}
                ref={(ref) => {
                  this.player = ref;
                }}
                rate={1.0}
                volume={1}
                shouldPlay={this.state.shouldPlay}
                resizeMode="stretch"
                useNativeControls={this.state.control}
                style={{ width: 400, height: 300, alignSelf: 'center'}}
            /> */}

          <View style={{ flex: 3, width: WIDTH}}>
          <WebView
              style={{ flex: 1}}
              javaScriptEnabled={true}
              source={{uri: 'https://www.youtube.com/embed/Or4otjCGXio?rel=0&autoplay=1&showinfo=1&controls=1'}}
          />
          </View>

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
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
    justifyContent:'center',}} >
        { this.state.fontLoaded ? (this._renderView()) : (<ActivityIndicator size="large" color="#ffff" />) }
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 0.5,
    fontFamily: 'berlin3',
    color: 'white',
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    flex: 0.5,
    fontFamily: 'berlin3',
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
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
    flex: 0.5,
    marginHorizontal: 10,
    marginBottom: 5,
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
    flex: 0.5,
    color: 'white',
    marginBottom: 10,
    fontSize: 24,
    fontFamily: 'berlin3',
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
