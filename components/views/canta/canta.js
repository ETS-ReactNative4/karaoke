import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, ScreenOrientation } from 'expo';
import ajax from '../../services/fetchVideo';

const URI = 'http://192.168.0.101';

export default class Canta extends React.Component {
  
  state = {
    fontLoaded: false,
    mounted: true,
    videos: null,
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
      this.setState({ videos, fontLoaded: true });
    }   
  }

  _renderView = () => {
    return (
      <View style={styles.container}>
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
            data={this.state.videos}
            renderItem={({item, separators}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Karaoke', {id: item.video_id})}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={styles.lista}>
                <Image style={styles.imagen}
                        source={{ uri: URI + item.thumb}}/>
                  <Text style={styles.detalles}>{item.titulo} - {item.autor}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
      </View>
    )
  }
  
  render() {
    // return (
    //   <View style={styles.container}>
    //     {this.state.fontLoaded ? (this._renderView()) : null}
    //   </View>
    // );
    if(!this.state.fontLoaded) {
    return ( <View style={styles.container}><Text style={styles.detalles}>Cargando...</Text></View> );
    } else {
    return this._renderView();
    }
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
    fontFamily: 'berlin3',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 25,
    textAlign: 'justify',
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6ABB3A',
    borderWidth: 1,
    borderColor: '#6ABB3A',
    borderBottomColor: 'white', 
    marginBottom: 5,
    minHeight: 55,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  imagen: {
    width: 40,
    height: 40
  },
  detalles: {
  color: 'white', 
  fontFamily: 'berlin3',
  fontSize: 18, 
  marginHorizontal: 5, 
  textAlign: 'left'
}
});
