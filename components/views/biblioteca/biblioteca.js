import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Font, AppLoading, ScreenOrientation, Constants } from 'expo';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Biblioteca extends React.Component {

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
        
          <View style={styles.botones}>
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.push('Musica')}
               >
                <ImageBackground source={require('../../resources/images/acordeon.png')} style={{flex: 1, width: WIDTH, margin: 0}}>
                  <Text style={styles.texto}>MÚSICA</Text>
                </ImageBackground>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.push('Documentales')}
               >
                <ImageBackground source={require('../../resources/images/documentales.png')} style={{flex: 1, width: WIDTH, margin: 0}}>
                  <Text style={styles.texto}>DOCUMENTALES</Text>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.push('Radio')}
               >
                <ImageBackground source={require('../../resources/images/radio-gif1.gif')} style={{flex: 1, width: WIDTH, margin: 0, backgroundColor: "black"}}>
                  <Text style={styles.texto}>RADIO</Text>
                </ImageBackground>
            </TouchableOpacity>
          </View>       
        </View>
    )
  }
 
  render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
            { this.state.fontLoaded ? (this._renderView()) : (<Text style={styles.cargando}>Cargando...</Text>) }
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
    width: WIDTH,
    backgroundColor: 'rgba(0, 0, 0, 0.50)'
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
  button: {
    width: WIDTH,
    height: HEIGHT / 4,
    margin: 10,
    backgroundColor: '#d1d1d1',
    alignItems: 'center'
  },
  botones: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //justifyContent: 'space-between',
    width: WIDTH
  },
  texto: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 22,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
});