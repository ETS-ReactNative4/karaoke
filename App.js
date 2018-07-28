import React from 'react';
import { View, StyleSheet } from 'react-native';
import DrawerStack from './components/stacks/drawerStack';

export default class App extends React.Component {
    render() {
    return (<DrawerStack style={styles.container}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});