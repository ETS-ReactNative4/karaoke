import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Font, AppLoading, ScreenOrientation, Constants } from 'expo';

const WIDTH = Dimensions.get('window').width;

export default class Radio extends React.Component {

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
            
                <Text style={styles.texto}>RADIO</Text>
          </View>       
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
    height: 100,
    margin: 10,
    borderColor: 'white',
    borderBottomColor: '#d1d1d1',
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
    fontSize: 16,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
});