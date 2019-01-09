import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, ActivityIndicator, WebView } from 'react-native';
import { Font, Constants, ScreenOrientation } from 'expo';
import ajax from '../../services/fetchVideo';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Vivo extends React.Component {
  state = {
    fontLoaded: false,
    vivo: []
  };

  async componentDidMount() {

    await ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);

    await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    const vivo = await ajax.fetchVivo(); 

    this.setState({fontLoaded: true, vivo: vivo});
  
  }

  async componentWillMount() {

    this.blurSuscription =
      this.props.navigation.addListener('willBlur', () => {
          if(true) {
          this.props.navigation.pop();
          }
      });

  }

  async componentWillUnmount() {
        
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

    this.blurSuscription.remove();
  }
  
  _renderView = () => {
    return (
        <View >
            <WebView
              style={{ flex: 1, width: HEIGHT, height: WIDTH, backgroundColor: 'transparent' }}
              javaScriptEnabled={true}
              domStorageEnabled={false}
              mixedContentMode={"never"}
              thirdPartyCookiesEnabled={false}
              scrollEnabled={false}
              automaticallyAdjustContentInsets={true}
              source={{ uri: this.state.vivo.url }}
          />
        </View>
    )
  }

  render() {
      return (
        <View style={styles.container}>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: HEIGHT, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
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
    width: HEIGHT
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: HEIGHT,
    height: WIDTH,
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