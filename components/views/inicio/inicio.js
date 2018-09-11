import React from 'react';
import { StyleSheet, Text, View, BackHandler, Dimensions } from 'react-native';
import { Font, ScreenOrientation } from 'expo';

export default class Inicio extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });

    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });
    
  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  componentWillUnmount() {
    this.backHandler.remove();
    
  }

  _renderView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido a Karaoke Chamamecero</Text>
        <Text style={styles.texto}>La aplicación donde te mostraremos nuestras raíces chamameceras, tus raíces...</Text>
        <Text style={styles.texto}>Podrás cantar a karaoke algunos de los chamamé más conocidos y compartirlos.</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.fontLoaded ? (this._renderView()) : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#6ABB3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 2,
    fontFamily: 'berlin3',
    color: 'white',
    //fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    flex: 3,
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 25,
    textAlign: 'center',
  },
  texto1: {
    flex: 5,
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 20,
    textAlign: 'center',
  }
});
