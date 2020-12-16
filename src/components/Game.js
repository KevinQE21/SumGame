import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle'; 

let intervalId;

export default Game = ({ randomNumbersCount, initialSeconds }) => { //Se realiza un destructuring de los props

    const [selectedNumbers, setSelectedNumbers] = useState([]);//Hooks useState

    const[randomNumbers, setRandomNumbers] = useState([]);

    const [target, setTarget ] = useState(10);

    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

    const [gameStatus, setGameStatus ] = useState('PLAYING');


    useEffect(() => {

        //const target = 10 + Math.floor(40 * Math.random()); //Floor=>Redondea y Random=>0.1 hasta 1
        const firstRandomNumbers = Array.from({ length: randomNumbersCount })//Crea un array dinamico a partir del prop con from 
        .map(() => 1 + Math.floor(10*Math.random()));//Map va retornar un arreglo a partir del la funcion dentro de map, la misma se va recorrer las veces por cada item iterable

        const firstTarget = firstRandomNumbers.slice(0, randomNumbersCount-2)//.slice genera una nueva lista de numeros
        .reduce((acc, cur)=>//accumulator es el numero o dato que devuelve y el current es los numeros random que provienen del props
        acc + cur 
        , 0); //Reduce suma los numeros de un array en otras palabras reduce la lista a 1 num aleatorio, recorre todos los items de la lista siempre que devuelva 1 cosa
        
        const shuffleRandomNumbers = shuffle(firstRandomNumbers);//parte de una libreria para generar numeros random

        setRandomNumbers(shuffleRandomNumbers);//Asigna el state por primera vez

        setTarget(firstTarget);//Asigna el state por primera vez

        intervalId = setInterval(() => {
            setRemainingSeconds((seconds) => seconds - 1); 
        }, 1000);//esto es asincronico ya que se ejecuta en otro hilo de ejecucion

        return () => clearInterval(intervalId);//documentWillUnmount

    }, [])//Hook useEffect, esto es dado que el estado esta en constante cambio, se ejecutaba el render de nuevo, asi se ejecuta solo una vez cada vez que se hace el mount
    //Cuando el useEffect tiene [] solo se ejecuta 1 vez, return cuando se desmonta y  sin [] se ejecuta siempre/ con datos dentro del [] se ejecuta cada vez que esas variables cambien

    useEffect(() => {
        setGameStatus(getGameStatus());
        if (remainingSeconds === 0 || gameStatus !== 'PLAYING') 
            clearInterval(intervalId);
    }, [remainingSeconds, selectedNumbers]);//Este vigila el numero de los segundos


    const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);
    
    const selectedNumer = number => setSelectedNumbers([...selectedNumbers, number]);
    

    const getGameStatus = () => {
        const sumSelected = selectedNumbers.reduce((acc, cur ) => acc + randomNumbers[cur], 0)//reduce suma valores de arreglos, recibe una funcion y e le puede setear un valor inicial
        //console.warn(sumSelected); //Imprime un waring
        if (sumSelected > target || remainingSeconds === 0) {
            return 'LOST';
        }else if (sumSelected === target) {
            return 'WON';
        } else {
            return 'PLAYING';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.target, styles[gameStatus]]}>{target}</Text>
            <Text>{gameStatus}</Text>
            <Text>{remainingSeconds}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((randomNumbers, index) => 
                    <RandomNumber 
                                id={index}
                                key={index} 
                                number={randomNumbers} 
                                disable={isNumberSelected(index) || gameStatus !== 'PLAYING'}
                                onSelected={selectedNumer}                                
                    />
                )}
            </View>            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        textAlign: "center",
    },
    randomContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    PLAYING: {
        backgroundColor: "#bbb",
    },
    WON: {
        backgroundColor: "green",
    },
    LOST: {
        backgroundColor: "red",
    }
});