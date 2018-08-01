import React from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, Dimensions, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userInfo: null};
  }
static navigationOptions = {left: null}
resetTo() {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    key: '0',
    actions: [NavigationActions.navigate({ routeName: 'Inicio' })],
  });
  navigation.dispatch(actionToDispatch);
}

async loginFB() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1755097877936704', {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
      const userInfo = await response.json();
      this.setState({ userInfo });    
  }
}

_renderUserInfo = () => {
  return (
    <View style={styles.bottom}>
      <Image 
        source={{ uri: this.state.userInfo.picture.data.url}}
        style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }} 
      />
      <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}> {this.state.userInfo.name} </Text>
      <View style={styles.button}>
      <TouchableNativeFeedback
        onPress={() => {
          this.props.navigation.navigate('Inicio');
        }} style={styles.btnClickContain}>
        <View
          style={styles.btnContainer}>
          <Text style={styles.btnText}>Ingresar</Text>
        </View>
      </TouchableNativeFeedback>
      </View>
    </View>
  );
};

_renderButtonFacebook = () => {
  return (
    <View style={styles.bottom}>
      <View style={styles.button}>
      <TouchableNativeFeedback
        onPress={() => {
          //this.props.navigation.navigate('Inicio');
          //this.resetTo();
          this.loginFB();
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
  );
}
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titulo}>Karaoke Chamamecero</Text>
              <IconM name='microphone-variant' size={70}/>
            </View>
            {!this.state.userInfo ? (this._renderButtonFacebook()) : (this._renderUserInfo())}
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
        flex: 3,
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
    