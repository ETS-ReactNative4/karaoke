import { createDrawerNavigator } from 'react-navigation';

import Inicio from '../views/inicio/inicio';
import Canta from '../views/canta/canta';
import Festival from '../views/festival/festival';
import Agenda from '../views/agenda/agenda';
import Musica from '../views/musica/musica';


const DrawerScreen = createDrawerNavigator({
    Inicio: {screen: Inicio,
        navigationOptions: () => ({
          title: 'Inicio'
        }), 
      },
    Canta: {screen: Canta,
      navigationOptions: () => ({
        title: 'Cantá'
      }),},
    Musica: {screen: Musica,
        navigationOptions: () => ({
          title: 'Lista de Temas'
        }),},
    Festival: {screen: Festival,
        navigationOptions: () => ({
          title: 'Fiesta del Chamamé'
        }),},
    Agenda: {screen: Agenda,
      navigationOptions: () => ({
        title: 'Agenda Cultural'
      }),}
})

export default DrawerScreen;