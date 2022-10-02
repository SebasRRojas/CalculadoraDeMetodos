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

    const [selectedMethod, setSelectedMethod] = useState("BisectionMethodView");

    const { read } = useContext(CalculatorContext);

    const onPress = () => {
        read(equation, interval, objetiveError)
        navigation.navigate(selectedMethod)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Calculadora de Ecuaciones
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
