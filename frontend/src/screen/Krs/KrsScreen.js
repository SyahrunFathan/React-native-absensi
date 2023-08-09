import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import COLORS from '../../assets/styles/Colors';
import {
  getData,
  getDataMatkulJoinToJadwal,
  postKrs,
  setData,
  showError,
  showSuccess,
} from '../../utils';

const KrsScreen = ({navigation}) => {
  const [dataMatkul, setDataMatkul] = useState([]);
  const [selectedMatkulId, setSelectedMatkulId] = useState([]);
  const [matkulId, setMatkulId] = useState([]);

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

  useEffect(() => {
    const AmbilData = async () => {
      try {
        const response = await getDataMatkulJoinToJadwal();
        setDataMatkul(response?.data?.result);
      } catch (error) {
        console.error(error.response);
      }
    };

    AmbilData();
  }, [selectedMatkulId]);

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
            <Text style={[style.cell, style.headerCell]}>MK</Text>
            <Text style={[style.cell, style.headerCell]}>Jadwal</Text>
            <Text style={[style.cell, style.headerCell]}>Action</Text>
          </View>
          <View style={style.row}>
            <Text style={style.cell}>1</Text>
            <Text style={style.cell}>Pemrograman Mobile</Text>
            <Text style={style.cell}>Senin, 07.50.00</Text>
            <Text style={style.cell}></Text>
          </View>
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
