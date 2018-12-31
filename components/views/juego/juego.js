import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator, ImageBackground, Linking, Image } from 'react-native';
import { Font, ScreenOrientation, Constants } from 'expo';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Juego extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
      });

      this.setState({ fontLoaded: true });
    
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
        <View style={styles.fondo}>
            <View style={styles.top}>
                <Text style={styles.titulo}>
                ¡Descargá el nuevo juego del Chamamecito y aventurate junto a "Chamiguito" en los diferentes paisajes de nuestro querido Corrientes!
                </Text>
            </View>
            <View style={styles.center}>
                <Image 
                    source={require('../../resources/images/chamiguito.png')}
                    style={styles.imagen}>
                </Image>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button}
                onPress={()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.goodbarber.chamame')}
                >
                    <Image source={require('../../resources/images/google.png')} style={styles.imagen} />
                    
                </TouchableOpacity >
                <TouchableOpacity style={styles.button}
                onPress={()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.goodbarber.chamame')}
                >
                    <Image source={require('../../resources/images/appstore.png')} style={styles.imagen} />
                    
                </TouchableOpacity >
            </View>
        </View>
    )
  }
 
  render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
            { this.state.fontLoaded ? (this._renderView()) : (<ActivityIndicator size="large" color="#ffff" />) }
            </ImageBackground>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  button: {
    flex: 1,
    margin: 10,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH
  },
  center: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH
  },
  bottom: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH
  },
  texto: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 24,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  titulo: {
    flex: 1,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 24,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  imagen: {
    flex: 3,
    margin: 15,
    width: '100%',
    minHeight: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    resizeMode: 'contain'
  }
});