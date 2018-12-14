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
      <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
        <Text style={styles.titulo}>#FNCH2019 Grilla</Text>
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
  titulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
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
    fontSize: 22,
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
    fontSize: 16,
    margin: 4,
  },
  sectionItemDate: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 14,
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
    title: 'Viernes 11 de Enero',
    data: [
      {
        title: 'Ballet Museo Artesanías', key: 0,
      },
      {
        title: 'Melody', key: 1,
      },
      {
        title: 'Los Mellizos Coronel', key: 2,
      },
      {
        title: 'Nuevo Tiempo', date: 'Chaco', key: 3,
      },
    ]
  },
  {
    title: 'Sabado 12 de Enero',
    data: [
      {
        title: 'APERTURA Bendición Padre Julián Zini', date: 'Ingreso de la Virgen', key: 4,
      },
      {
        title: 'Coquimarola y su Conjunto-Centenario de Cocomarola', key: 5,
      },
      {
        title: 'Delegación de Paraguay', key: 6,
      },
    ],
  },
  {
    data: [
      {
        title: 'Blas Martínez Riera Grupo', date: 'Buenos Aires', key: 7,
      },
      {
        title: 'Conjunto Nuevo Horizonte', date: 'Ituzaingó', key: 8,
      },
      {
        title: 'Pre-Fiesta: Solista Vocal Masculino: Rodrigo D. González – SUBSEDE Victoria', date: 'Entre Ríos', key: 9,
      },
    ],
    title: 'Domingo 13 de Enero',
  }
]