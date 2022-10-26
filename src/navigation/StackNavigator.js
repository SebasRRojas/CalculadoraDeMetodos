import React from 'react';
import CalculatorView from "../views/CalculatorView/CalculatorView"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BisectionMethodView from '../views/BisectionMethodView/BisectionMethodView';
import SecanteMethodView from '../views/SecanteMethodView/SecanteMethodView';
import NewtonRaphsonMethodView from '../views/NewtonRaphsonMethodView/NewtonRaphsonMethodView';
import InterpolacionNewtonView from '../views/InterpolacionNewtonView/InterpolacionNewtonView';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="CalculatorView" component={CalculatorView} />
            <Stack.Screen options={{ title: "Metodo Bisección" }} name="BisectionMethodView" component={BisectionMethodView} />
            <Stack.Screen options={{ title: "Metodo Secante" }} name="SecanteMethodView" component={SecanteMethodView} />
            <Stack.Screen options={{ title: "Metodo Newton-Raphson" }} name="NewtonRaphsonMethodView" component={NewtonRaphsonMethodView} />
            <Stack.Screen options={{ title: "Interpolación de Newton" }} name="InterpolacionNewtonView" component={InterpolacionNewtonView} />
        </Stack.Navigator>
    );
}

export default StackNavigator
