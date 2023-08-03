import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import COLORS from '../../assets/styles/Colors';

const Input = ({onChangeText, value, placeHolder, secureTextEntry, keyboardType}) => {
  return (
    <TextInput
      style={style.formInput}
      onChangeText={onChangeText}
      placeholder={placeHolder}
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

const style = StyleSheet.create({
  formInput: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 28,
    borderRadius: 10,
    shadowColor: COLORS.grey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default Input;
