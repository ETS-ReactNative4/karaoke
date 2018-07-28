import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Karaoke extends React.Component {
  
  state = {
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };
  
  recordVideo = async () => {
    if ( !this.camera ) return;
    try {
        const data = await this.camera.recordAsync({ });
        console.log( data);
    } catch ( error) {
        throw error;
    }
}

  record = async function() {
    if (this.camera) {
      const options = { quality: '480p' };
      const data = await this.camera.recordAsync()
      console.log(data.uri);
    }
  };

  render() {
    //const params = this.state.params;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>La cára no posee permisos para activarse</Text>;
    } else {
      return (
        
        <View style={styles.container}>

          <View style={styles.top}>
          <Text style={styles.titulo}>{this.props.navigation.state.params.title} - {this.props.navigation.state.params.autor}</Text>
          </View>

          <View style={styles.center}>
            <Camera style={{ flex: 1}} type={'front'}>
              <View style={styles.camera}>
                <TouchableOpacity style={styles.capture}
                  onPress={this.recordVideo.bind(this)} >
                  <Text style={styles.btnText}> COMENZAR </Text>
                </TouchableOpacity>
              </View>
            </Camera>
            <View style={styles.video}>
              <Text>VIDEO</Text>
            </View>
          </View>

          <View style={styles.bottom}>
            <Text></Text>
          </View>

        </View>
        
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1, 
    backgroundColor: 'white'
  },
  center: { 
    flex: 7, 
    flexDirection: 'row'
  },
  camera: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titulo: {
    flex: 2,
    color: '#3399ff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  texto: {
    flex: 3,
    marginHorizontal: 10,
    color: 'gray',
    fontWeight: 'normal',
    fontSize: 25,
    textAlign: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 25,
    alignSelf: 'flex-end',
    margin: 5
  },
  video: { 
    flex: 1, 
    backgroundColor: 'gray'
  },
  btnText: {
    fontSize: 14,
    color: 'gold'
  },
  bottom: { 
    flex: 1, 
    backgroundColor: 'white'
  }
});
