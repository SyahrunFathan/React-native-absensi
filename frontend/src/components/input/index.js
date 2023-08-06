import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import COLORS from '../../assets/styles/Colors';

const Input = ({
  onChangeText,
  value,
  placeHolder,
  secureTextEntry,
  keyboardType,
  editable,
}) => {
  return (
    <TextInput
      style={style.formInput}
      onChangeText={onChangeText}
      placeholder={placeHolder}
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      editable={editable}
    />
  );
};

const style = StyleSheet.create({
  formInput: {
    width: '100%',
    paddingLeft: 14,
    fontSize: 16,
    borderColor: COLORS.grey,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: COLORS.grey,
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 10,
  },
});

export default Input;
