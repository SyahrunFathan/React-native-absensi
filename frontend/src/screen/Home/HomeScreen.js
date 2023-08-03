import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import COLORS from '../../assets/styles/Colors';

const HomeScreen = () => {
  return (
    <SafeAreaView style={style.container}>
        <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'}/>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})
export default HomeScreen;
