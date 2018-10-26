import React from 'react';
import { StyleSheet, Text, View, ScrollView, SectionList, Image, Dimensions, ImageBackground} from 'react-native';
import { Font, ScreenOrientation, Constants  } from 'expo';
import { ListItem, Divider, Header } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
function keyExtractor(item) {
  return item.key
}

const renderSectionHeader = ({ section }) =>
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
  </View>

const renderItem = ({ item }) => 
  <View style={styles.sectionItem}>
    <Image style={styles.imagen} source={require('../../resources/images/cultura.png')}/>
    <View>
      <Text style={styles.sectionItemTitle}>{item.title}</Text>
      <Text style={styles.sectionItemDate}>{item.date}</Text>
    </View>
  </View>

export default class Agenda extends React.Component {

  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });
    
  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderView = () => {
    return (
      <ImageBackground source={require('../../resources/images/fondo3.jpg')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
        <SectionList
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          sections={SECTIONS}
          style={styles.list}
        />
      </ImageBackground>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (this._renderView()) : (<Text style={styles.sectionItemTitle}>Cargando...</Text>)}
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
  list: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: Dimensions.get('window').width,
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#5a8d3b',
  },
  sectionTitle: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    opacity: 0.8,
  },
  sectionItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  },
  sectionItemTitle: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 14,
    margin: 4,
  },
  sectionItemDate: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 12,
    margin: 4,
  },
  imagen: {
    width: 40,
    height: 40,
    margin: 4,
  }
});

const SECTIONS = [
  {
    data: [
      {
        title: '2da Feria del Libro', date: '5 al 12 de Julio', key: 0,
      },
      {
        title: 'El Orden Frente al Caos', date: '8 al 15 de Julio', key: 1,
      },
      {
        title: '2da Feria del Libro', date: '5 al 12 de Julio', key: 2,
      },
      {
        title: 'El Orden Frente al Caos', date: '8 al 15 de Julio', key: 3,
      },
    ],
    title: 'Julio',
  },
  {
    data: [
      {
        title: 'Feria Itinerante del Libro', date: '1 al 3 de Agosto', key: 4,
      },
      {
        title: 'Orquesta Sinfónica de Corrientes', date: '5 al 12 de Agosto', key: 5,
      },
      {
        title: 'Encuentro Internacional de Escultores', date: '15 al 22 de Agosto', key: 6,
      },
    ],
    title: 'Agosto',
  },
  {
    data: [
      {
        title: 'Feria Itinerante del Libro', date: '1 al 3 de Septiembre', key: 7,
      },
      {
        title: 'Orquesta Sinfónica de Corrientes', date: '5 al 12 de Septiembre', key: 8,
      },
      {
        title: 'Encuentro Internacional de Escultores', date: '15 al 22 de Septiembre', key: 9,
      },
    ],
    title: 'Septiembre',
  },
  {
    data: [
      {
        title: '2da Feria del Libro', date: '5 al 12 de Octubre', key: 10,
      },
      {
        title: 'El Orden Frente al Caos', date: '8 al 15 de Octubre', key: 11,
      },
      {
        title: '2da Feria del Libro', date: '5 al 12 de Octubre', key: 12,
      },
      {
        title: 'El Orden Frente al Caos', date: '8 al 15 de Octubre', key: 13,
      },
      {
        title: 'Feria Itinerante del Libro', date: '1 al 3 de Octubre', key: 14,
      },
      {
        title: 'Orquesta Sinfónica de Corrientes', date: '5 al 12 de Octubre', key: 15,
      },
      {
        title: 'Encuentro Internacional de Escultores', date: '15 al 22 de Octubre', key: 16,
      },
    ],
    title: 'Octubre',
  },]