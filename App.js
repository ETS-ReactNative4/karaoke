import React from 'react';
import { View, StyleSheet } from 'react-native';
import DrawerStack from './components/stacks/drawerStack';
import { Font } from 'expo';

export default class App extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('./components/assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

 
  render() {
    return (
        <DrawerStack style={styles.container} />
    )
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