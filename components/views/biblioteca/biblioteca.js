import React from 'react';
import { View, StyleSheet, Text, Dimensions, ImageBackground } from 'react-native';
import { Font, AppLoading, ScreenOrientation, Constants } from 'expo';

const { WIDTH, HEIGHT } = Dimensions.get('window');

export default class Biblioteca extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
      });

      this.setState({ fontLoaded: true });
    
    //ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
        <View style={styles.fondo}>
            <Text>CHAMAMÉ 2.0</Text>
          
        </View>
    )
  }
 
  render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
        justifyContent:'center',}} >
            { this.state.fontLoaded ? (this._renderView()) : (<Text style={styles.cargando}>Cargando...</Text>) }
            </ImageBackground>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: WIDTH,
    height: HEIGHT,
  },
  cargando: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 16,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
});