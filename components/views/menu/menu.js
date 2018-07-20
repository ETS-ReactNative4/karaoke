import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Menu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
            <TouchableHighlight onPress={() => this.pressCell()}>
                <Text style={styles.titulo}>Inicio</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.pressCell()}>
                <Text style={styles.titulo}>Cantá</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.pressCell()}>
                <Text style={styles.titulo}>Música</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.pressCell()}>
                <Text style={styles.titulo}>Festival del Chamamé</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.pressCell()}>
                <Text style={styles.titulo}>Agenda Cultural</Text>
            </TouchableHighlight>
      </View>
    );
  }
 
pressCell(){
    alert('touch');
}
}


const styles = StyleSheet.create({
  titulo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: 'gray'
  }
});
