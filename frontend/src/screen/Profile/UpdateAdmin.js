import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import {NullPhoto} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {Input} from '../../components';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {
  getData,
  setData,
  showError,
  updateDataAdmin,
  useForm,
} from '../../utils';

const UpdateAdmin = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState('');
  const [isErrorPassword, setIsErrorPassword] = useState('');
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState('');
  const [id, setId] = useState();
  const [form, setForm] = useForm({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const pilihGambar = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel || response.errorCode) {
        showError('Ups! Sepertinya anda tidak memilih gambar!');
      } else {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('confirmPassword', form.confirmPassword);

    if (selectedImage) {
      formData.append('file', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
      });
    }

    try {
      const response = await updateDataAdmin(id, formData);
      if (response) {
        setIsErrorUsername('');
        setIsErrorPassword('');
        setIsErrorConfirmPassword('');

        await setData('profile', response?.data);
        navigation.navigate('Profile');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === 'username') {
          setIsErrorUsername(error.response.data.message);
        } else {
          setIsErrorUsername('');
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
      }
    }
  };

  useEffect(() => {
    const AmbilData = async () => {
      const response = await getData('profile');
      setId(response?.result?.id);
      setForm('username', response?.result?.name);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.content}>
          <View style={style.header}>
            <View style={style.headerContent}>
              <Image
                source={selectedImage ? {uri: selectedImage.uri} : NullPhoto}
                style={style.image}
              />
              <TouchableOpacity
                onPress={pilihGambar}
                style={style.buttonChange}>
                <Icon name="add" size={28} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.contentBody}>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Nama</Text>
              <View
                style={isErrorUsername ? [style.formError] : [style.formInput]}>
                <Input
                  placeHolder={'Enter your name'}
                  value={form.username}
                  onChangeText={value => setForm('username', value)}
                />
                <View style={style.icon}>
                  <Icon name={'user'} size={18} />
                </View>
              </View>
              {isErrorUsername && (
                <Text style={{color: COLORS.danger}}>{isErrorUsername}</Text>
              )}
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Password</Text>
              <View
                style={isErrorPassword ? [style.formError] : [style.formInput]}>
                <Input
                  placeHolder={'Enter your passwword'}
                  editable={true}
                  value={form.password}
                  onChangeText={value => setForm('password', value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={style.icon}>
                  {showPassword ? (
                    <Icon name={'eye'} size={18} />
                  ) : (
                    <Icon name={'eye-slash'} size={18} />
                  )}
                </TouchableOpacity>
              </View>
              {isErrorPassword && (
                <Text style={{color: COLORS.danger}}>{isErrorPassword}</Text>
              )}
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Confirm Password</Text>
              <View
                style={
                  isErrorConfirmPassword ? [style.formError] : [style.formInput]
                }>
                <Input
                  placeHolder={'Confirm password'}
                  editable={true}
                  value={form.confirmPassword}
                  onChangeText={value => setForm('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={style.icon}>
                  {showConfirmPassword ? (
                    <Icon name={'eye'} size={18} />
                  ) : (
                    <Icon name={'eye-slash'} size={18} />
                  )}
                </TouchableOpacity>
              </View>
              {isErrorConfirmPassword && (
                <Text style={{color: COLORS.danger}}>
                  {isErrorConfirmPassword}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateAdmin;
const style = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: COLORS.white,
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  buttonChange: {
    right: 25,
    top: 92,
  },
  contentBody: {
    marginTop: 20,
    marginBottom: 30,
  },
  contentForm: {
    marginLeft: 10,
  },
  textLabel: {
    color: COLORS.black,
    fontSize: 16,
  },
  formInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  formError: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 10,
    shadowColor: COLORS.grey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
});
