import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CalculatorView from './src/views/CalculatorView/CalculatorView';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CalculatorView />
    </SafeAreaView>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1
  }
})

