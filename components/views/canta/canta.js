import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Font, ScreenOrientation, Constants } from 'expo';
import ajax from '../../services/fetchVideo';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const URI = URL;

export default class Canta extends React.Component {
  
  state = {
    fontLoaded: false,
    mounted: true,
    videos: [],
  };

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  async componentDidMount() {
    if(this.state.mounted) {
      this.state.mounted = false;
      await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
      });
      
      const videos = await ajax.fetchVideos();
      this.setState({ videos: videos, fontLoaded: true });
    }   
  }

  _renderView = () => {
    return (
      <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
        <View style={styles.fondo}>
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
            data={this.state.videos}
            renderItem={({item, separators}) => (
              <TouchableOpacity style={styles.button}
                onPress={() => this.props.navigation.navigate('Karaoke', {id: item.video_id})}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={styles.lista}>
                  <Image style={styles.imagen} source={{ uri: URI + item.thumb}}/>
                  <Text style={styles.detalles}>{item.titulo} - {item.autor}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
      </View>
      </ImageBackground>
    )
  }
  
  render() {
    return (
      <View style={styles.container}>
        { this.state.fontLoaded ? (this._renderView()) : (<Text style={styles.cargando}>Cargando...</Text>) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: WIDTH,
  },
  cargando: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 28, 
    marginHorizontal: 5, 
    textAlign: 'center'
  },
  titulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    width: WIDTH,
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#8CA853',
    borderBottomWidth: 1,
    //borderColor: '#8CA853',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 5
  },
  imagen: {
    width: 40,
    height: 40
  },
  detalles: {
  flex: 1,
  color: 'white', 
  fontFamily: 'berlin3',
  fontSize: 18, 
  marginHorizontal: 5, 
  textAlign: 'auto'
}
});
