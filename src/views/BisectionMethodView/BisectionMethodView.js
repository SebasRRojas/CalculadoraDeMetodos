import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import MathJax from 'react-native-mathjax';

import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import { styles } from './BisectionMethodView.style';
import Button from '../../components/button/Button';
import useMetodoBiseccion from '../../hooks/useMetodoBiseccion';
import IterationList from '../../components/iterationList/IterationList';
import { CalculatorContext } from '../../context/CalculatorContext';
import IconButton from '../../components/iconButton/IconButton';

const BisectionMethodView = ({ navigation }) => {

    const { status, equation, interval, objetiveError } = useContext(CalculatorContext);
    const { metodoBiseccion, resultado } = useMetodoBiseccion(equation, interval, objetiveError);

    useEffect(() => {
        metodoBiseccion()
    }, [])

    if ( resultado.length < 0) {
        navigation.navigate("ViewError")
    } 

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <IconButton onPress={() => navigation.navigate("CalculatorView")} />
            </View>

            <Text style={styles.text}>
                Calculadora Método Bisección
            </Text>
            {resultado.length > 0 && <IterationList iterations={resultado} />}
        </View>
    )
}


export default BisectionMethodView