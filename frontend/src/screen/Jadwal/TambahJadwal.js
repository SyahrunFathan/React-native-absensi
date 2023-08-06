import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import {Input} from '../../components';
import {Picker} from '@react-native-picker/picker';
import {getDataMatkul, postJadwal, showError, showSuccess} from '../../utils';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';

const TambahJadwal = ({navigation}) => {
  const [matkul, setMatkul] = useState([]);
  const [hari, sethari] = useState('');
  const [idMatkul, setIdMatkul] = useState('');
  const [jamMulai, setJamMulai] = useState(new Date());
  const [jamSelesai, setJamSelesai] = useState(new Date());
  const [openTimeStart, setOpenTimeStart] = useState(false);
  const [sks, setSks] = useState();

  const handleSubmit = async () => {
    const data = {
      idMatkul: idMatkul,
      hari: hari,
      jamMulai: jamMulai,
      jamSelesai: jamSelesai,
    };

    try {
      const response = await postJadwal(data);
      if (response) {
        showSuccess(response.data.message);
        setIdMatkul('');
        sethari('');
        setJamMulai(new Date());
        setJamSelesai(new Date());
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
      const response = await getDataMatkul();
      setMatkul(response.data.result);
    };
    AmbilData();
  }, []);

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
          <Text style={style.textLabel}>Mata Kuliah</Text>
          <View style={style.formPicker}>
            <Picker
              selectedValue={idMatkul}
              onValueChange={value => {
                setIdMatkul(value);
                const selectedMatkul = matkul.find(
                  item => item.id_matkul === value,
                );
                if (selectedMatkul) {
                  setSks(selectedMatkul.sks_matkul);
                  sethari('');
                  setJamMulai(new Date());
                  setJamSelesai(new Date());
                } else {
                  sethari('');
                  setJamMulai(new Date());
                  setJamSelesai(new Date());
                  setSks(0);
                }
              }}>
              <Picker.Item label="-- Pilih Mata Kuliah --" />
              {matkul.map(item => (
                <Picker.Item
                  label={item.nama_matkul}
                  value={item.id_matkul}
                  key={item.id_matkul}
                />
              ))}
            </Picker>
          </View>
        </View>
        {idMatkul && (
          <>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Hari</Text>
              <View style={style.formPicker}>
                <Picker
                  selectedValue={hari}
                  onValueChange={value => sethari(value)}>
                  <Picker.Item label="-- Pilih Hari --" value="" />
                  <Picker.Item label="Senin" value="Senin" />
                  <Picker.Item label="Selasa" value="Selasa" />
                  <Picker.Item label="Rabu" value="Rabu" />
                  <Picker.Item label="Kamis" value="Kamis" />
                  <Picker.Item label="Jumat" value="Jumat" />
                </Picker>
              </View>
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Jam Mulai</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Masukkan Jam Mulai'}
                  value={jamMulai.toISOString().split('T')[1].split('.')[0]}
                  onChangeText={text => setJamMulai(text)}
                  editable={false}
                />
                <TouchableOpacity
                  onPress={() => setOpenTimeStart(!openTimeStart)}
                  style={{position: 'absolute', right: 12}}>
                  <Icon name={'clock'} size={18} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.contentForm}>
              <Text style={style.textLabel}>Jam Selesai</Text>
              <View style={style.formInput}>
                <Input
                  placeHolder={'Masukkan Jam Selesai'}
                  value={jamSelesai.toISOString().split('T')[1].split('.')[0]}
                  onChangeText={text => setJamSelesai(text)}
                  editable={false}
                />
                <View style={{position: 'absolute', right: 12}}>
                  <Icon name={'clock'} size={18} />
                </View>
              </View>
            </View>
          </>
        )}
      </View>
      <DatePicker
        modal
        open={openTimeStart}
        date={jamMulai}
        onConfirm={date => {
          setJamMulai(date);
          if (sks) {
            const sksInMinutes = sks * 60;
            const newTime = new Date(date.getTime() + sksInMinutes * 60000);

            const hours = newTime.getHours();
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);

            if (hours >= 24) {
              newTime.setHours(hours - 24);
              newTime.setDate(nextDay.getDate());
            }

            setJamSelesai(newTime);
          }
          setOpenTimeStart(!openTimeStart);
        }}
        onCancel={() => {
          setOpenTimeStart(!openTimeStart);
        }}
        mode="time"
      />
    </SafeAreaView>
  );
};

export default TambahJadwal;
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
  textLabel: {
    color: COLORS.black,
    fontSize: 16,
  },
  formInput: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});
