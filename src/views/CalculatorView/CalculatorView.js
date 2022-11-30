import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/button/Button'
import { styles } from './CalculatorView.style'
import { CalculatorContext } from '../../context/CalculatorContext';
import { create, all } from 'mathjs'
import MathJax from 'react-native-mathjax';
import { eq } from 'lodash';

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

// create a mathjs instance with configuration
const config = {
    epsilon: 1e-12,
    matrix: 'Matrix',
    number: 'number',
    precision: 64,
    predictable: false,
    randomSeed: null
}
const math = create(all, config)

const CalculatorView = ({ navigation }) => {
    const [equation, setEquation] = useState("")
    const [interval, setInterval] = useState("")
    const [objetiveError, setObjetiveError] = useState("")
    const [mathJaxEquation, setMathJaxEquation] = useState()

    const [errorEquation, setErrorEquation] = useState("")
    const [errorInterval, setErrorInterval] = useState("")
    const [errorCriterio, setCriterioInterval] = useState("")


    const [selectedMethod, setSelectedMethod] = useState("BisectionMethodView");

    const { read } = useContext(CalculatorContext);

    useEffect(() => {
        try {
            if (!equation) return;
            const eq = math.parse(equation).toTex()
            setMathJaxEquation(eq)
        } catch (error) {

        }
    }, [equation])


    const onPress = () => {
        if (!validateData()) {
            return;
        }
        read(equation, interval, objetiveError)
        navigation.navigate(selectedMethod)
    }

    const validateData = () => {
        setErrorEquation("")
        setErrorInterval("")
        setCriterioInterval("")
        let isValid = true;
        if (equation.length == 0) {
            setErrorEquation('Debes ingresar una ecuacion valida, no puede ir vacio.')
            isValid = false;
        }
        if (interval.length == 0) {
            setErrorInterval('Debes ingresar un intervalo valido, no puede ir vacio.')
            isValid = false;
        } else {
            if (!/\(-?[0-9.]{1,8},\-?[0-9.]{1,8}\)/.test(interval)) {
                setErrorInterval('Debes ingresar un intervalo valido con el formato (x,y)')
                isValid = false;
            }
        }
        if (objetiveError.length == 0) {
            setCriterioInterval('Debes ingresar un criterio valido, no puede ir vacio.')
            isValid = false;
        } else {
            if (!/-?[0-9.]{1,16}/.test(objetiveError)) {
                setCriterioInterval('Debes ingresar un criterio valido, tiene que ser numerico.')
                isValid = false;
            }
        }

        return isValid;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Calculadora de Ecuaciones
            </Text>

            <View style={styles.inputContainer}>
                <Text>Método:</Text>
                <Picker
                    selectedValue={selectedMethod}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedMethod(itemValue)
                    }
                >
                    <Picker.Item label="Bisección" value="BisectionMethodView" />
                    <Picker.Item label="Secante" value="SecanteMethodView" />
                    <Picker.Item label="Newton & Raphson" value="NewtonRaphsonMethodView" />
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text>Equación:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setEquation(e)}
                    value={equation}
                    placeholder="f(x)=x+y"
                />

            </View>
            <View style={styles.inputContainer}>
                <Text>Visor de ecuacion:</Text>
                {
                    mathJaxEquation &&

                    < MathJax
                        style={{ ...styles.button, backgroundColor: "#fff" }}
                        mathJaxOptions={mmlOptions}
                        html={`$${mathJaxEquation}$`}
                    />
                }

            </View>


            {

                (
                    selectedMethod === "BisectionMethodView" ||
                    selectedMethod === "SecanteMethodView" ||
                    selectedMethod === "NewtonRaphsonMethodView"
                ) &&
                <>
                    {errorEquation ? <Text style={styles.inputError}>{errorEquation}</Text> : ""}
                    <View style={styles.inputContainer}>
                        <Text>Intervalo inicial:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setInterval(e)}
                            value={interval}
                            placeholder="(x,y)"
                        />
                    </View>
                    {errorInterval ? <Text style={styles.inputError}>{errorInterval}</Text> : ""}


                    <View style={styles.inputContainer}>
                        <Text>Criterio de error:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setObjetiveError(e)}
                            value={objetiveError}
                        />
                    </View>
                    {errorCriterio ? <Text style={styles.inputError}>{errorCriterio}</Text> : ""}

                </>
            }


            <Button
                color='#FFF'
                backgroundColor='#262626'
                buttonStyle={styles.calculateButton}
                onPress={() => onPress()}
            >Calculate</Button>
        </View>
    )
}

export default CalculatorView
