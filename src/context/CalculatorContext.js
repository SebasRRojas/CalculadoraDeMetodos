import React, { createContext, useReducer } from 'react';
import { calculatorReducer } from './calculatorReducer';

const calculatorInitialState = {
    status: 'checking',
    equation: null,
    interval: null,
    objetiveError: null,
};

export const CalculatorContext = createContext({});

export const CalculatorProvider = ({ children }) => {

    const [state, dispatch] = useReducer(calculatorReducer, calculatorInitialState);

    const read = async ( equation, interval, objetiveError, xArray, yArray) => {
        try {
            dispatch({
                type: 'readData',
                payload: {
                    equation: equation,
                    interval: interval,
                    objetiveError: objetiveError,
                    xArray: xArray,
                    yArray: yArray,
                },
            });

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <CalculatorContext.Provider
            value={{
                ...state,
                read,
            }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};
