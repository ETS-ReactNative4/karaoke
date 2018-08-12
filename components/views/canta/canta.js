import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font, ScreenOrientation } from 'expo';

export default class Canta extends React.Component {
  
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    
    this.setState({ fontLoaded: true });    
  }

  // async componentWillUnmount() {
  //   ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  // }

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
            // ItemSeparatorComponent={(
            //   <View style={[style.separator, highlighted && {marginLeft: 0}]} />
            // )}
            data={[{title: 'Arrebol', autor: 'Félix Chávez y Mateo Villalba', key: 'arrebol'},
                    {title: 'Ñangapiri', autor: 'Amandayé', key: 'nangapiri'},
                    {title: 'Yo Que Te Quiero Tanto', autor: 'Mario Bofill', key: 'yo-que-te-quiero-tanto'},
                    {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item4'},
                    {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item5'},
                    {title: 'Kilómetro 11', autor: 'Tránsito Cocomarola', key: 'item6'},
                    {title: 'Oración del Remanso', autor: 'Amandayé', key: 'item7'},
                    {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item8'},
                    {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item9'},
                    {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item10'},
                    {title: 'Kilómetro 11', autor: 'Tránsito Cocomarola', key: 'item11'},
                    {title: 'Oración del Remanso', autor: 'Amandayé', key: 'item12'},
                    {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item13'},
                    {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item14'},
                    {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item15'}]}
            renderItem={({item, separators}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Karaoke', {title: item.title, autor: item.autor, key: item.key})}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={styles.lista}>
                <Image style={styles.imagen}
                        source={require('../../resources/images/estudiante.jpg')}/>
                  <Text style={styles.detalles}>{item.title} - {item.autor}</Text>
                </View>
              </TouchableOpacity>
            )}
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
    return ( <View style={styles.container}><Text>'Cargando..'</Text></View> );
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
