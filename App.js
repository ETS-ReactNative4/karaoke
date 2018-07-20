import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import drawerStack from './components/stacks/drawerStack';

const Navigator = createStackNavigator({
  drawerStack: {screen: drawerStack}
}, {
  headerMode: 'none',
  initialRouteName: 'drawerStack'
})

export default class App extends React.Component {
  render() {
    return <Navigator/>;
  }
}

