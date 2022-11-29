import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import useMetodoSecante from '../../hooks/useMetodoSecante'
import MathJax from 'react-native-mathjax';
import { CalculatorContext } from '../../context/CalculatorContext';
import IconButton from '../../components/iconButton/IconButton';
import Card from '../../components/card/Card';

const SecanteMethodView = ({ navigation }) => {
    const { status, equation, interval, objetiveError } = useContext(CalculatorContext);
    const { metodoSecante, result, mathjaxExpression } = useMetodoSecante(equation, interval, objetiveError)

    useEffect(() => {
        metodoSecante()
    }, [])

    return (

        <ScrollView style={styles.container}>
            <IconButton onPress={() => navigation.pop()} />

            <Text style={styles.text}>
                Calculadora Método Secante
            </Text>
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
                                    </DataTable.Cell>
                                    <DataTable.Cell>{result.objetiveError}%</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </View>

                        <Text style={styles.resultado}>Resultado:</Text>
                       
                        {
                            result.iteraciones.map((item, index) => (
                                <Card
                                    key={index}
                                >
                                    <Text>Intervalo: ({item.interval[0]}, {item.interval[1]})</Text>
                                    <Text>f(a): {item.fInterval[0]}</Text>
                                    <Text>f(b): {item.fInterval[1]}</Text>
                                    <Text>xi: {item.xi}</Text>
                                    <Text>f(xi): {item.fxi}</Text>
                                    <Text>error: {item.error}%</Text>
                                </Card>
                            ))
                        }

                    </>
                    :
                    <ActivityIndicator size={60} />
            }

            <View style={{height: 200}} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        padding: 5,
        flex: 1
    },
    resultado: {
        fontSize: 20,
        textAlign: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: "center",
    },
});

export default SecanteMethodView
