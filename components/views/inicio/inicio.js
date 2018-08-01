import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Inicio extends React.Component {

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
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 2,
    color: '#6ABB3A',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    flex: 3,
    marginHorizontal: 10,
    color: 'gray',
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
