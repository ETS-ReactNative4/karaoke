import React from 'react';
import { TouchableNativeFeedback, Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import drawerScreen from './drawerScreen';

const DrawerNavigation = createStackNavigator({
    drawerStack: {screen: drawerScreen}
}, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: 'rgb(255, 45, 85)'
        },
        title: 'Karaoke',
        headerTintColor: 'white',
        headerLeft: <View style={styles.icono}>
            <TouchableNativeFeedback 
                onPress={() => {
                    navigation.toggleDrawer();
                }}>
                <Icon name="bars" color="white" size={25} />
            </TouchableNativeFeedback>
        </View>
    })
})

const styles = StyleSheet.create({
    icono: {
      
      paddingLeft: 20
    }
});

export default DrawerNavigation;