import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, ScreenOrientation, Constants } from 'expo';
import ajax from '../../services/fetchMusica';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const URI = URL;

export default class Documentales extends React.Component {

  state = {
    fontLoaded: false,
    temas: []
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    //const temas = await ajax.fetchVideos();
    this.setState({ fontLoaded: true });

    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
      <View style={{flex: 1, width: WIDTH, height: HEIGHT, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.texto}>Próximamente...</Text>
        {/* <FlatList
          data={this.state.temas}
          renderItem={({item, separators}) => (  
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.navigate('Video', {id: item.id})}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.lista}>
                <Icon name='play-circle' size={40} color={'white'}/>
                <Text style={styles.texto}>{item.titulo} - {item.autor}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        /> */}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
    justifyContent:'center',}} >
        <View style={styles.fondo}>
          { this.state.fontLoaded ? (this._renderView()) : (<ActivityIndicator size="large" color="#ffff" />) }
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#133101'
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    flex: 1,
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 28, 
    marginTop: 30, 
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  button: {
    width: WIDTH,
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    marginHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});