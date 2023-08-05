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
import {
  getData,
  setData,
  showError,
  showSuccess,
  updateDataDosen,
} from '../../utils';
import {Input} from '../../components';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';

const UpdateDosen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telpon, setTelpon] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  useEffect(() => {
    const AmbilData = async () => {
      const response = await getData('profile');
      setId(response?.result?.id);
      setUsername(response?.result?.name);
      setAlamat(response?.result?.alamat);
      setTelpon(response?.result?.telp);
    };
    AmbilData();
  }, [id]);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('alamat', alamat);
    formData.append('telpon', telpon);

    if (selectedImage) {
      formData.append('file', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
      });
    }

    try {
      const response = await updateDataDosen(id, formData);
      if (response) {
        showSuccess(response.data.message);
        await setData('profile', response?.data);
        navigation.navigate('Profile');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showError(error.response.data.message);
      } else {
        console.log(error.request);
      }
    }
  };

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
              <View style={style.formInput}>
                <Input
                  placeHolder={'Enter your name'}
                  value={username}
                  onChangeText={value => setUsername(value)}
                />
                <View style={style.icon}>
                  <Icon name={'user'} size={18} />
                </View>
              </View>
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Alamat</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Enter your address'}
                  editable={true}
                  value={alamat}
                  onChangeText={value => setAlamat(value)}
                />
                <View style={style.icon}>
                  <Icon name={'location-dot'} size={18} />
                </View>
              </View>
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>No.Telp / Wa</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Enter your phone number'}
                  value={telpon}
                  editable={true}
                  onChangeText={value => setTelpon(value)}
                  keyboardType={'numeric'}
                />
                <View style={style.icon}>
                  <Icon name={'phone'} size={18} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateDosen;

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
  icon: {
    position: 'absolute',
    right: 12,
  },
});
