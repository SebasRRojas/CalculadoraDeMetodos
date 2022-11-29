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

const useMetodoBiseccion = (equation, initialInterval, objetiveError) => {

    const [resultado, setResultado] = useState([])
    const [mathjaxExpression, setMathjaxExpression] = useState([])

    const iteraciones = []

    const puntoMedio = (a, b) => {
        return math.evaluate("(a+b)/2", { a: a, b: b });
    }

    const intervaloInicial = () => {

        if (initialInterval.indexOf("(") != -1 && initialInterval.indexOf(")") != -1) {
            initialInterval = initialInterval.substring(1, initialInterval.length - 1)

            let data = initialInterval.split(",");

            return data
        }

    }

    const evaluarArgumentos = (argumentos) => {
        try {
            return {
                a: math.evaluate(equation, { x: argumentos.a }),
                b: math.evaluate(equation, { x: argumentos.b }),
                m: math.evaluate(equation, { x: argumentos.m })
            }

        } catch (error) {
            console.log(error);
        }

    }

    const signosEvaluaciones = (evaluaciones) => {
        return {
            a: evaluaciones.a >= 0,
            b: evaluaciones.b >= 0,
            m: evaluaciones.m >= 0,
        }
    }

    const definirIntervalo = () => {
        if (iteraciones.length === 0) {
            return intervaloInicial()
        }

        let iteracionAnterior = iteraciones[iteraciones.length - 1]
        return definirNuevoIntervalo(iteracionAnterior.signos, iteracionAnterior.argumentos)
    }

    const definirNuevoIntervalo = (signos, argumentos) => {
        console.log("Definiendo nuevo intervalo...");
        if (signos.m !== signos.a) {
            return [argumentos.a, argumentos.m]
        } else if (signos.m != signos.b) {
            return [argumentos.m, argumentos.b]
        }
    }

    const definirArgumentos = (intervalo) => {
        return {
            a: intervalo[0],
            b: intervalo[1],
            m: puntoMedio(intervalo[0], intervalo[1])
        }
    }

    const calcularError = (argumentos) => {
        if (iteraciones.length === 0) return undefined;

        let errorEquation = "((actual - anterior)/actual)*100"

        return math.evaluate(errorEquation, { actual: argumentos.m, anterior: iteraciones[iteraciones.length - 1].argumentos.m })

    }

    const metodoBiseccion = () => {
        try {
            let errorActual = 100

            while (errorActual === undefined || errorActual >= objetiveError) {
                let intervalo = definirIntervalo();
                console.log("intervalo: " + (intervalo));
                let argumentos = definirArgumentos(intervalo);
                console.log("argumentos: " + JSON.stringify(argumentos));
                let evaluaciones = evaluarArgumentos(argumentos)
                console.log("evaluaciones: " + JSON.stringify(evaluaciones));
                let signos = signosEvaluaciones(evaluaciones)
                console.log("signos: " + JSON.stringify(signos));
                let error = calcularError(argumentos)
                console.log("error: " + error);


                if (error) {
                    error = math.abs(error)
                }

                let iteracion = {
                    intervalo,
                    argumentos,
                    evaluaciones,
                    signos,
                    error
                }

                errorActual = error

                iteraciones.push(iteracion)
            }

            setMathjaxExpression(math.parse(equation).toTex())
            setResultado(iteraciones)
            return true;
        } catch (error) {
            return false;
        } 
    }
    
    return {
        metodoBiseccion,
        resultado,
        mathjaxExpression

    }
}

export default useMetodoBiseccion
