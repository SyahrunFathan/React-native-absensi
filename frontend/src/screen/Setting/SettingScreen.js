import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {Logout, getData, removeData} from '../../utils';

const SettingScreen = ({navigation}) => {
  const [profile, setProfile] = useState([]);
  const logoutAplikasi = async () => {
    Alert.alert('Perhatian!', 'Anda yakin keluar aplikasi?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => null,
      },
      {
        text: 'Ya, Keluar!',
        onPress: async () => {
          const response = await Logout();
          if (response) {
            await removeData('profile');
            navigation.replace('Start');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const AmbilData = async () => {
      const response = await getData('profile');
      setProfile(response?.result);
    };
    AmbilData();
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity
        style={style.content}
        onPress={
          profile?.role === 1
            ? () => navigation.push('ProfileUpdate')
            : profile.role === 2
            ? () => navigation.push('UpdateDosen')
            : () => navigation.push('UpdateAdmin')
        }>
        <View style={style.menuIcon}>
          <Icon name="user-gear" size={22} />
        </View>
        <View style={style.menuView}>
          <Text style={style.textMenu}>Update Profile</Text>
        </View>
      </TouchableOpacity>
      {profile?.role === 1 || profile?.role === 2 ? (
        <TouchableOpacity
          onPress={() => navigation.push('UbahPassword')}
          style={style.content}>
          <View style={style.menuIcon}>
            <Icon name="key" size={22} />
          </View>
          <View style={style.menuView}>
            <Text style={style.textMenu}>Ubah Password</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      {profile?.role === 3 && (
        <>
          <TouchableOpacity
            onPress={() => navigation.push('TambahJadwal')}
            style={style.content}>
            <View style={style.menuIcon}>
              <Icon name="calendar-plus" size={22} />
            </View>
            <View style={style.menuView}>
              <Text style={style.textMenu}>Tambah Jadwal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.content}>
            <View style={style.menuIcon}>
              <Icon name="plus" size={22} />
            </View>
            <View style={style.menuView}>
              <Text style={style.textMenu}>Tambah Mata Kuliah</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={logoutAplikasi} style={style.content}>
        <View style={style.menuIcon}>
          <Icon name="right-from-bracket" size={22} />
        </View>
        <View style={style.menuView}>
          <Text style={style.textMenu}>Keluar Dari Aplikasi</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 40,
  },
  menuView: {
    borderBottomWidth: 1,
    width: '100%',
    marginLeft: 12,
    justifyContent: 'center',
    height: 60,
  },
  textMenu: {fontSize: 20, marginTop: 10, color: COLORS.black},
});
