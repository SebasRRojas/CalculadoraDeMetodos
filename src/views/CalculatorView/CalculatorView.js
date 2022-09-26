import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import MathJax from 'react-native-mathjax';

import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import { styles } from './CalculatorView.style';
import Button from '../../components/button/Button';
import useMetodoBiseccion from '../../hooks/useMetodoBiseccion';
import IterationList from '../../components/iterationList/IterationList';

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

const CalculatorView = () => {

    const [equation, setEquation] = useState("")
    const [interval, setInterval] = useState("")
    const [objetiveError, setObjetiveError] = useState("")

    const { metodoBiseccion, resultado } = useMetodoBiseccion(equation, interval, objetiveError);

    const onPress = () => {
        metodoBiseccion();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Bisection Method Calculator
            </Text>

            <View style={styles.inputContainer}>
                <Text>Equation:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setEquation(e)}
                    value={equation}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Initial Interval:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setInterval(e)}
                    value={interval}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Criterio de error:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setObjetiveError(e)}
                    value={objetiveError}
                />
            </View>

            <Button
                color='#FFF'
                backgroundColor='#262626'
                buttonStyle={styles.calculateButton}
                onPress={() => onPress()}
            >Calculate</Button>

            <View style={styles.mathInputContainer}>
                <Text>Equation viewer:</Text>
                <MathJax
                    style={styles.mathInput}
                    mathJaxOptions={mmlOptions}
                    html={
                        (equation) ? "$" + equation + "$" : ""
                    }
                />
            </View>

            <IterationList iterations={resultado} />


        </View>
    )
}


export default CalculatorView