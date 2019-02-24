import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Inicio from '../views/inicio/inicio';
import Karaoke from '../views/karaoke/karaoke';
import VideoKaraoke from '../views/karaoke/video';
import Documentales from '../views/documentales/documentales';
import Biblioteca from '../views/biblioteca/biblioteca';
import Radio from '../views/radio/radio';
import Fiesta from '../views/festival/fiesta';
import Festival from '../views/festival/festival';
import Vivo from '../views/festival/vivo';
import Agenda from '../views/agenda/agenda';
import Musica from '../views/musica/musica';
import Player from '../views/musica/Player';
import Lista from '../views/musica/lista';
import Chamiguito from '../views/juego/juego';

const MusicaStack = createStackNavigator({
  Lista: {screen: Lista},
  Player: {screen: Player}
},{
  headerMode: 'none',
});

const BiblioStack = createStackNavigator({
  Biblioteca: {screen: Biblioteca},
  Musica: {screen: MusicaStack},
  Documentales: {screen: Documentales},
  Radio: {screen: Radio}
},{
  headerMode: 'none',
});

const InicioStack = createStackNavigator({
  Inicio: {screen: Inicio}
},{
  headerMode: 'none',
});

const FestivalStack = createStackNavigator({
  Fiesta: {screen: Fiesta},
  Festival: {screen: Festival},
  Agenda: {screen: Agenda},
  Vivo: {screen: Vivo}
},{
  headerMode: 'none',
});

const KaraokeStack = createStackNavigator({
  Karaoke: {screen: Karaoke},
  Video: {screen: VideoKaraoke}
},{
  headerMode: 'none',
});

const JuegoStack = createStackNavigator({
  Chamiguito: {screen: Chamiguito}
},{
  headerMode: 'none',
});

const tabBarBottom = createBottomTabNavigator(
  {
    Inicio: InicioStack,
    Karaoke: KaraokeStack,
    Biblioteca: BiblioStack,
    Fiesta: FestivalStack,
    Chamiguito: JuegoStack
  },
  {
    initialRouteName: 'Inicio',
    navigationOptions: ({ navigation }) => ({
      
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Inicio') {
          iconName = 'home';
        } else if (routeName === 'Karaoke') {
          iconName = 'videocam';
        } else if (routeName === 'Biblioteca') {
          iconName = 'library-music';
        } else if (routeName === 'Fiesta') {
          iconName = 'event-note';
        } else if (routeName === 'Chamiguito') {
          iconName = 'gamepad';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={'white'}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#8CA853',
      style: {
        backgroundColor: '#133101',
        borderTopColor: '#8CA853', 
      }
    }
  }
);


export default tabBarBottom;