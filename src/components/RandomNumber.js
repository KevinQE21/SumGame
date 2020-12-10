import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export default RandomNumber = ({ id, number, disable, onSelected }) => {

    const handlePresss = () => {
        if(!disable)
            onSelected(id);
    };

    return (
        <TouchableOpacity onPress={handlePresss}>
            <Text style={[styles.random, disable && styles.disable]}>{number}</Text>
        </TouchableOpacity>
    );    
};

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        minHeight: 45,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 35,
        textAlign: "center",
    },
    disable: {
        opacity: 0.3,
    }
}) 