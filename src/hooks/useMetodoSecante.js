import React, { useState } from 'react'

import { create, all } from 'mathjs'
const config = {
    epsilon: 1e-12,
    matrix: 'Matrix',
    number: 'number',
    precision: 64,
    predictable: false,
    randomSeed: null
}
const math = create(all, config)

const useMetodoSecante = (equation, initialInterval, objetiveError) => {

    const [result, setResult] = useState([])

    const iteraciones = []

    const formulaXi = "p2-((fp2*(p2-p1))/(fp2-fp1))"
    const formulaError = "((xi-p1)/xi)*100"

    const metodoSecante = () => {
        let errorActual = 1000

        while (errorActual >= objetiveError) {

            let interval = definirIntervalo();
            let fInterval = [
                evaluarEquation(interval[0]),
                evaluarEquation(interval[1])
            ]
            let xi = resolverXi(interval, fInterval)
            let fxi = evaluarEquation(xi)
            let error = evaluarError(xi, interval[0])

            let iteration = {
                interval,
                fInterval,
                xi,
                fxi,
                error
            }

            errorActual = error

            iteraciones.push(iteration)

        }


        setResult({
            iteraciones,
            equation,
            objetiveError
        })
    }

    const definirIntervalo = () => {
        if (iteraciones.length === 0) {
            return intervaloInicial()
        }

        let iteracionAnterior = iteraciones[iteraciones.length - 1]
        return definirNuevoIntervalo(iteracionAnterior.xi, iteracionAnterior.fxi, iteracionAnterior.interval, iteracionAnterior.fInterval)
    }

    const intervaloInicial = () => {
        if (initialInterval.indexOf("(") != -1 && initialInterval.indexOf(")") != -1) {
            initialInterval = initialInterval.substring(1, initialInterval.length - 1)

            let data = initialInterval.split(",");

            return [
                math.evaluate(data[0]),
                math.evaluate(data[1])
            ]
        }
    }

    const definirNuevoIntervalo = (xi, fxi, interval, fInterval) => {
        if ((fxi >= 0) !== (fInterval[0] >= 0)) {
            return [interval[0], xi]
        } else if ((fxi >= 0) !== (fInterval[1] >= 0)) {
            return [xi, interval[1]]
        }
    }

    const evaluarEquation = (x) => {
        try {
            return math.evaluate(equation, { x: x })
        } catch (error) {
            console.log(error);
        }
    }

    const resolverXi = (interval, fInterval) => {
        const p1 = interval[0]
        const p2 = interval[1]
        const fp1 = fInterval[0]
        const fp2 = fInterval[1]

        try {
            return math.evaluate(formulaXi, { p1, p2, fp1, fp2 })
        } catch (error) {
            console.log(error);
        }

    }

    const evaluarError = (xi, p1) => {

        return math.abs(math.evaluate(formulaError, { xi, p1 }));
    }

    return {
        metodoSecante,
        result
    }
}

export default useMetodoSecante
