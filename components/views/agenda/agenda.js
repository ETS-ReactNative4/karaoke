import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, ImageBackground, Alert, TouchableOpacity, WebView} from 'react-native';
import { Font, ScreenOrientation, Constants  } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { SlideAnimation, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import { ListItem, Divider, Header } from 'react-native-elements';
import ajax from '../../services/fetchGrilla';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;

export default class Agenda extends React.Component {

  state = {
    fontLoaded: false,
    visible: false,
    grilla: []
  }

  setVisible = () => {
    this.setState({visible: true});
  }

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });

    const grilla = await ajax.fetchGrilla();
    this.setState({ grilla, fontLoaded: true });
    
  }

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  _renderItem = ({item, section}) => 
    (<View style={styles.sectionItem}>
    <TouchableOpacity 
      onPress={() => {
        this.setState({ visible: true});
      }} >
      <View style={styles.lista}>
        <Icon name='check-square' size={40} color={'white'}/>
        <Text style={styles.sectionItemTitle}>{`${item.titulo}(${section.fecha})`}</Text>
      </View>
        </TouchableOpacity>
    </View>)

  _renderSectionHeader = ({section}) => {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.header}>{section.fecha}</Text>
        </View>
      )
  }

  _renderView = () => {
    return (
      <View style={styles.fondo}>
        <Text style={styles.titulo}>#FNCH2019 Grilla</Text>
        <View style={{ flex: 9, width: WIDTH}}>
          <WebView
              style={{ backgroundColor: 'transparent'}}
              javaScriptEnabled={true}
              source={{uri: 'http://dustingassmann.ddns.net/public/'}}
          />
          </View>
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          dialogTitle={<DialogTitle title="Vota un tema!" />}
        >
          <DialogContent>
            <View>
            <TouchableOpacity onPress={() => {
              Alert.alert('Tu voto fué registrado!!');
            }}>
              <Text style={styles.titulo1} >Viejo Caa Cati</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert('Tu voto fué registrado!!');
            }}>
                <Text style={styles.titulo1} >Nostalgia Chaqueña</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
               Alert.alert('Tu voto fué registrado!!');
            }}>
                <Text style={styles.titulo1} >Pagos del Litoral</Text>
            </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
        {this.state.fontLoaded ? (this._renderView()) : (<ActivityIndicator size="large" color="#ffff" />)}
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#133101'
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: WIDTH,
  },
  titulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  titulo1: {
    color: 'black',
    fontFamily: 'berlin3',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
  },
  lista: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    minHeight: 55,
    marginHorizontal: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.50)',
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
  cargando: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 16,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
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
        title: 'Santiago "Bocha" Sheridan', key: 0,
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
    ],
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