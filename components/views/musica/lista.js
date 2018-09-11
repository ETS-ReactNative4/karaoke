import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, ScreenOrientation } from 'expo';
import ajax from '../../services/fetchMusica';

const URI = 'http://192.168.0.101';

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
  }

  _renderView = () => {
    return (
      <View>
      <View style={{marginBottom: 10}}>
        <SearchBar
          clearIcon={{ color: 'gray', size: 15 }}
          searchIcon={{size: 55}}
          // onChangeText={}
          // onClear={}
          inputStyle={{
            backgroundColor: 'transparent',
            color: 'gray'
          }}
          containerStyle={{
            width: Dimensions.get('window').width,
            backgroundColor: 'rgba(255,255,255, 0.40)', 
            borderWidth: 2, 
            borderRadius: 5,
            borderColor: 'gray'
          }}
          placeholder='Buscar...' />
        </View>
        <FlatList
          data={this.state.temas}
          renderItem={({item, separators}) => (  
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Player', {album: item.album, index: item.track_id, temas: this.state.temas })}
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
        { this.state.fontLoaded ? (this._renderView()) : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#6ABB3A',
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
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 18, 
    marginHorizontal: 5, 
    textAlign: 'left'
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6ABB3A',
    borderWidth: 1,
    borderColor: '#6ABB3A',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    alignItems: 'center',
    marginHorizontal: 5
  },
});