import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';

export default class Inicio extends React.Component {

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenio a Karaoke Chamamecero</Text>
        <Text style={styles.texto}>La aplicación donde te mostraremos nuestras raices chamameceras, tus raices... </Text>
        <Text style={styles.texto1}>Podrás cantar a karaoke algunos de los chamamé más conocidos y que todo el mundo lo vea </Text>
      </View>
      
    );
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    flex: 3,
    marginHorizontal: 10,
    color: 'white',
    fontWeight: 'normal',
    fontSize: 25,
    textAlign: 'center',
  },
  texto1: {
    flex: 5,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'normal',
    fontSize: 20,
    textAlign: 'center',
  }
});
