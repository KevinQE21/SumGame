import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Game from './src/components/Game';

export default App = () => {
  const [gameId, setGameId] = useState(0);


  return (
    <View style={styles.container}>
      <Game key={gameId} randomNumbersCount={6} initialSeconds={5}></Game>
      <StatusBar style="dark" />
      <Button title="Play Again" onPress={() => setGameId(() => gameId +1 )}/>
    </View>
  )    
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingHorizontal: 50,
  }
});
 