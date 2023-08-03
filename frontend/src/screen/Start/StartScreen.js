import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import {Welcome} from '../../assets';

const StartScreen = ({navigation}) => {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={style.imageView}>
        <Image source={Welcome} style={style.image} />
      </View>
      <View style={style.content}>
        <Text style={style.textSiabsensi}>SIABSENSI UNTAD</Text>
        <Text>Sistem Informasi Absensi Universitas Tadulako</Text>
        <TouchableOpacity onPress={() => navigation.push('Login')} style={style.buttonStart}>
          <Text style={style.textButton}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageView: {
    width: '100%',
    height: 300,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  image: {
    width: '100%',
    height: 280,
    objectFit: 'cover',
  },
  content: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSiabsensi: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: '800',
  },
  buttonStart: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: 130,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: COLORS.grey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textButton: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '700',
  },
});
export default StartScreen;
