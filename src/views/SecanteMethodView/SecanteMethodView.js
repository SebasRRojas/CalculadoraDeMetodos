import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import useMetodoSecante from '../../hooks/useMetodoSecante'
import MathJax from 'react-native-mathjax';
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


const SecanteMethodView = ({navigation}) => {
    const { status, equation, interval, objetiveError } = useContext(CalculatorContext);
    const { metodoSecante, result, mathjaxExpression } = useMetodoSecante(equation, interval, objetiveError)

    useEffect(() => {
        metodoSecante()
    }, [])

    return (

        <ScrollView style={styles.container}>
            <IconButton onPress={() => navigation.pop()} />
            {
                result.iteraciones
                    ?
                    <>
                        <View style={{ marginBottom: 25 }}>
                            <DataTable style={{ backgroundColor: "#e5e5e5", alignSelf: 'center', width: 300 }}>
                                <DataTable.Header>
                                    <DataTable.Title>Ecuación</DataTable.Title>
                                    <DataTable.Title>Criterio de error:</DataTable.Title>
                                </DataTable.Header>

                                <DataTable.Row>
                                    <DataTable.Cell>
                                        {result.equation}
                                        {/* <MathJax
                                            style={styles.mathInput}
                                            mathJaxOptions={mmlOptions}
                                            html={
                                                (mathjaxExpression) ? "$" + mathjaxExpression + "$" : ""
                                            }
                                        /> */}
                                    </DataTable.Cell>
                                    <DataTable.Cell>{result.objetiveError}%</DataTable.Cell>
                                </DataTable.Row>


                            </DataTable>
                        </View>
                        <Text style={styles.resultado}>Resultado</Text>
                        <View>
                            <DataTable style={{ backgroundColor: "#e5e5e5" }}>
                                <DataTable.Header>
                                    <DataTable.Title>Intervalo</DataTable.Title>
                                    <DataTable.Title>f(a)</DataTable.Title>
                                    <DataTable.Title>f(b)</DataTable.Title>
                                    <DataTable.Title>xi</DataTable.Title>
                                    <DataTable.Title>f(xi)</DataTable.Title>
                                    <DataTable.Title numeric>error (%)</DataTable.Title>
                                </DataTable.Header>

                                {
                                    result.iteraciones.map((item, index) => (
                                        <DataTable.Row
                                            key={index}
                                        >
                                            <DataTable.Cell>({item.interval[0]}, {item.interval[1]})</DataTable.Cell>
                                            <DataTable.Cell>{item.fInterval[0]}</DataTable.Cell>
                                            <DataTable.Cell>{item.fInterval[1]}</DataTable.Cell>
                                            <DataTable.Cell>{item.xi}</DataTable.Cell>
                                            <DataTable.Cell>{item.fxi}</DataTable.Cell>
                                            <DataTable.Cell numeric>{item.error}</DataTable.Cell>
                                        </DataTable.Row>

                                    ))
                                }


                            </DataTable>
                        </View>
                    </>
                    :
                    <ActivityIndicator size={60} />
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        padding: 5,
        flex: 1
    },
    resultado: {
        fontSize: 75,
        textAlign: 'center'
    }
});

export default SecanteMethodView
