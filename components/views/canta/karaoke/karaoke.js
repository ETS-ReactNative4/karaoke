import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert, Dimensions, BackHandler, CameraRoll } from 'react-native';
import { Camera, Permissions, FileSystem, Font, Video, Constants, ScreenOrientation } from 'expo';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import ajax from '../../../services/fetchVideo';
import URL from '../../../config';

const { width, height } = Dimensions.get('window');
const QUALITY = '4:3';

export default class Karaoke extends React.Component {
  state = {
    hasCameraPermission: null,
    hasAudioRecordingPermission: null,
    hasCameraRollPermission: null,
    photoId: 0,
    isRecording: false,
    fontLoaded: false,
    shouldPlay: false,
    cameraReady: false,
    fileUrl: null,
    control: true,
    recording: false,
    processing: false,
    key: "",
    like: false,
    video: [],
  };

  async componentDidMount() {

    await Font.loadAsync({
      'berlin3': require('../../../assets/fonts/berlin3.ttf'),
    });    
    this.setState({ fontLoaded: true });

    //Habilito boton fisico atras
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(); // works best when the goBack is async
    });

    const existe = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}videos/`);
    console.log(existe);

    if(!existe) {
      try {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos/`,
        //await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'videos/',
          {
            intermediates: true,
          }
        )
      } catch (e) {
        console.log(e)
      }
    }

    const video = await ajax.fetchVideo(this.props.navigation.state.params.id);
      this.setState({ video: video });
  }

  _onPlaybackStatusUpdate = status => {
      if (status.didJustFinish) {
        this.camera.stopRecording()
      }
  };

  async componentWillMount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status1 } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    
    this.setState({ hasCameraPermission: status === 'granted' });
    this.setState({ hasAudioRecordingPermission: status1 === 'granted' });
    this.setState({ hasCameraRollPermission: status2 === 'granted' });

    this.setState({ cameraReady: true });
  }

  async componentWillUnmount() {
    await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    this.backHandler.remove();

    await this.setState({ isRecording: false });
    await this.setState({ shouldPlay: false });
  }

 startRecording = async () => {
      if (this.camera) {
        Vibration.vibrate();
        const data = await this.camera.recordAsync({ quality: QUALITY });
        console.log( data.uri );
        const path = `${FileSystem.documentDirectory}videos/${this.state.video.id + '-' + Date.now()}.mp4`;
        console.log( path );

        this.setState({ isRecording: false });
        this.setState({ shouldPlay: false });
        Vibration.vibrate();

        async data => {
          await FileSystem.copyAsync({
            from: data.uri,
            //to: `${FileSystem.documentDirectory}${this.state.video.id}.mp4`,
            to: `${FileSystem.documentDirectory}videos/${this.state.video.id + '-' + Date.now()}.mp4`,
          });
        }
      
      //Guardar en la galeria del teléfono
      CameraRoll.saveToCameraRoll(data.uri);
          
      console.log( data.uri );
      console.log( `${FileSystem.documentDirectory}videos/${this.state.video.id + '-' + Date.now()}.mp4` );
    }
};

    //this.setState({ fileUrl: uri });    
    //this.setState({ recording: false, processing: true, shouldPlay: false });
    //const type = `video/${codec}`;
    // const type = "video/mp4";

    // const data = new FormData();
    // data.append("video", {
    //   name: "mobile-video-upload",
    //   type,
    //   fileUrl
    // });

    // try {
    //   await fetch(ENDPOINT, {
    //     method: "post",
    //     body: data
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
  
    //this.setState({ processing: false });
  //}

  stopRecording = function() {
    this.setState({ isRecording: false });
    this.setState({ shouldPlay: false });
    this.camera.stopRecording();
    Vibration.vibrate();
  }

  playRecording = function() {
    this.setState({ isRecording: true });
    this.setState({ shouldPlay: true });
    this.startRecording();
  }

  //Render view LANDSCAPE
  _renderViewL = () => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.topL}>
              <Text style={styles.tituloL}>{this.state.video.titulo} - </Text>
              <Text style={styles.subTituloL}>{this.state.video.autor}</Text>
        </View>
        <View style={styles.centerL}>
          <View style={styles.cameraL}>
            <Camera ref={ref => {this.camera = ref;}} 
                style={{ flex: 1}} type={'front'}>
            </Camera>
          </View>
          <View style={styles.videoL}>
            <Video
                source={{uri: URL + this.state.video.url}}
                ref={(ref) => {
                  this.player = ref;
                }}
                rate={1.0}
                volume={0.3}
                shouldPlay={this.state.shouldPlay}
                onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                resizeMode="stretch"
                useNativeControls={this.state.control}
                style={{ width: height / 2, height: width * 0.8, alignSelf: 'center'}}
            />
            </View>
        </View>
        <View style={styles.bottomL}>
          <View style={styles.bottomLeftL}>
            <Iconm name="share-variant" style={styles.iconoL} size={20}/>
            <Iconm name="heart-outline" style={styles.iconoL} size={20}/>
          </View>
          <View style={styles.bottomRightL}>
            {!this.state.isRecording ?
                  (
                  <IconMat name="play-circle-outline" size={30} color={'white'}
                    onPress={this.playRecording.bind(this)} />
                  ) :
                  (
                    <IconMat name="pause-circle-outline" size={30} color={'white'}
                    onPress={this.stopRecording.bind(this)} />
                  )
                }
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { hasAudioRecordingPermission } = this.state;
    if (hasCameraPermission === null || hasAudioRecordingPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false || hasAudioRecordingPermission === null) {
      return <Text>La cámara no posee permisos para activarse</Text>;
    } else {
      return (
        <View style={styles.container}> 
          {this.state.fontLoaded ? (this._renderViewL()) : (<Text style={styles.titulo}>Cargando...</Text>)}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#8CA853',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    backgroundColor: '#8CA853'
  },
  center: { 
    flex: 8,
  },
  camera: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  video: {
    flex: 5,
    backgroundColor: 'black',
    alignContent: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 3,
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8CA853',
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
    flex: 5,
    paddingTop: 10,
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
    width: height,
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
    fontSize: 22,
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
    marginLeft: 30,
    marginTop: 4,
    textAlign: 'center',
    color: 'white', 
  },
  bottomRightL: {
    flex: 6,
    paddingTop: 2,
    marginLeft: 100,
  }
});