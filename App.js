import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/components/Game';

export default App = () => (
    <View style={styles.container}>
      <Game randomNumbersCount={6}></Game>
      <StatusBar style="dark" />
    </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 50,
  },
});
