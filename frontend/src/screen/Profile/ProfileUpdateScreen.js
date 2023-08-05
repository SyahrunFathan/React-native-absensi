import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import {NullPhoto} from '../../assets';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {Input} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {
  getData,
  setData,
  showError,
  showSuccess,
  updateMahasiswa,
} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

const ProfileUpdateScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telpon, setTelpon] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [id, setId] = useState();
  const [openDate, setOpenDate] = useState(false);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.errorCode) {
        setSelectedImage(response.assets[0]);
      } else {
        showError('Ups! Anda tidak memilih gambar!');
      }
    });
  };

  useEffect(() => {
    const Reload = async () => {
      const response = await getData('profile');
      setId(response?.result?.id);
      setUsername(response?.result?.name);
      setTempatLahir(response?.result?.tempat);
      setTanggalLahir(new Date(response?.result?.tanggal));
      setAlamat(response?.result?.alamat);
      setTelpon(response?.result?.telp);
    };
    Reload();
  }, [id]);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('tempatLahir', tempatLahir);
    formData.append('tanggalLahir', tanggalLahir.toISOString().split('T')[0]);
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
      const response = await updateMahasiswa(id, formData);
      if (response.status === 200) {
        showSuccess(response?.data?.message);
        await setData('profile', response?.data);
        navigation.navigate('Profile');
      }
    } catch (error) {
      if (
        (error.response && error.response.status === 404) ||
        error.response.status === 402
      ) {
        showError(error.response.data.message);
      } else {
        console.error(error.response);
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
                onPress={selectImage}
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
              <Text style={style.textLabel}>Tempat Lahir</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Enter your address'}
                  editable={true}
                  value={tempatLahir}
                  onChangeText={value => setTempatLahir(value)}
                />
                <View style={style.icon}>
                  <Icon name={'location-dot'} size={18} />
                </View>
              </View>
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Tanggal Lahir</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Enter your birth day'}
                  value={tanggalLahir.toISOString().split('T')[0]}
                  editable={false}
                  onChangeText={value => setTanggalLahir(value)}
                />
                <TouchableOpacity
                  onPress={() => setOpenDate(!openDate)}
                  style={style.icon}>
                  <Icon name={'calendar'} size={18} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>No.Telp / Wa</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Enter your birth day'}
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
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Alamat</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Enter your birth day'}
                  value={alamat}
                  editable={true}
                  onChangeText={value => setAlamat(value)}
                />
                <View style={style.icon}>
                  <Icon name={'location-arrow'} size={18} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <DatePicker
        modal
        open={openDate}
        date={tanggalLahir}
        onConfirm={date => {
          setTanggalLahir(date);
          setOpenDate(!openDate);
        }}
        onCancel={() => {
          setOpenDate(!openDate);
        }}
        mode="date"
      />
    </SafeAreaView>
  );
};
export default ProfileUpdateScreen;
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
