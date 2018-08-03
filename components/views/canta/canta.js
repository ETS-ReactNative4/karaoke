import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, FlatList, Image, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Canta extends React.Component {
  static navigationOptions = {
    headerTitle: 'Cantá'
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 10}}>
        <SearchBar
          clearIcon={{ color: '#d1d1d1', size: 15 }}
          searchIcon={{size: 55}}
          // onChangeText={}
          // onClear={}
          inputStyle={{
            backgroundColor: 'transparent',
            color: 'black'
          }}
          containerStyle={{
            width: Dimensions.get('window').width - 5,
            backgroundColor: 'white', 
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
          data={[{title: 'Kilometro 11', autor: 'Transito Cocomarola', key: 'item1'},
                  {title: 'Oracion del Remanso', autor: 'Amandaye', key: 'item2'},
                  {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item3'},
                  {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item4'},
                  {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item5'},
                  {title: 'Kilometro 11', autor: 'Transito Cocomarola', key: 'item6'},
                  {title: 'Oracion del Remanso', autor: 'Amandaye', key: 'item7'},
                  {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item8'},
                  {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item9'},
                  {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item10'},
                  {title: 'Kilometro 11', autor: 'Transito Cocomarola', key: 'item11'},
                  {title: 'Oracion del Remanso', autor: 'Amandaye', key: 'item12'},
                  {title: 'Estudiante del Interior', autor: 'Mario Bofill', key: 'item13'},
                  {title: 'Neike Chamigo', autor: 'Julian Zini', key: 'item14'},
                  {title: 'Camino a Mburucuya', autor: 'Santiago "Bocha" Sheridan', key: 'item15'}]}
          renderItem={({item, separators}) => (
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Karaoke', {title: item.title, autor: item.autor, key: item.key})}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.lista}>
              <Image style={styles.imagen}
                      source={require('../../resources/images/estudiante.jpg')}/>
                <Text style={styles.detalles}>{item.title} - {item.autor}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        />
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
    marginHorizontal: 10,
    color: 'white',
    fontWeight: 'normal',
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
  fontSize: 18, 
  marginHorizontal: 5, 
  textAlign: 'left'
}
});
