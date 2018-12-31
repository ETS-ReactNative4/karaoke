import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { Font, Video, Constants, ScreenOrientation } from 'expo';
import ajax from '../../services/fetchVideo';
import URL from '../../config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class VideoKaraoke extends React.Component {
  state = {
    fontLoaded: false,
    shouldPlay: false,
    video: [],
  };

  async componentDidMount() {

    await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });    

    const video = await ajax.fetchVideo(this.props.navigation.state.params.id);
                                        
    this.setState({ shouldPlay: true, fontLoaded: true, video: video });

    
  }

  async componentWillMount() {

    await ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
  }

  componentWillUnmount() {
    
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }


  //Render view LANDSCAPE
  _renderViewL = () => {
    return (
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: WIDTH, margin: 0, paddingTop: Constants.statusBarHeight}} >
        <View style={styles.fondo}>
            <Text style={styles.titulo}>{this.state.video.titulo} - {this.state.video.autor}</Text>
            <Video
                source={{ uri: URL + this.state.video.url }}
                rate={1.0}
                volume={1}
                shouldPlay={this.state.shouldPlay}
                resizeMode="contain"
                useNativeControls={true}
                style={{ width: WIDTH, minHeight: 200, alignSelf: 'center' }}
            />
        </View>
        </ImageBackground>
    )
  }

  render() {
      return (
        <View style={styles.container}> 
          {this.state.fontLoaded ? (this._renderViewL()) : (<ActivityIndicator size="large" color="#ffff" />)}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  titulo: {
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  }
});