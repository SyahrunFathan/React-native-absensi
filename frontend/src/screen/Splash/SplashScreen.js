import React, { useEffect } from 'react';
import {View, Text, SafeAreaView, StyleSheet, StatusBar, Image, Alert, BackHandler} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import { LogoUntad } from '../../assets';
import { getData } from '../../utils';
import NetInfo from '@react-native-community/netinfo'

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const handleConnectInternet = state => {
      if (state.isConnected) {
        ReloadScreen();
      } else {
        Alert.alert('Perhatian!', 'Anda tidak terhubung dengan internet!', [
          {
            text: 'Ok!',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
      }
    };
    const ReloadScreen = async () => {
      const response = await getData('profile');
      setTimeout(() => {
        if (response) {
          navigation.replace('Main');
        } else {
          navigation.replace('Start');
        }
      }, 1500);
    };
    NetInfo.addEventListener(handleConnectInternet);
  },[])
  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={style.content}>
        <Image source={LogoUntad} style={style.background} />
        <Text style={style.backgroundText}>SIABSENSI UNTAD</Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: 150,
    height: 150,
  },
  backgroundText:{
    fontSize: 22,
    marginTop: 20,
    fontWeight: '900',
    color: COLORS.black,
  }
});
export default SplashScreen;
