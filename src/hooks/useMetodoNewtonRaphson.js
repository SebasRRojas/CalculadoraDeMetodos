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

const useMetodoNewtonRaphson = (equation, initialInterval, objetiveError) => {

    const [result, setResult] = useState([])

    const iteraciones = []

    let derivatedEquation = ""

    const formulaError = "((ac-an)/ac)*100"

    const metodoNewtonRaphson = () => {
        let errorActual = 100
        derivatedEquation = derivate();

        let interval = definirIntervalo();
        let xi = math.evaluate("(a+b)/2", { a: interval[0], b: interval[1] })

        while (errorActual >= objetiveError) {
            let fxi = evaluarEquation(xi)
            let error = evaluarError(fxi, xi)

            let iteration = {
                xi,
                fxi,
                error
            }

            xi = fxi
            errorActual = error


            iteraciones.push(iteration)

        }


        setResult({
            iteraciones,
            initialInterval: interval,
            equation,
            derivatedEquation
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
            const formulaIterativa = `x-((${equation})/(${derivatedEquation}))`
            console.log(formulaIterativa);
            return math.evaluate(formulaIterativa, { x: x })
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

    const evaluarError = (fxi, xi) => {
        console.log(fxi);
        console.log(xi);
        try {
            return math.abs(math.evaluate(formulaError, { ac: fxi, an: xi }));
        } catch (error) {
            console.log(error);
        }
    }

    const derivate = () => {
        const eq = math.parse(equation)
        const x = math.parse('x')
        return math.derivative(eq, x).toString();
    }

    return {
        metodoNewtonRaphson,
        result
    }
}

export default useMetodoNewtonRaphson
