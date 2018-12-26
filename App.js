import React from 'react';
import { View, StyleSheet } from 'react-native';
//import LoginStack from './components/stacks/tabBarBottom';
import TabBarBottom from './components/stacks/tabBarBottom';
import { Font, AppLoading, ScreenOrientation } from 'expo';

export default class App extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {

    //Deshabilito warnings
    console.disableYellowBox = true;
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

 
  render() {
    return (
        <TabBarBottom style={styles.container} />
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