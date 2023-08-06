import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Input} from '../../components';
import {Picker} from '@react-native-picker/picker';
import COLORS from '../../assets/styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {
  createDataMataKuliah,
  generatorCode,
  getDataDosen,
  showError,
  showSuccess,
  useForm,
} from '../../utils';

const MatkulScreen = () => {
  const [dosen, setDosen] = useState([]);
  const [idDosen, setIdDosen] = useState('');
  const [matkul, setMatkul] = useState('');
  const [jumlahSks, setJumlahSks] = useState('');
  const [kodeMatkul, setKodeMatkul] = useState('');

  const genereteCode = async () => {
    const response = await generatorCode();
    setKodeMatkul(response.data.code);
  };

  const saveMatkul = async () => {
    const data = {
      idDosen: idDosen,
      matkul: matkul,
      jumlahSks: jumlahSks,
      kodeMatkul: kodeMatkul,
    };
    try {
      const response = await createDataMataKuliah(data);
      if (response) {
        genereteCode();
        showSuccess(response.data.message);
        setIdDosen('');
        setMatkul('');
        setJumlahSks('');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showError(error.response.data.message);
      } else {
        console.error(error.response);
      }
    }
  };

  useEffect(() => {
    const AmbilData = async () => {
      const response = await getDataDosen();
      setDosen(response?.data?.result);
    };
    AmbilData();
    genereteCode();
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.content}>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>Kode Mata Kuliah</Text>
            <View style={style.formInput}>
              <Input
                placeHolder={'Masukkan kode mata kuliah'}
                value={kodeMatkul}
                editable={false}
                onChangeText={text => setKodeMatkul(text)}
              />
              <View style={style.icon}>
                <Icon name={'key'} size={18} />
              </View>
            </View>
          </View>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>Mata Kuliah</Text>
            <View style={style.formInput}>
              <Input
                placeHolder={'Masukkan mata kuliah'}
                autoFocus={true}
                value={matkul}
                onChangeText={text => setMatkul(text)}
              />
              <View style={style.icon}>
                <Icon name={'book'} size={18} />
              </View>
            </View>
          </View>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>Jumlah SKS</Text>
            <View style={style.formInput}>
              <Input
                placeHolder={'0'}
                keyboardType={'numeric'}
                value={jumlahSks}
                onChangeText={text => setJumlahSks(text)}
              />
              <View style={style.icon}>
                <Icon name={'bars-progress'} size={18} />
              </View>
            </View>
          </View>
          <View style={style.contentForm}>
            <Text style={style.textLabel}>Dosen Pengajar</Text>
            <View style={style.formPicker}>
              <Picker
                selectedValue={idDosen}
                onValueChange={Item => {
                  setIdDosen(Item);
                }}>
                <Picker.Item label="-- Pilih Dosen --" value={''} />
                {dosen.map((Item, Index) => (
                  <Picker.Item
                    label={Item.nama_dosen}
                    value={Item.id_dosen}
                    key={Item.id_dosen}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={style.contentForm}>
            <TouchableOpacity onPress={saveMatkul} style={style.button}>
              <Text style={style.textButton}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatkulScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  contentForm: {
    marginVertical: 10,
  },
  textLabel: {
    color: COLORS.black,
    fontSize: 16,
  },
  formInput: {
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {position: 'absolute', right: 12},
  formPicker: {
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
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {color: COLORS.white, fontSize: 16, fontWeight: '700'},
});
