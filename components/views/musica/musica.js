import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Dimensions } from 'react-native';
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

    this.setState({ fontLoaded: true });

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
          // ItemSeparatorComponent={(
          //   <View style={[style.separator, highlighted && {marginLeft: 0}]} />
          // )}
          data={[{title: 'Kilómetro 11', autor: 'Tránsito Cocomarola', key: 'item1'},
                  {title: 'Oración del Remanso', autor: 'Amandaye', key: 'item2'},
                  {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item3'},
                  {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item4'},
                  {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item5'},
                  {title: 'Kilómetro 11', autor: 'Tránsito Cocomarola', key: 'item6'},
                  {title: 'Oración del Remanso', autor: 'Amandaye', key: 'item7'},
                  {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item8'},
                  {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item9'},
                  {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item10'},
                  {title: 'Kilómetro 11', autor: 'Tránsito Cocomarola', key: 'item11'},
                  {title: 'Oración del Remanso', autor: 'Amandaye', key: 'item12'},
                  {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item13'},
                  {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item14'},
                  {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item15'}]}
          renderItem={({item, separators}) => (
            <TouchableOpacity
              onPress={() => Alert.alert('REPRODUCTOR')}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.lista}>
                <Icon name='play-circle' size={40} color={'white'}/>
                <Text style={styles.texto}>{item.title} - {item.autor}</Text>
              </View>
            </TouchableOpacity>
          )}
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
