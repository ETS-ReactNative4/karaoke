import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert, Dimensions } from 'react-native';
import { Camera, Permissions, FileSystem, Font, Video, Constants, ScreenOrientation } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconm from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window')

export default class Karaoke extends React.Component {

  state = {
    hasCameraPermission: null,
    hasAudioRecordingPermission: null,
    hasCameraRollPermission: null,
    photoId: 0,
    isRecording: true,
    fontLoaded: false,
    shouldPlay: false,
    control: true,
    recording: false,
    processing: false,
    key: "",
    like: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../../assets/fonts/berlin3.ttf'),
    });
    
    this.setState({ fontLoaded: true });

    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
  }

  getKey = function() {
    switch(this.props.navigation.state.params.key) {
      case 'arrebol':
          key = require('../../../resources/videos/arrebol-640.mp4');
          break;
      case 'nangapiri':
      key = require('../../../resources/videos/nangapiri.mp4');
          break;
      case 'yo-que-te-quiero-tanto':
      key = require('../../../resources/videos/yo-que-te-quiero-tanto.mp4');
          break;
      default:
      key = null;
  } 

  return key;
}

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status1 } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.setState({ hasAudioRecordingPermission: status1 === 'granted' });
    this.setState({ hasCameraRollPermission: status2 === 'granted' });
  }

  // ensureFolderExists = function () {
  //   const path = `${FileSystem.documentDirectory}photos`
  //   return FileSystem.getInfoAsync(path).then(({exists}) => {
  //     if (!exists) {
  //       Alert.alert(path);
  //       return FileSystem.makeDirectoryAsync(path)
  //     } else {
  //       Alert.alert(path);
  //       return Promise.resolve(true)
  //     }
  //   })
  // }

  // async componentDidMount() {
  //   try {
  //     await FileSystem.makeDirectoryAsync(
  //       `${FileSystem.documentDirectory}photos`,
  //       {
  //         intermediates: true,
  //       }
  //     )
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  async startRecording() {
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const { uri, codec = "mp4" } = await this.camera.recordAsync();
    this.setState({ recording: false, processing: true });
    const type = `video/${codec}`;

    const data = new FormData();
    data.append("video", {
      name: "mobile-video-upload",
      type,
      uri
    });

    try {
      await fetch(ENDPOINT, {
        method: "post",
        body: data
      });
    } catch (e) {
      console.error(e);
    }
  
    this.setState({ processing: false });
  }

  stopRecording = function() {
    this.setState({ isRecording: true });
    this.setState({ shouldPlay: false });
    //this.camera.stopRecording();
    //Alert.alert('stop');
    Vibration.vibrate();
  }

  playRecording = function() {
    this.setState({ isRecording: false });
    this.setState({ shouldPlay: true });
    Vibration.vibrate();
  }

  // takePicture = () => {
    
  //   if (this.camera) {
  //     this.setState({ isRecording: false});
  //     Vibration.vibrate();  
  //     this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
  //   }
  // };

  // onPictureSaved = async photo => {
  //   await FileSystem.moveAsync({
  //     from: photo.uri,
  //     to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
  //   });
  //   //this.setState({ newPhotos: true });
    
  // };

//   takePicture = () => {
    
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       this.ensureFolderExists().then(() => {
//         this.camera.takePictureAsync(options).then(data => {
//           FileSystem.moveAsync({
//             from: data.uri,
//             to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
//           }).then(() => {
//             this.setState({
//               photoId: this.state.photoId + 1,
//             });
//             this.setState({ isRecording: false});
//             Vibration.vibrate();
//           }).catch((e) => {
//             console.log(e, 'ERROR');
//           });
//       })
//       .catch((e) => {
//         console.log(e, 'takePicture ERROR');
//       });
//       })
        
//   }
// }
  
//   recordVideo = async () => {
//     if ( !this.camera ) return;
//     try {
//         const data = await this.camera.recordAsync({ });
//         console.log( data);
//     } catch ( error) {
//         throw error;
//     }
// }

  // record = async function() {
  //   if (this.camera) {
  //     const options = { quality: '480p' };
  //     const data = await this.camera.recordAsync()
  //     console.log(data.uri);
  //   }
  // };

  //Render view LANDSCAPE
  _renderViewL = () => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.topL}>
              <Text style={styles.tituloL}>{this.props.navigation.state.params.title} - </Text>
              <Text style={styles.subTituloL}>{this.props.navigation.state.params.autor}</Text>
        </View>
        <View style={styles.centerL}>
          <View style={styles.cameraL}>
            <Camera ref={ref => {this.camera = ref;}} style={{ flex: 1}} type={'front'}>
              
            </Camera>
          </View>
          <View style={styles.videoL}>
            <Video
                
                //source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                //source={require('../../../resources/videos/kilometro11.mp4')}
                source={this.getKey()}
                ref={(ref) => {
                  this.player = ref;
                }}
                rate={1.0}
                shouldPlay={this.state.shouldPlay}
                resizeMode="stretch"
                useNativeControls={this.state.control}
                //style={{ width: 255, height: 352, alignSelf: 'center'}}
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
            {this.state.isRecording ?
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


  //Render view PORTRAIT
  _renderViewP = () => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.top}>
              <Text style={styles.titulo}>{this.props.navigation.state.params.title}</Text>
              <Text style={styles.subTitulo}>{this.props.navigation.state.params.autor}</Text>
        </View>
        <View style={styles.center}>
          <View style={styles.camera}>
            <Camera ref={ref => {this.camera = ref;}} style={{ flex: 1}} type={'front'}>
              
            </Camera>
          </View>
          <View style={styles.video}>
            <Video
                //source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                //source={require('../../../resources/videos/kilometro11.mp4')}
                source={this.getKey()}
                ref={(ref) => {
                  this.player = ref;
                }}
                rate={1.0}
                shouldPlay={this.state.shouldPlay}
                resizeMode="stretch"
                //useNativeControls={this.state.control}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width / 1.4, alignSelf: 'center'}}
            />
            </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <Iconm name="share-variant" style={styles.icono} size={30}/>
            <Iconm name="heart-outline" style={styles.icono} size={30}/>
          </View>
          <View style={styles.bottomRight}>
            {this.state.isRecording ?
                  (
                  <IconMat name="play-circle-outline" size={50} color={'white'} marginVertical={50}
                    onPress={this.playRecording.bind(this)} />
                  ) :
                  (
                    <IconMat name="pause-circle-outline" size={50} color={'white'} marginLeft={100}
                    onPress={this.stopRecording.bind(this)} />
                  )
                }
          </View>
        </View>
      </View>
    )
  }

  render() {
    //const params = this.state.params;
    const { hasCameraPermission } = this.state;
    const { hasAudioRecordingPermission } = this.state;
    if (hasCameraPermission === null || hasAudioRecordingPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false || hasAudioRecordingPermission === null) {
      return <Text>La cámara no posee permisos para activarse</Text>;
    } else {
      return (
        <View style={styles.container}> 
          {this.state.fontLoaded ? (this._renderViewL()) : null}
        </View>
      );
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
  top: {
    flex: 1,
    backgroundColor: '#6ABB3A'
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
    backgroundColor: '#6ABB3A',
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
    backgroundColor: '#6ABB3A',
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
    backgroundColor: '#6ABB3A',
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