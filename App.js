import React from 'react';
import { View, StyleSheet } from 'react-native';
//import LoginStack from './components/stacks/tabBarBottom';
import TabBarBottom from './components/stacks/tabBarBottom';
import { ScreenOrientation } from 'expo';

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
        <TabBarBottom style={styles.container}/>        
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }
});