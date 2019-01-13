import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ImageBackground, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import { Font, ScreenOrientation, Constants, KeepAwake  } from 'expo';
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

    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });

    //this._renderAlert();
  }

  _renderAlert = () => {
    Alert.alert(
      'Cambio de horario de la 3ra. noche',
      'La programación de la 3ra noche iniciará puntualmente a las 19:55 hs. \r\n Las entradas de la 2da. noche son válidas para el día de hoy.',
      [
        // {text: 'Ir a Votar', onPress: () => this.props.navigation.navigate('Agenda', {flag: 1})},
        {text: 'Aceptar', onPress: () => console.log('Cancel Pressed'), style: 'ok'},
      ],
      { cancelable: false }
    )
  }

  _renderView = () => {
    return (
      <View style={{width: WIDTH, flex: 1}}>
          <Text style={styles.titulo}>CHAMAMÉ 2.0</Text>
          
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
              onPress={() => this.props.navigation.navigate('Chamiguito')}
              style={styles.btnLink}>
              <View style={styles.btnContainer}>
              <Icon
                  name='gamepad'
                  size={30}
                  color='white'/>
                <Text style={styles.botones}>Chamiguito</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View> 

          <View style={styles.centro1}> 

          {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Agenda', {flag: 1})}
              style={{
                  flex: 5,
                  backgroundColor: '#133101',
                  borderColor: 'white',
                  borderWidth: 2,
                  alignItems:'center',
                  justifyContent:'center',
                  width: WIDTH - 20,
                  height:70,
                  position: 'relative',
                  borderRadius:50,
                  marginBottom: 5,
                }}
            >
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.info1}>¡VOTÁ AL BOCHA!</Text>
              </View>
            </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Vivo')}
              style={{
                  flex: 5,
                  borderWidth:1,
                  borderColor:'rgba(0,0,0,0.2)',
                  alignItems:'center',
                  justifyContent:'center',
                  width: WIDTH - 20,
                  height:50,
                  position: 'relative',
                  backgroundColor:'rgba(0,0,0,0.5)',
                  borderRadius:50,
                }}
            >
            <View style={{flexDirection:'row'}}>
                <Image style={styles.imagen} source={require('../../resources/images/rec.png')}/>
                <Text style={styles.info}>#FNCH VER EN VIVO</Text>
            </View>
            </TouchableOpacity>

            
            
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={ ()=> Linking.openURL('https://web.facebook.com/Chamam%C3%A9-20-Sembrando-Chamam%C3%A9-597174660713574/') }
              style={styles.btnClickContain}>
              <View
                style={styles.btnContainer}>
                <Icon
                  name='facebook-square'
                  size={30}
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
                  size={30}
                  color='white'/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ ()=> Linking.openURL('https://www.youtube.com/channel/UC4ytfWTJk85pl0vZZ0Ch2VQ') }
              style={styles.btnClickContain}>
              <View
                style={styles.btnContainer}>
                <Icon
                  name='youtube'
                  size={30}
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
                  size={30}
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
        <KeepAwake/>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
    justifyContent:'center',}} >
        <View style={styles.fondo}>
          { this.state.fontLoaded ? (this._renderView()) : (<ActivityIndicator size="large" color="#ffff" />) }
        </View>
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
    margin: 10,
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
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  footer: {
    flex: 0.5,
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
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centro1: {
    flex: 1,
    width: WIDTH,
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
  info: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'berlin3',
    fontSize: 20,
    marginLeft: 5,
  },
  info1: {
    color: '#e7c600',
    textAlign: 'center',
    fontFamily: 'berlin3',
    fontSize: 28,
    marginLeft: 5,
  },
  btnLink: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#133101',
    borderColor: 'gray',
    borderWidth: 1,
    height: HEIGHT / 4,
    width: WIDTH / 2 - 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagen: { 
    width: 20,
    height: 20,
    margin: 2,
  }
});
