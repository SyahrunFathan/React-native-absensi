import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {Input} from '../../components';
import {
  createDataMahasiswa,
  generatorNimMahasiswa,
  showError,
  showSuccess,
} from '../../utils';

const AddMahasiswaScreen = ({navigation}) => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telp, setTelp] = useState('');
  const resetState = () => {
    setNama('');
    setAlamat('');
    setTelp('');
  };

  const handleSubmit = async () => {
    try {
      const data = {
        nim: nim,
        nama: nama,
        alamat: alamat,
        telp: telp,
        role: 1,
      };
      const response = await createDataMahasiswa(data);
      if (response) {
        showSuccess(response.data.message);
        ambilNimMahasiswa();
        resetState();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showError(error.response.data.message);
      }
    }
  };

  const ambilNimMahasiswa = async () => {
    const response = await generatorNimMahasiswa();
    setNim(response.data.result);
  };

  useEffect(() => {
    ambilNimMahasiswa();
    resetState();
  }, [nim]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit} style={{marginRight: 10}}>
          <Text style={{color: COLORS.primary, fontSize: 16}}>Selesai</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
          <Text style={{color: COLORS.primary, fontSize: 16}}>Kembali</Text>
        </TouchableOpacity>
      ),
    });
  }, [handleSubmit]);
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.content}>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>NIM/Stambuk</Text>
            <View style={style.formInput}>
              <Input
                placeHolder={'Inputkan Nim Mahasiswa'}
                value={nim}
                editable={false}
              />
              <View style={style.icon}>
                <Icon name={'address-card'} size={18} />
              </View>
            </View>
          </View>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>Nama Mahasiswa</Text>
            <View style={style.formInput}>
              <Input
                placeHolder={'Inputkan Nama Mahasiswa'}
                value={nama}
                onChangeText={text => setNama(text)}
              />
              <View style={style.icon}>
                <Icon name={'user'} size={18} />
              </View>
            </View>
          </View>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>Alamat Mahasiswa</Text>
            <View style={style.formInput}>
              <Input
                placeHolder={'Inputkan Alamat Mahasiswa'}
                value={alamat}
                onChangeText={text => setAlamat(text)}
              />
              <View style={style.icon}>
                <Icon name={'location-dot'} size={18} />
              </View>
            </View>
          </View>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>No.Telp/WA</Text>
            <View style={style.formInput}>
              <Input
                placeHolder={'Inputkan Nama Mahasiswa'}
                value={telp}
                onChangeText={text => setTelp(text)}
                maxLength={12}
                keyboardType={'numeric'}
              />
              <View style={style.icon}>
                <Icon name={'phone'} size={18} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMahasiswaScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  contentForm: {
    marginTop: 20,
    marginBottom: 10,
  },
  textLabel: {
    color: COLORS.black,
    fontSize: 16,
    marginBottom: 10,
  },
  formInput: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
});
