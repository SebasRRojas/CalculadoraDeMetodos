import React, { useContext, useEffect } from 'react'
import useMetodoNewtonRaphson from '../../hooks/useMetodoNewtonRaphson'
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CalculatorContext } from '../../context/CalculatorContext';
import IconButton from '../../components/iconButton/IconButton';

const NewtonRaphsonMethodView = ({navigation}) => {

    const { status, equation, interval, objetiveError } = useContext(CalculatorContext);
    const { metodoNewtonRaphson, result } = useMetodoNewtonRaphson(equation, interval, objetiveError)


    useEffect(() => {
        metodoNewtonRaphson()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <IconButton onPress={() => navigation.pop()}/>
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
                        <View>
                            <DataTable style={{ backgroundColor: "#e5e5e5" }}>
                                <DataTable.Header>
                                    <DataTable.Title>xi</DataTable.Title>
                                    <DataTable.Title>f(xi)</DataTable.Title>
                                    <DataTable.Title numeric>error (%)</DataTable.Title>
                                </DataTable.Header>

                                {
                                    result.iteraciones.map((item, index) => (
                                        <DataTable.Row
                                            key={index}
                                        >
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
});

export default NewtonRaphsonMethodView
