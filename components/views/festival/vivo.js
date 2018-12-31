import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, ActivityIndicator, WebView } from 'react-native';
import { Font, Video, Constants, ScreenOrientation } from 'expo';
import ajax from '../../services/fetchVideo';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Vivo extends React.Component {
  state = {
    fontLoaded: false,
    shouldPlay: false,
    isReady: false,
    vivo: []
  };

  async componentDidMount() {

    await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    const vivo = await ajax.fetchVivo();            

    this.setState({ shouldPlay: true, fontLoaded: true, vivo: vivo});

    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);    
  }
  
  _renderView = () => {
    return (
        <View >
            <Text style={styles.titulo}></Text>
            <WebView
              style={{ width: WIDTH, minHeight: 250 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: this.state.vivo.url }}
          />
        </View>
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
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',
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
  titulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  }
});