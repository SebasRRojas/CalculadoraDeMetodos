import React, { useEffect, useState } from 'react'

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

const useInterpolacionNewton = (equation, xValues, yValues) => {

    const [resultado, setResultado] = useState()

    const formulaPendiente = "(y2-y1)/(x2-x1)"

    const table = []
    let xArray;
    let yArray;

    const interpolacionNewton = () => {
        xArray = xValues.split(",")

        if (equation) {
            yArray = evaluarImagenes()
        } else {
            yArray = yValues.split(",")
        }

        table.push(xArray)
        table.push(yArray)

        for (let j = 0; j < xArray.length - 1; j++) {
            const row = []

            for (let i = 0; i < xArray.length; i++) {

                const fx = ""
                if (i - (j+1) >= 0) {
                    console.log("y2:" + table[j + 1][i] + ", y1:" + table[j + 1][i - 1] + ", x2:" + table[0][i] + ", x1:" + table[0][i - (j+1)]);
                    fx = math.evaluate(formulaPendiente, { y2: table[j + 1][i], y1: table[j + 1][i - 1], x2: table[0][i], x1: table[0][i - (j+1)] })
                }

                row.push(fx)


            }
            table.push(row)
        }

        console.log("table:" + JSON.stringify(table, null, 5));

        const resp = {
            table: table
        }

        setResultado(resp)
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
        interpolacionNewton,
        resultado
    }
}

export default useInterpolacionNewton
