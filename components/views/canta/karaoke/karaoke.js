import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert, Dimensions } from 'react-native';
import { Camera, Permissions, FileSystem, Font, Constants } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Karaoke extends React.Component {
  
  state = {
    hasCameraPermission: null,
    hasAudioRecordingPermission: null,
    hasCameraRollPermission: null,
    photoId: 0,
    isRecording: true,
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'berlin3': require('../../../assets/fonts/berlin3.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status1 } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.setState({ hasAudioRecordingPermission: status1 === 'granted' });
    this.setState({ hasCameraRollPermission: status2 === 'granted' });
  }

  ensureFolderExists = function () {
    const path = `${FileSystem.documentDirectory}photos`
    return FileSystem.getInfoAsync(path).then(({exists}) => {
      if (!exists) {
        Alert.alert(path);
        return FileSystem.makeDirectoryAsync(path)
      } else {
        Alert.alert(path);
        return Promise.resolve(true)
      }
    })
  }

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

  stopRecording = function() {
    this.setState({ isRecording: true});
    //Alert.alert('stop');
    Vibration.vibrate();
  }

  playRecording = function() {
    this.setState({ isRecording: false });
    Vibration.vibrate();
  }

  // takePicture = () => {
    
  //   if (this.camera) {
  //     this.setState({ isRecording: false});
  //     Vibration.vibrate();  
  //     this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
  //   }
  // };

  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
    });
    //this.setState({ newPhotos: true });
    
  };

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

  _renderView = () => {
    return (
      <View style={{flex: 1, width: Dimensions.get('window').width}}>
        <View style={styles.top}>
              <Text style={styles.titulo}>{this.props.navigation.state.params.title}</Text>
              <Text style={styles.subTitulo}>{this.props.navigation.state.params.autor}</Text>
        </View>
        <View style={styles.center}>
        <View style={styles.camera}>
          <Camera ref={ref => {this.camera = ref;}} style={{ flex: 1}} type={'front'}>
            {this.state.isRecording ?
              (
              <TouchableOpacity style={styles.capture}
                onPress={this.playRecording.bind(this)} >
                <Text style={styles.btnText}> COMENZAR </Text>
              </TouchableOpacity>
              ) :
              (
                <TouchableOpacity style={styles.capture}
                onPress={this.stopRecording.bind(this)} >
                <Text style={styles.btnText}> PARAR </Text>
              </TouchableOpacity>
              )
            }
          </Camera>
          </View>
          <View style={styles.video}>
            <Text>VIDEO</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text></Text>
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

          {this.state.fontLoaded ? (this._renderView()) : null}

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
    flex: 3, 
    backgroundColor: '#6ABB3A'
  },
  center: { 
    flex: 5, 
    flexDirection: 'row'
  },
  camera: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  titulo: {
    //flex: 1,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 28,
    textAlign: 'center',
  },
  subTitulo: {
    //flex: 1,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 22,
    textAlign: 'center',
  },
  texto: {
    flex: 3,
    marginHorizontal: 10,
    color: 'gray',
    fontFamily: 'berlin3',
    fontSize: 25,
    textAlign: 'center',
  },
  capture: {
    backgroundColor: 'transparent',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 280
  },
  video: { 
    flex: 1, 
    backgroundColor: 'gray'
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'berlin3',
    textAlign: 'center',
    color: 'gold'
  },
  bottom: { 
    flex: 2, 
    backgroundColor: '#6ABB3A'
  }
});