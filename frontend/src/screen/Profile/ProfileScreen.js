import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../assets/styles/Colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Default} from '../../assets';
import {Logout, getData, removeData} from '../../utils';

const ProfileScreen = ({navigation}) => {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const AmbilData = async () => {
      const response = await getData('profile');
      setProfile(response?.result);
    };
    AmbilData();
  }, [profile]);
  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View style={style.content}>
        <View style={style.contentHeader}>
          <TouchableOpacity
            onPress={() => navigation.push('Setting')}
            style={style.buttonSetting}>
            <Icon name="list" size={28} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={style.contentProfile}>
          <Image
            source={profile?.url ? {uri: profile?.url} : Default}
            style={style.imageProfile}
          />
          <View style={style.contentProfileRight}>
            <Text style={style.textBold}>{profile?.name}</Text>
            {profile?.role === 1 ? (
              <Text style={style.textReguler}>
                {profile?.role === 1 ? profile?.nim : profile?.nip}
              </Text>
            ) : profile?.role === 2 ? (
              <Text style={style.textReguler}>
                {profile?.role === 1 ? profile?.nim : profile?.nip}
              </Text>
            ) : null}
            <Text style={style.textLead}>
              {profile?.role === 1
                ? 'Mahasiswa'
                : profile?.role === 2
                ? 'Dosen'
                : 'Admin'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  contentHeader: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  buttonSetting: {
    width: 30,
  },
  contentProfile: {
    marginTop: 20,
    flexDirection: 'row',
  },
  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  contentProfileRight: {
    justifyContent: 'center',
    left: 12,
  },
  textBold: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textReguler: {
    color: COLORS.black,
    fontSize: 16,
  },
  textLead: {
    color: COLORS.grey,
    fontSize: 16,
  },
});

export default ProfileScreen;
