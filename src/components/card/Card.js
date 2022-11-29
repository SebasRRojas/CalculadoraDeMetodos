import React from 'react'
import { View } from 'react-native'
import { styles } from './Card.style'

const Card = ({
    children,
    //Custom styles
    style
}) => {


    return (
        <>
            <View style={[styles.itemContainer, style]}>
                {children}
            </View>
        </>
    )
}

export default Card