import React from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';

export default class Login extends React.Component {
static navigationOptions = {left: null}
resetTo() {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    key: '0',
    actions: [NavigationActions.navigate({ routeName: 'Inicio' })],
  });
  navigation.dispatch(actionToDispatch);
}
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titulo}>Karaoke Chamamecero</Text>
              <IconM name='microphone-variant' size={70}/>
            </View>
            <View style={styles.bottom}>
              <View style={styles.button}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('Inicio');
                  //this.resetTo();
                }} style={styles.btnClickContain}>
                <View
                  style={styles.btnContainer}>
                  <Icon
                    name='facebook'
                    size={30}
                    color='#fff'/>
                  <Text style={styles.btnText}>Iniciar Sesión con Facebook</Text>
                </View>
              </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
      top: {
        flex: 5,
        alignItems: 'center',
      },
      bottom: {
        flex: 5,
      },
      titulo: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        height: 50,
        marginBottom: 30,
        fontFamily: 'sans-serif-condensed',
      },
      button: {
        width: Dimensions.get('window').width - 5,
        height: 70,
        backgroundColor: '#1259c3',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#fff',
      },
      btnClickContain: {
        flex: 1,
        flexDirection: 'row',
      },
      btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnText: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 20,
        fontWeight: 'bold',
      }

    });
    