import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import useInterpolacionNewton from '../../hooks/useInterpolacionNewton'
import IconButton from '../../components/iconButton/IconButton'
import { styles } from './InterpolacionNewtonView.style'
import { CalculatorContext } from '../../context/CalculatorContext'
import { DataTable } from 'react-native-paper';

const InterpolacionNewtonView = ({ navigation }) => {
    const { status, equation, xArray, yArray } = useContext(CalculatorContext);
    const { interpolacionNewton, resultado } = useInterpolacionNewton(equation, xArray, yArray)

    useEffect(() => {
        interpolacionNewton()
    }, [])


    return (
        <View style={styles.container}>
            <IconButton onPress={() => navigation.pop()} />

            {
                resultado &&
                <View>
                    <DataTable style={{ backgroundColor: "#e5e5e5" }}>
                        <DataTable.Header>
                            <DataTable.Title>x</DataTable.Title>
                            <DataTable.Title>y</DataTable.Title>
                        </DataTable.Header>

                        {
                            resultado.table.map((row, index) => (
                                <>
                                    <DataTable.Row
                                    >
                                        <DataTable.Cell>{resultado.table[0][0]}</DataTable.Cell>
                                        <DataTable.Cell>{resultado.table[1][0]}</DataTable.Cell>
                                        <DataTable.Cell>{resultado.table[2][0]}</DataTable.Cell>
                                        <DataTable.Cell>{resultado.table[3][0]}</DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row
                                    >
                                        <DataTable.Cell>{resultado.table[0][1]}</DataTable.Cell>
                                        <DataTable.Cell>{resultado.table[1][1]}</DataTable.Cell>
                                        <DataTable.Cell>{resultado.table[2][1]}</DataTable.Cell>
                                        <DataTable.Cell>{resultado.table[3][1]}</DataTable.Cell>
                                    </DataTable.Row>
                                   
                                </>

                            ))
                        }


                    </DataTable>
                </View>
            }
        </View>
    )
}

export default InterpolacionNewtonView
