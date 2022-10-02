import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MathJax from 'react-native-mathjax';

import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import Button from '../../components/button/Button';
import { styles } from './CalculatorViewWithButtons.style';

const mmlOptions = {
    messageStyle: "none",
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
        ],
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
        ],
        processEscapes: true,
    },
    TeX: {
        extensions: [
            "AMSmath.js",
            "AMSsymbols.js",
            "noErrors.js",
            "noUndefined.js",
        ],
    },
};

const CalculatorViewWithButtons = () => {

    const [equation, setEquation] = useState("")

    const input = (e) => {

        if (equation.includes("{}")) {

            console.log(equation.indexOf("{}"))
            let before = equation.slice(0, equation.indexOf("{}") + 1)
            let after = equation.slice(equation.indexOf("{}") + 1, equation.length)

            console.log(before);
            console.log(after);

            return setEquation(before + e + after)
        }

        setEquation((equation) => equation + e)
    }

    const frac = () => {
        setEquation((equation) => `\\frac{${equation}}{}`)
    }
    const root = () => {
        setEquation((equation) => `\\sqrt[]{}`)
    }
    const ac = () => {
        setEquation("")
    }
    const del = () => {
        var eq = equation

        console.log(eq);
        eq = eq.slice(eq.length - 1, eq.length)
        console.log(eq);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Maths Formula
            </Text>

            {/* <MathJax
                mathJaxOptions={mmlOptions}
                html={
                    "$sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$"
                }
            /> */}

            <Text>{equation}</Text>

            <View style={styles.mathInputContainer}>
                <MathJax
                    style={styles.mathInput}
                    mathJaxOptions={mmlOptions}
                    html={
                        (equation) ? "$" + equation + "$" : ""
                    }
                />
            </View>

            <View style={styles.mathButtonsContainer}>
                <Button
                    backgroundColor='#262626'
                    color='#FFF'
                    onPress={() => input("^")}
                >
                    ^
                </Button>

                <Button
                    backgroundColor='#262626'
                    color='#FFF'
                    onPress={() => frac()}
                >
                    frac
                </Button>
               
                <Button
                    backgroundColor='#262626'
                    color='#FFF'
                    onPress={() => root()}
                >
                    root
                </Button>
                
                <Button
                    backgroundColor='#ffc522'
                    color='#262626'
                    onPress={() => del()}
                >
                    DEL
                </Button>
                
                <Button
                    backgroundColor='#ffc522'
                    color='#262626'
                    onPress={() => ac()}
                >
                    AC
                </Button>
            </View>

            <View style={styles.numericButtonsContainer}>
                <Button onPress={() => input(1)}>1</Button>
                <Button onPress={() => input(2)}>2</Button>
                <Button onPress={() => input(3)}>3</Button>
                <Button
                    backgroundColor='#262626'
                    color='#FFF'
                    onPress={() => input("+")}
                >
                    <MaterialIcon name="add" size={24} />
                </Button>
                <Button onPress={() => input(4)}>4</Button>
                <Button onPress={() => input(5)}>5</Button>
                <Button onPress={() => input(6)}>6</Button>
                <Button
                    backgroundColor='#262626'
                    color='#FFF'
                    onPress={() => input("-")}
                >
                    <MaterialIcon name="remove" size={24} />
                </Button>
                <Button onPress={() => input(7)}>7</Button>
                <Button onPress={() => input(8)}>8</Button>
                <Button onPress={() => input(9)}>9</Button>
                <Button
                    backgroundColor='#262626'
                    color='#FFF'
                    onPress={() => input("*")}
                >
                    <MaterialIcon name="close" size={24} />
                </Button>
                <Button onPress={() => input(0)}>0</Button>
                <Button onPress={() => input(".")}>.</Button>
                <Button onPress={() => input("=")}>=</Button>
                <Button
                    backgroundColor='#262626'
                    color='#FFF'
                    onPress={() => input("/")}
                >
                    /
                </Button>
            </View>

        </View>
    )
}


export default CalculatorViewWithButtons
