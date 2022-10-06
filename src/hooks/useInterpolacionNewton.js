import React from 'react'

const useInterpolacionNewton = (xArray, yArray, equation) => {

    const interpolacionNewton = () => {
        if (equation) {
            yArray = evaluarImagenes()
        }
    }

    const evaluarEcuacion = (eq, x) => {
        return math.evaluate(eq, { x: x })
    }

    const evaluarImagenes = () => {
        const fx = []
        xArray.map((x) => {
            fx.push(evaluarEcuacion(equation, x))
        })

        return fx
    }

    return {

    }
}

export default useInterpolacionNewton
