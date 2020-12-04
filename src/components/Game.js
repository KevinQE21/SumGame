import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RandomNumber from './RandomNumber';

export default Game = ({ randomNumbersCount }) => { //Se realiza un destructuring de los props

    const [selectedNumbers, setSelectedNumbers] = useState([]);//Hooks useState

    const[randomNumbers, setRandomNumbers] = useState([]);

    const [target, setTarget ] = useState([]);


    useEffect(() => {

        //const target = 10 + Math.floor(40 * Math.random()); //Floor=>Redondea y Random=>0.1 hasta 1
        const firstRandomNumbers = Array.from({ length: randomNumbersCount })//Crea un array dinamico a partir del prop con from 
        .map(() => 1 + Math.floor(10*Math.random()));//Map va retornar un arreglo a partir del la funcion dentro de map, la misma se va recorrer las veces por cada item iterable

        const firstTarget = firstRandomNumbers.slice(0, randomNumbersCount-2)//.slice genera una nueva lista de numeros
        .reduce((acc, cur)=>//accumulator es el numero o dato que devuelve y el current es los numeros random que provienen del props
        acc + cur 
        , 0); //Reduce suma los numeros de un array en otras palabras reduce la lista a 1 num aleatorio, recorre todos los items de la lista siempre que devuelva 1 cosa
        
        setRandomNumbers(firstRandomNumbers);//Asigna el state por primera vez
        setTarget(firstTarget);//Asigna el state por primera vez

    }, [])//Hook useEffect, esto es dado que el estado esta en constante cambio, se ejecutaba el render de nuevo, asi se ejecuta solo una vez cada vez que se hace el mount


    const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);
    
    const selectedNumer = number => setSelectedNumbers([...selectedNumbers, number]);
    

    return (
        <View>
            <Text style={styles.target}>{target}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((randomNumbers, index) => 
                    <RandomNumber 
                                id={index}
                                key={index} 
                                number={randomNumbers} 
                                disable={isNumberSelected(index)}
                                onSelected={selectedNumer}
                    />
                )}
            </View>            
        </View>
    );
};

const styles = StyleSheet.create({
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
    
});