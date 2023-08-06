import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {BackLeft} from '../../assets';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {Login, setData, showError, useForm} from '../../utils';
import COLORS from '../../assets/styles/Colors';
import {Input} from '../../components';

const LoginScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useForm({username: '', password: '', role: ''});

  const checkLogin = async () => {
    try {
      const response = await Login(form);
      if (response) {
        await setData('profile', response?.data);
        navigation.replace('Main');
      }
    } catch (error) {
      if (
        (error.response && error.response.status === 404) ||
        error.response.status === 400
      ) {
        showError(error.response.data.message);
      } else {
        console.error(error.response);
      }
    }
  };
  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={style.contentHeader}>
        <TouchableOpacity
          style={style.buttonBack}
          onPress={() => navigation.goBack()}>
          <Image source={BackLeft} style={style.buttonBack} />
        </TouchableOpacity>
        <View style={style.contentText}>
          <Text style={style.textWelcome}>Selamat datang! 👋</Text>
          <Text>
            Sistem Informasi Absensi!{'\n'}
            <Text style={style.textLead}>Universitas Tadulako 👨‍🎓</Text>
          </Text>
        </View>
      </View>
      <View style={style.content}>
        <View style={style.viewContentForm}>
          <Text style={style.textLabel}>Username</Text>
          <View style={style.viewForm}>
            <Input
              onChangeText={text => setForm('username', text)}
              placeHolder="Enter your username"
              value={form.username}
            />
            <View style={style.icon}>
              <Icon name="person" size={18} />
            </View>
          </View>
        </View>
        <View style={style.viewContentForm}>
          <Text style={style.textLabel}>Password</Text>
          <View style={style.viewForm}>
            <Input
              onChangeText={text => setForm('password', text)}
              value={form.password}
              placeHolder="Enter your password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={style.icon}>
              {showPassword ? (
                <Icon name="eye" size={18} />
              ) : (
                <Icon name="eye-off" size={18} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.viewContentForm}>
          <Text style={style.textLabel}>Akses</Text>
          <View style={style.viewForm}>
            <View style={style.formInput}>
              <Picker
                selectedValue={form.role}
                onValueChange={(itemValue, itemIndex) => {
                  setForm('role', itemValue);
                }}
                style={style.picker}>
                <Picker.Item label="-- Pilih Akses --" value="" />
                <Picker.Item label="Mahasiswa" value={1} />
                <Picker.Item label="Dosen" value={2} />
              </Picker>
            </View>
          </View>
        </View>
      </View>
      <View style={style.footer}>
        <TouchableOpacity onPress={checkLogin} style={style.buttonLogin}>
          <Text style={style.textLogin}>Sign In</Text>
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
  contentHeader: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  buttonBack: {
    width: 27,
    height: 27,
  },
  contentText: {
    marginTop: 60,
  },
  textWelcome: {
    fontSize: 24,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  textLead: {
    color: COLORS.black,
    fontWeight: '700',
  },
  content: {
    marginHorizontal: 20,
    marginTop: 60,
  },
  textLabel: {
    color: COLORS.black,
    fontSize: 16,
  },
  viewForm: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  formInput: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 28,
    borderRadius: 10,
    shadowColor: COLORS.grey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
  viewContentForm: {
    marginBottom: 10,
  },
  footer: {
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: COLORS.grey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  textLogin: {
    textTransform: 'uppercase',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: '110%',
  },
});
export default LoginScreen;
