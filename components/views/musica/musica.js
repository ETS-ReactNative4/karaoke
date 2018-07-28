import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, FlatList, Alert, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Canta extends React.Component {

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
              onPress={() => Alert.alert('REPRODUCTOR')}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.lista}>
                <Icon name='play-circle' size={40} color={'#228be6'}/>
                <Text style={styles.texto}>{item.title} - {item.autor}</Text>
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
    paddingTop: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    color: 'black', 
    fontSize: 18, 
    marginHorizontal: 5, 
    textAlign: 'left'
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: '#d1d1d1', 
    marginBottom: 5,
    minHeight: 55,
    alignItems: 'center',
    marginHorizontal: 5
  },
});
