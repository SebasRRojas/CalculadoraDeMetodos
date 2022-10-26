import React, { useContext, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/button/Button'
import { styles } from './CalculatorView.style'
import { CalculatorContext } from '../../context/CalculatorContext';

const CalculatorView = ({ navigation }) => {
    const [equation, setEquation] = useState("")
    const [interval, setInterval] = useState("")
    const [objetiveError, setObjetiveError] = useState("")
    const [xArray, setXArray] = useState("")
    const [yArray, setYArray] = useState("")

    const [selectedMethod, setSelectedMethod] = useState("BisectionMethodView");

    const { read } = useContext(CalculatorContext);

    const onPress = () => {
        read(equation, interval, objetiveError, xArray, yArray)
        navigation.navigate(selectedMethod)
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
                    <Picker.Item label="Interpolación de Newton" value="InterpolacionNewtonView" />
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text>Equation:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setEquation(e)}
                    value={equation}
                    placeholder="f(x)=x+y"
                />
            </View>

            {
                (
                    selectedMethod === "BisectionMethodView" ||
                    selectedMethod === "SecanteMethodView" ||
                    selectedMethod === "NewtonRaphsonMethodView"
                ) &&
                <>
                    <View style={styles.inputContainer}>
                        <Text>Initial Interval:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setInterval(e)}
                            value={interval}
                            placeholder="(x,y)"
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
                </>
            }

            {
                selectedMethod === "InterpolacionNewtonView" &&
                <>
                    <View style={styles.inputContainer}>
                        <Text>Lista de valores(x):</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setXArray(e)}
                            value={xArray}
                            placeholder="x1,x2,x3..."
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Lista de valores(y):</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setYArray(e)}
                            value={yArray}
                            placeholder="y1,y2,y3..."
                        />
                    </View>
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
