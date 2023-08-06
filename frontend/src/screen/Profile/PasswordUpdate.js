import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import {Input} from '../../components';
import {getData, showSuccess, updateDataPassword, useForm} from '../../utils';

const PasswordUpdate = ({navigation}) => {
  const [id, setId] = useState();
  const [isErrorPasswordOld, setIsErrorPasswordOld] = useState('');
  const [isErrorPassword, setIsErrorPassword] = useState('');
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState('');
  const [form, setForm] = useForm({
    passwordOld: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await updateDataPassword(id, form);
      if (response) {
        showSuccess(response.data.message);
        navigation.navigate('Profile');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === 'passwordOld') {
          setIsErrorPasswordOld(error.response.data.message);
        } else {
          setIsErrorPasswordOld('');
        }

        if (error.response.data.error === 'password') {
          setIsErrorPassword(error.response.data.message);
        } else {
          setIsErrorPassword('');
        }

        if (error.response.data.error === 'confirmPassword') {
          setIsErrorConfirmPassword(error.response.data.message);
        } else {
          setIsErrorConfirmPassword('');
        }
      } else {
        console.error(error.response);
      }
    }
  };

  useEffect(() => {
    const AmbilData = async () => {
      const response = await getData('profile');
      setId(response?.result?.id);
      setForm('role', response?.result?.role);
    };
    AmbilData();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={{color: COLORS.primary, fontSize: 16}}>Selesai</Text>
        </TouchableOpacity>
      ),
    });
  }, [handleSubmit]);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <View style={style.contentForm}>
          <Text style={style.textLabel}>Password Lama</Text>
          <View
            style={isErrorPasswordOld ? [style.formError] : [style.formInput]}>
            <Input
              placeHolder={'Enter your old password'}
              secureTextEntry={true}
              value={form.passwordOld}
              onChangeText={text => setForm('passwordOld', text)}
            />
          </View>
        </View>
        {isErrorPasswordOld && (
          <Text style={{color: COLORS.danger}}>{isErrorPasswordOld}</Text>
        )}
        <View style={style.contentForm}>
          <Text style={style.textLabel}>Password Baru</Text>
          <View style={isErrorPassword ? [style.formError] : [style.formInput]}>
            <Input
              placeHolder={'Enter your new password'}
              secureTextEntry={true}
              value={form.password}
              onChangeText={text => setForm('password', text)}
            />
          </View>
        </View>
        {isErrorPassword && (
          <Text style={{color: COLORS.danger}}>{isErrorPassword}</Text>
        )}
        <View style={style.contentForm}>
          <Text style={style.textLabel}>Konfirmasi Password</Text>
          <View
            style={
              isErrorConfirmPassword ? [style.formError] : [style.formInput]
            }>
            <Input
              placeHolder={'Confirm your password'}
              secureTextEntry={true}
              value={form.confirmPassword}
              onChangeText={text => setForm('confirmPassword', text)}
            />
          </View>
          {isErrorConfirmPassword && (
            <Text style={{color: COLORS.danger}}>{isErrorConfirmPassword}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordUpdate;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  contentForm: {
    marginVertical: 10,
  },
  formInput: {
    marginTop: 10,
  },
  formError: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.danger,
  },
});
