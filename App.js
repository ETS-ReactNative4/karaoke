import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Inicio from './components//inicio/inicio';
import Header from './components/header/header';
import Menu from './components/menu/menu';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Inicio />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});
