import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Dimensions, BackHandler } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, ScreenOrientation } from 'expo';
import ajax from '../../services/fetchMusica';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const URI = URL;

export default class Lista extends React.Component {

  state = {
    fontLoaded: false,
    temas: []
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    const temas = await ajax.fetchAlbum(this.props.navigation.state.params.album);
    this.setState({ temas, fontLoaded: true });

    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

    //Habilito boton fisico atras
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
    });
  }

  _renderView = () => {
    return (
      <View>
      <View style={{margin: 5}}>
          <SearchBar
            clearIcon={{ color: 'gray', size: 15 }}
            searchIcon={{size: 55}}
            inputStyle={{
              backgroundColor: 'transparent',
              color: 'white',
            }}
            containerStyle={{
              backgroundColor: 'rgba(255,255,255, 0.40)', 
              borderWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0, 
              borderRadius: 30,
              borderColor: '#8CA853'
            }}
            placeholder='Buscar...' />
          </View>
        <FlatList
          data={this.state.temas}
          renderItem={({item, separators}) => (  
            <TouchableOpacity style={styles.button}
              onPress={() => this.props.navigation.push('Player', {album: item.album, index: item.track_id, temas: this.state.temas })}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.lista}>
                <Icon name='play-circle' size={40} color={'white'}/>
                <Text style={styles.texto}>{item.titulo} - {item.autor}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
        </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.fontLoaded ? (this._renderView()) : (<Text style={styles.texto}>Cargando...</Text>) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#8CA853',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18, 
    marginLeft: 10, 
    textAlign: 'auto'
  },
  button: {
    width: WIDTH,
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8CA853',
    borderWidth: 1,
    borderColor: '#8CA853',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    marginHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});