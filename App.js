import React from 'react';
import { StyleSheet } from 'react-native';
import LoginStack from './components/stacks/tabBarBottom';
import { Font, ScreenOrientation } from 'expo';
import OneSignal from 'react-native-onesignal';

export default class App extends React.Component {

  constructor(properties) {
    super(properties);
    OneSignal.init('0ec4a132-f5c1-488d-baff-cf2e40596d58');
    OneSignal.configure();
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  state = {
    fontLoaded: false,
  };

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('./components/assets/fonts/berlin3.ttf'),
    });

      //Deshabilito warnings
    console.disableYellowBox = true;
    this.setState({ fontLoaded: true });
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

 
  render() {
    return (
        <LoginStack style={styles.container} />
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