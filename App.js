import React from 'react';
import { StyleSheet } from 'react-native';
//import LoginStack from './components/stacks/tabBarBottom';
import TabBarBottom from './components/stacks/tabBarBottom';
import { ScreenOrientation, SplashScreen   } from 'expo';

export default class App extends React.Component {

  state = {
    fontLoaded: false,
    isSplashReady: false,
    isReady: false,
  };

  async componentDidMount() {

    
    //Deshabilito warnings
    console.disableYellowBox = true;

    SplashScreen.Hide();

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