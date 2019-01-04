import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, ImageBackground, Alert, TouchableOpacity, WebView} from 'react-native';
import { Font, ScreenOrientation, Constants  } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import ajax from '../../services/fetchGrilla';
import URL from '../../config';

const URI = URL + '/public';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Agenda extends React.Component {

  state = {
    fontLoaded: false,
    visible: false,
    grilla: []
  }

  setVisible = () => {
    this.setState({visible: true});
  }

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    const grilla = await ajax.fetchGrilla();

    this.setState({ grilla, fontLoaded: true });
    
  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
      <View >
        <Text style={styles.titulo}>#FNCH2019 Grilla</Text>
        <View style={{ flex: 9, width: WIDTH}}>
          <WebView
              style={{ backgroundColor: 'transparent'}}
              javaScriptEnabled={true}
              source={{uri: URI}}
          />
          </View>
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
    backgroundColor: '#133101'
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
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  }
});