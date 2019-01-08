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

    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
    
    await Font.loadAsync({
        'berlin3': require('../../assets/fonts/berlin3.ttf'),
    });    

    const video = await ajax.fetchVideo(this.props.navigation.state.params.id);
                                        
    this.setState({ shouldPlay: true, fontLoaded: true, video: video });

  }

  async componentWillMount() {

    this.blurSuscription =
      this.props.navigation.addListener('willBlur', () => {
          if (!this.player.state.shouldPlay) {
            this.player.stopAsync();
            this.props.navigation.pop();
          }
      });

  }

  async componentWillUnmount() {
    
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

    this.blurSuscription.remove();
  }
  
  _renderView = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.titulo}>{this.state.video.titulo} - {this.state.video.autor}</Text>
            <View style={{ flex: 7 }}>
              <Video
                  ref={(ref) => {
                    this.player = ref
                  }}
                  source={{ uri: URL + this.state.video.url }}
                  rate={1.0}
                  volume={1}
                  shouldPlay={this.state.shouldPlay}
                  resizeMode="contain"
                  useNativeControls={true}
                  style={{ width: HEIGHT / 2, height: WIDTH * 0.7, margin: 5, alignSelf: 'center'}}
              />
            </View>
            <View style={{ flex: 2 }}>
              
            </View>
        </View>
    )
  }

  render() {
      return (
        <View style={styles.container}>
        <ImageBackground source={require('../../resources/images/fondo.png')} style={{flex: 1, width: HEIGHT, margin: 0, paddingTop: Constants.statusBarHeight, alignItems: 'center',
    justifyContent:'center',}} >
        <View style={styles.fondo}>
          { this.state.fontLoaded ? (this._renderView()) : (<ActivityIndicator size="large" color="#ffff" />) }
        </View>
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
    backgroundColor: 'transparent',
    alignContent: 'center',
    width: HEIGHT,
    height: WIDTH
  },
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    width: HEIGHT,
    height: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  titulo: {
    flex: 1,
    color: 'white',
    fontFamily: 'berlin3',
    fontSize: 22,
    textAlign: 'center',
    margin: 5,
  }
});