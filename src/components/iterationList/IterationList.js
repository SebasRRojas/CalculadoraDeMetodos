import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { styles } from './IterationList.style'

const IterationList = ({
    iterations,

    //Custom styles
    containerStyle
}) => {

    const containerStyles = Object.assign({ ...styles.container }, { ...containerStyle })

    return (
        <>
            <Text style={styles.title}>Resultado</Text>
            <FlatList
                style={containerStyles}
                data={iterations}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>Iteración: {index + 1}</Text>
                        <Text>Intervalo: ({item.intervalo[0]},{item.intervalo[1]})</Text>
                        <Text>a: {item.argumentos.a}</Text>
                        <Text>f(a): {item.signos.a ? "+" : "-"}</Text>
                        <Text>b: {item.argumentos.b}</Text>
                        <Text>f(b): {item.signos.b ? "+" : "-"}</Text>
                        <Text>Xi: {item.argumentos.m}</Text>
                        <Text>f(Xi): {item.signos.b ? "+" : "-"}</Text>
                        <Text>Error: {item.error ? item.error : "-"}%</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index}
            />
        </>
    )
}

export default IterationList

// <View style={containerStyles}>
                //     <Text>Iteración: {index}</Text>
                //     <Text>Intervalo: {iteration.intervalo}</Text>
                //     <Text>a: {iteration.argumentos.a}</Text>
                //     <Text>f(a): {iteration.signos.a}</Text>
                //     <Text>b: {iteration.argumentos.b}</Text>
                //     <Text>f(b): {iteration.signos.b}</Text>
                //     <Text>Xi: {iteration.argumentos.m}</Text>
                //     <Text>f(Xi): {iteration.signos.b}</Text>
                //     <Text>Error: {iteration.error}%</Text>
                // </View>