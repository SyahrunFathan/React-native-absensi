import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  deleteKrs,
  getData,
  getDataKrsJoin,
  getDataMatkulJoinToJadwal,
  postKrs,
  showError,
  showSuccess,
} from '../../utils';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../../assets/styles/Colors';

const KrsScreen = ({navigation}) => {
  const [dataMatkul, setDataMatkul] = useState([]);
  const [selectedMatkulId, setSelectedMatkulId] = useState([]);
  const [dataKrs, setDataKrs] = useState([]);

  const handleCheckBox = itemId => {
    if (selectedMatkulId.includes(itemId)) {
      setSelectedMatkulId(prevSelectedId =>
        prevSelectedId.filter(id => id !== itemId),
      );
    } else {
      setSelectedMatkulId(prevSelectedId => [...prevSelectedId, itemId]);
    }
  };

  const handleSubmit = async () => {
    const response = await getData('profile');
    const data = {
      mhs_id: response?.result?.id,
      matkul_id: selectedMatkulId,
    };

    try {
      const response = await postKrs(data);
      if (response) {
        showSuccess(response?.data?.message);
        setSelectedMatkulId([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showError(error.response.data.message);
      } else {
        console.error(error.response);
      }
    }
  };

  const hapusProgram = async itemId => {
    Alert.alert('Perhatian!', 'Anda yakin menghapus mk ini?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => null,
      },
      {
        text: 'Ya, Hapus!',
        onPress: async () => {
          try {
            const response = await deleteKrs(itemId);
            if (response) {
              showSuccess(response.data.message);
            }
          } catch (error) {
            if (error.response) {
              console.error(error.response);
            }
          }
        },
      },
    ]);
  };
  useEffect(() => {
    const AmbilData = async () => {
      try {
        const profile = await getData('profile');
        const response = await getDataMatkulJoinToJadwal(profile?.result?.id);
        const getdata = await getDataKrsJoin(profile?.result?.id);
        setDataMatkul(response?.data?.result);
        setDataKrs(getdata?.data?.result);
      } catch (error) {
        console.error(error.response);
      }
    };

    AmbilData();
  }, [selectedMatkulId, dataMatkul]);

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
          {dataMatkul.length > 0 ? (
            dataMatkul.map(item => (
              <View style={style.cardMatkul} key={item.id_matkul}>
                <View style={style.cardLeft}>
                  <Text style={{color: COLORS.black, fontSize: 16}}>
                    {item.nama_matkul}
                  </Text>
                  <Text>
                    {item.jadwal[0].hari}, {item.jadwal[0].jam_mulai} -{' '}
                    {item.jadwal[0].jam_selesai}
                  </Text>
                </View>
                <View style={style.cardRight}>
                  <CheckBox
                    disabled={false}
                    value={selectedMatkulId.includes(item.id_matkul)}
                    onValueChange={() => handleCheckBox(item.id_matkul)}
                  />
                </View>
              </View>
            ))
          ) : (
            <View style={[style.cardMatkul]}>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 24,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}>
                Mata Kuliah Masih Kosong
              </Text>
            </View>
          )}
          {}
        </View>
        <View style={style.textContainer}>
          <Text style={style.textLabel}>KRS Saya : </Text>
        </View>
        <View style={style.tableContent}>
          <View style={[style.headerRow, style.row]}>
            <Text style={[style.cell, style.headerCell]}>No</Text>
            <Text style={[style.cell, style.headerCell]}>Kode</Text>
            <Text style={[style.cell, style.headerCell]}>MK</Text>
            <Text style={[style.cell, style.headerCell]}>Jadwal</Text>
            <Text style={[style.cell, style.headerCell]}>#</Text>
          </View>
          {dataKrs.map((item, index) => (
            <View style={style.row} key={item.id_krs}>
              <Text style={style.cell}>{index + 1}</Text>
              <Text style={style.cell}>{item.tb_matkul.kode_matkul}</Text>
              <Text style={style.cell}>{item.tb_matkul.nama_matkul}</Text>
              <Text style={style.cell}>
                {item.tb_matkul.jadwal[0].hari},{' '}
                {item.tb_matkul.jadwal[0].jam_mulai} -{' '}
                {item.tb_matkul.jadwal[0].jam_selesai}
              </Text>
              <TouchableOpacity
                onPress={() => hapusProgram(item.id_krs)}
                style={style.cell}>
                <Icon
                  name={'close-circle-outline'}
                  size={28}
                  color={COLORS.danger}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KrsScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cardMatkul: {
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderColor: COLORS.grey,
    marginTop: 10,
  },
  cardLeft: {
    flexDirection: 'column',
  },
  tableContent: {
    borderWidth: 1,
    flexDirection: 'column',
    borderColor: COLORS.black,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: COLORS.grey,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  textLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
});
