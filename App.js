import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Inicio from './components/inicio';
import Header from './components/header';

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
