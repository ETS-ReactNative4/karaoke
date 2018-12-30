import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { Font, ScreenOrientation, Constants } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Inicio extends React.Component {

  
  state = {
    fontLoaded: false,
    shouldPlay: true,
    control: true,
    video: [],
    isReady: false,
  };

  async componentDidMount() {

    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });

    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

  }

  async componentWillMount() {
    
  }

  componentWillUnmount() {
    
  }

  _renderView = () => {
    return (
      <View style={styles.fondo}>
          <Text style={styles.titulo}>CHAMAMÉ 2.0</Text>
          <Text style={styles.subtitulo}>Sembrando Chamamé...</Text>
          <Text style={styles.texto}>La aplicación donde te mostraremos nuestras raíces chamameceras, tus raíces...</Text>

          <View style={styles.centro}>
            <View style={styles.top}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Karaoke')}
              style={styles.btnLink}>
              <View style={styles.btnContainer}>
              <IconMat
                  name='videocam'
                  size={30}
                  color='white'/>
                <Text style={styles.botones}>Karaoke Chamamecero</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Biblioteca')}
              style={styles.btnLink}>
              <View style={styles.btnContainer}>
              <IconMat
                  name='library-music'
                  size={30}
                  color='white'/>
                <Text style={styles.botones}>Escuchá Chamamé</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Fiesta')}
              style={styles.btnLink}>
              <View style={styles.btnContainer}>
              <IconMat
                  name='event-note'
                  size={30}
                  color='white'/>
                <Text style={styles.botones}>Fiesta del Chamamé</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Chamamecito')}
              style={styles.btnLink}>
              <View style={styles.btnContainer}>
              <Icon
                  name='gamepad'
                  size={30}
                  color='white'/>
                <Text style={styles.botones}>Chamamecito</Text>
              </View>
            </TouchableOpacity>
            </View>
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
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
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
  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    padding: 5,
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
  centro: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botones: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'berlin3',
    fontSize: 25,
  },
  btnLink: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#133101',
    borderColor: 'gray',
    borderWidth: 1,
    height: HEIGHT / 4,
    width: WIDTH / 2 - 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
