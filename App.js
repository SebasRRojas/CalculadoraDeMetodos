import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CalculatorProvider } from './src/context/CalculatorContext';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AppState>
          <StackNavigator />
        </AppState>
      </NavigationContainer>
    </SafeAreaView>
  );

}

const AppState = ({ children }) => {
  return (
    <CalculatorProvider>
      {children}
    </CalculatorProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

