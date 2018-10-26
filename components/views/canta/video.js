import React from 'react';
import { StyleSheet, Text, View, Vibration, Dimensions, BackHandler, ImageBackground } from 'react-native';
import { Font, Video, Constants } from 'expo';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat from 'react-native-vector-icons/MaterialIcons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class VideoKar extends React.Component {
  state = {
    fontLoaded: false,
    shouldPlay: false,
    control: true,
    key: "",
    like: false,
  };

  async componentDidMount() {

    await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });    
    this.setState({ fontLoaded: true });

    //Habilito boton fisico atras
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
    });

    // const video = await ajax.fetchVideo(this.props.navigation.state.params.id);
    //   this.setState({ video: video });
  }

//   _onPlaybackStatusUpdate = status => {
//       if (status.didJustFinish) {
//         this.camera.stopRecording()
//       }
//   };

  async componentWillMount() {
    //await ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
  }

  async componentWillUnmount() {
    //await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    //this.backHandler.remove();
    await this.setState({ shouldPlay: false });
  }

 
  stopRecording = function() {
    Vibration.vibrate();
    this.setState({ shouldPlay: false });
  }

  playRecording = function() {
    Vibration.vibrate();
    this.setState({ shouldPlay: true });
  }

  //Render view LANDSCAPE
  _renderViewL = () => {
    return (
        <ImageBackground source={require('../../resources/images/fondo3.jpg')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
          <View style={styles.top}>
              {/* <Text style={styles.tituloL}>{this.state.video.titulo} - </Text>
              <Text style={styles.subTituloL}>{this.state.video.autor}</Text> */}
              <Text style={styles.tituloL}>Arrebol - Dustin Gassmann</Text>
        </View>
        {/* <View style={styles.center}> */}
          <View style={styles.video}>
            <Video
                //source={{uri: URL + this.state.video.url}}
                source={require('../../resources/videos/arrebol-dustin.mp4')}
                ref={(ref) => {
                  this.player = ref;
                }}
                rate={1.0}
                volume={1}
                shouldPlay={this.state.shouldPlay}
                onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                resizeMode="stretch"
                useNativeControls={this.state.control}
                //style={{ width: height / 2, height: width * 0.8, alignSelf: 'center'}}
                style={{ width: 400, height: 300, alignSelf: 'center'}}
            />
            </View>
        {/* </View> */}
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Iconm name="share-variant" style={styles.iconoL} size={35}/>
            <Iconm name="heart-outline" style={styles.iconoL} size={35}/>
          </View>
          <View style={styles.bottomRight}>
            {!this.state.shouldPlay ?
                  (
                  <IconMat name="play-circle-outline" size={60} color={'white'}
                    onPress={this.playRecording.bind(this)} />
                  ) :
                  (
                    <IconMat name="pause-circle-outline" size={60} color={'white'}
                    onPress={this.stopRecording.bind(this)} />
                  )
                }
          </View>
        </View>
        </ImageBackground>
    )
  }

  render() {
      return (
        <View style={styles.container}> 
          {this.state.fontLoaded ? (this._renderViewL()) : (<Text style={styles.cargando}>Cargando...</Text>)}
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
  cargando: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    color: 'white', 
    fontFamily: 'berlin3',
    fontSize: 28, 
    marginHorizontal: 5, 
    textAlign: 'center'
  },
  top: {
    flex: 2,
    width: WIDTH,
  },
  center: { 
    flex: 5,
    width: WIDTH,
  },
  video: {
    flex: 5,
    width: WIDTH,
    backgroundColor: 'transparent',
    alignContent: 'center',
    //borderTopColor: 'gray',
    //borderTopWidth: 3,
  },
  titulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 2,
  },
  subTitulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 20,
    textAlign: 'center',
  },
  texto: {
    color: 'gray',
    fontFamily: 'berlin3',
    fontSize: 25,
    textAlign: 'center',
  },
  capture: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'berlin3',
    textAlign: 'center',
    color: 'gold'
  },
  bottom: { 
    flex: 3,
    flexDirection: 'row',
  },
  bottomLeft: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icono: {
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center',
    color: 'white', 
  },
  bottomRight: {
    flex: 6,
    paddingTop: 0,
    alignItems: 'flex-start',
  }, //Styles to LANDSCAPE
  topL: {
    //flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#6f6f6f',
    backgroundColor: '#8CA853',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerL: { 
    flex: 1,
    flexDirection: 'row',
    width: WIDTH,
  },
  cameraL: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  videoL: {
    flex: 5,
    backgroundColor: 'black',
  },
  tituloL: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 24,
    margin: 10,
    textAlign: 'center',
  },
  subTituloL: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 22,
  },
  textoL: {
    color: 'gray',
    fontFamily: 'berlin3',
    fontSize: 25,
    textAlign: 'center',
  },
  captureL: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  btnTextL: {
    fontSize: 14,
    fontFamily: 'berlin3',
    textAlign: 'center',
    color: 'gold'
  },
  bottomL: { 
    //flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#6f6f6f',
    backgroundColor: '#8CA853',
  },
  bottomLeftL: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconoL: {
    marginLeft: 10,
    marginTop: 0,
    //textAlign: 'center',
    color: 'white', 
  },
  bottomRightL: {
    flex: 6,
    paddingTop: 2,
    marginLeft: 100,
  }
});