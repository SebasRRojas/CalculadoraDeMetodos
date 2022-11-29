import React, { useContext, useEffect } from 'react'
import useMetodoNewtonRaphson from '../../hooks/useMetodoNewtonRaphson'
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalculatorContext } from '../../context/CalculatorContext';
import IconButton from '../../components/iconButton/IconButton';
import Card from '../../components/card/Card';

const NewtonRaphsonMethodView = ({navigation}) => {

    const { status, equation, interval, objetiveError } = useContext(CalculatorContext);
    const { metodoNewtonRaphson, result } = useMetodoNewtonRaphson(equation, interval, objetiveError)


    useEffect(() => {
        metodoNewtonRaphson()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <IconButton onPress={() => navigation.pop()}/>
            <Text style={styles.text}>
                Calculadora Método Newton-Raphson
            </Text>
            {
                result.iteraciones
                    ?
                    <>
                        <View style={{ marginBottom: 25 }}>
                            <DataTable style={{ backgroundColor: "#e5e5e5", alignSelf: 'center'}}>
                                <DataTable.Header>
                                    <DataTable.Title>Intervalo Inicial</DataTable.Title>
                                    <DataTable.Title>Ecuación</DataTable.Title>
                                    <DataTable.Title>Derivada</DataTable.Title>
                                </DataTable.Header>

                                <DataTable.Row>
                                    <DataTable.Cell>({result.initialInterval[0]},{result.initialInterval[1]})</DataTable.Cell>
                                    <DataTable.Cell>{result.equation}</DataTable.Cell>
                                    <DataTable.Cell>{result.derivatedEquation}</DataTable.Cell>
                                </DataTable.Row>


                            </DataTable>
                        </View>

                        <Text style={styles.resultado}>Resultado:</Text>

                        {
                            result.iteraciones.map((item, index) => (
                                <Card
                                    key={index}
                                    style={{marginBottom: 15}}
                                >
                                    <Text style={{textAlign: "center", marginBottom: 10 }}>Iteracion #{index}</Text>
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

export default NewtonRaphsonMethodView
