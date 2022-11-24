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

const mmlOptions = {
    messageStyle: "none",
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
        ],
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
        ],
        processEscapes: true,
    },
    TeX: {
        extensions: [
            "AMSmath.js",
            "AMSsymbols.js",
            "noErrors.js",
            "noUndefined.js",
            "math.js"
        ],
    },
};

const BisectionMethodView = ({navigation}) => {

    const { status, equation, interval, objetiveError } = useContext(CalculatorContext);
    const { metodoBiseccion, resultado, mathjaxExpression } = useMetodoBiseccion(equation, interval, objetiveError);
    
    
    useEffect(() => {
        metodoBiseccion()
    }, [])




    return (
        <View style={styles.container}>
            <IconButton onPress={() => navigation.navigate("CalculatorView") }/>
            <Text style={styles.text}>
                Bisection Method Calculator
            </Text>
            {resultado.length > 0 ? <IterationList iterations={resultado} /> : navigation.navigate("ViewError") }
        </View>
    )
}


export default BisectionMethodView