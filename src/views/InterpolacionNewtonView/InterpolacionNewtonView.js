import React from 'react'
import { View } from 'react-native'
import useInterpolacionNewton from '../../hooks/useInterpolacionNewton'

import { create, all } from 'mathjs'

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

const InterpolacionNewtonView = () => {
    const {} = useInterpolacionNewton()

    return (
        <View>

        </View>
    )
}

export default InterpolacionNewtonView
