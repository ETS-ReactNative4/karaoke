import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import { Font, ScreenOrientation, Constants } from 'expo';

const WIDTH = Dimensions.get('window').width;

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userInfo: null, fontLoaded: false};
  }

  async componentDidMount() {

    await Font.loadAsync({
      'podo': require('../../assets/fonts/podo.otf'),
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });

    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
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
        style={styles.avatar} 
      />
      <Text style={styles.infoUser}> {this.state.userInfo.name} </Text>
      <View style={styles.button}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Inicio');
        }} style={styles.btnClickContain}>
        <View
          style={styles.btnContainer}>
          <Icon
            name='facebook-square'
            size={50}
            color='white'/>
          <Text style={styles.btnText}>Ingresar</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

_renderButtonFacebook = () => {
  return (
    <View style={styles.bottom}>
      <View style={styles.button}>
      <TouchableOpacity
        onPress={() => {
          //this.props.navigation.navigate('Inicio');
          //this.resetTo();
          this.loginFB();
        }} style={styles.btnClickContain}>
        <View
          style={styles.btnContainer}>
          <Icon
            name='facebook-square'
            size={50}
            color='white'/>
          <Text style={styles.btnText}>Entrar con Facebook</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

_renderView = () => {
  return (
    <View style={styles.top}>
          <Text style={styles.titulo}>CHAMAMÉ 2.0</Text>
          <IconM name='microphone-variant' size={70} color='white'/>
    </View>
  )
}

render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
    justifyContent:'center'}} >
        <View style={styles.fondo}>
          { this.state.fontLoaded ? (this._renderView()) : null }
          {!this.state.userInfo ? (this._renderButtonFacebook()) : (this._renderUserInfo())}
        <Image style={styles.imagen} source={require('../../resources/images/logo.png')}/>
        <Text style={styles.texto}>Gobierno de Corrientes</Text>
        </View>
        </ImageBackground>
      </View>
    );
  }
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CA853',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: WIDTH,
  },
  top: {
    flex: 3,
    alignItems: 'center',
  },
  bottom: {
    flex: 3,
  },
  titulo: {
    color: 'white',
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center',
    height: 50,
    marginBottom: 30,
    fontFamily: 'podo',
  },
  button: {
    width: Dimensions.get('window').width - 5,
    height: 70,
    backgroundColor: '#3a589e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'white'
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
    color: 'white',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    alignSelf: 'center',
    borderColor: 'white'
  },
  infoUser: {
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 10,
    color: 'white'
  },
  imagen: {
    flex: 2,
    resizeMode: 'center',
  }

});
