import React from 'react';
import { StyleSheet, Text, View, TouchableWhitoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
            <Icon name="bars" color="white" size={25} />
        <Text style={styles.titulo}>Karaoke</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    marginTop: 24,
    flexDirection: 'row',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  titulo: {
    flex: 4,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
