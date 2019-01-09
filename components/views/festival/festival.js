import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Dimensions, ImageBackground} from 'react-native';
import { Font, ScreenOrientation, Constants, Video } from 'expo';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Festival extends React.Component {
  
  state = {
    fontLoaded: false,
    shouldPlay: false,
    control: true,
  }

  async componentDidMount() {

    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true, shouldPlay: true });

  }

  async componentWillMount() {

    this.blurSuscription =
      this.props.navigation.addListener('willBlur', () => {
          if (!this.player.state.shouldPlay) {
            this.player.stopAsync();
          }
      });
  }

  async componentWillUnmount() {

    this.blurSuscription.remove();
  }

  _renderView = () => {
    return (
        <ScrollView style={styles.scroll}>
          <View style={{flex: 1, width: WIDTH}}>
          <Text style={styles.titulo}>Fiesta Nacional del Chamamé</Text>
          <Text style={styles.subTitulo}>29° FIESTA NACIONAL DEL CHAMAMÉ</Text>
          <Text style={styles.subTitulo}>15° FIESTA DEL CHAMAMÉ DEL MERCOSUR</Text>
          <Text style={styles.texto}>La Fiesta Nacional del Chamamé 2019 ya tiene fecha. Se realizará del 11 al 20 de enero y se llamará “Chamamé de la Humanidad”, como correlato de la postulación ante la Unesco que impulsa el Gobierno Provincial con el apoyo de la Nación para que el género
          obtenga el reconocimiento internacional.</Text>

          <Video
                ref={(ref) => {
                  this.player = ref
                }}
                source={require('../../resources/videos/spot.mp4')}
                rate={1.0}
                volume={1}
                shouldPlay={this.state.shouldPlay}
                resizeMode="contain"
                useNativeControls={true}
                style={{ width: WIDTH, height: 250, alignSelf: 'center', marginBottom: 20 }}
            />

          <Text style={styles.subTitulo}>FIESTA DEL CHAMAMÉ</Text>
          <Image style={styles.imagen} source={require('../../resources/images/festival.jpg')}/>
          <Text style={styles.texto}>La Fiesta del Chamamé se celebra en la ciudad de Corrientes, Argentina, específicamente en el Anfiteatro Cocomarola y en el Puente Pexoa, donde cada año durante varios días del mes de enero, suena y se baila el chamamé, un género musical de origen folclórico
          característico de la región oriental de Argentina, el Paraguay, Río Grande del Sur y algunos pueblos del sur de Brasil y Uruguay.</Text>
          <Text style={styles.subTitulo}>CHAMAMÉ</Text>
          <Text style={styles.texto}>Acerca del origen del nombre &quot;chamamé&quot;: La acepción más equilibrada contempla la propia de “baile que se improvisa” o “espontáneo” o “como nace desde adentro” o “como se siente” también aplicado por autores al baile como &quot;ritmo bailado
          de acuerdo al sentimiento que provoca la música, sin reglas estructuradas&quot;.</Text>
          <Text style={styles.subTitulo}>CHAMAMÉ SEGÚN SUS INFLUENCIAS</Text>
          <Text style={styles.texto2}>Chamamé Maceta: de pulsos y ritmos vivos, habituales en los grupos que tocan en festivales, bailes y &quot;boliches&quot;.</Text>
          <Text style={styles.texto2}>Chamamé Cangüí (triste): se caracteriza por su tónica lenta y sentimental.</Text>
          <Text style={styles.texto2}>Chamamé Orillero: en el que se notan muchas influencias del tango.</Text>

          <Text style={styles.subTitulo}>Cómo llegar</Text>
          <View style={{flexDirection: 'row', width: WIDTH, minHeight: 50, alignItems: 'center'}}>
            <Image style={styles.imagen1} source={require('../../resources/images/ubicacion.png')}/>
            <Text style={styles.texto2}>Av. Domingo Sarmiento 2650, Corrientes</Text>
          </View>
        </View>
        </ScrollView>
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
    )
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
  },
  scroll: {
    flex: 1,
    width: WIDTH,
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
  titulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  subTitulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 15
  },
  texto: {
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  texto2: {
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  imagen: {
    flex: 1, 
    width: Dimensions.get('window').width,
    height: 250, 
    resizeMode: 'stretch',
    marginBottom: 10,
    marginTop: 10,
  },
  imagen1: {
    width: 30,
    height: 50,
    resizeMode: 'contain',
    margin: 5
  }
});
