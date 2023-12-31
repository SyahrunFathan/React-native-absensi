import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AbsenScreen,
  HomeScreen,
  JadwalScreen,
  KehadiranScreen,
  LoginScreen,
  ProfileScreen,
  ProfileUpdateScreen,
  SettingScreen,
  SplashScreen,
  StartScreen,
  UpdateDosen,
  TambahJadwal,
  UpdateAdmin,
  PasswordUpdate,
  MatkulScreen,
  KrsScreen,
  AddDosenScreen,
  AddMahasiswaScreen,
} from '../screen';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../assets/styles/Colors';
import {getData} from '../utils';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const AmbilData = async () => {
      const response = await getData('profile');
      setProfile(response?.result);
    };
    AmbilData();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? size + 5 : size;
          } else if (route.name === 'Jadwal') {
            iconName = focused ? 'calendar-number' : 'calendar-number-outline';
            size = focused ? size + 5 : size;
          } else if (route.name === 'Kehadiran') {
            iconName = focused
              ? 'checkmark-done-circle'
              : 'checkmark-done-circle-outline';
            size = focused ? size + 5 : size;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            size = focused ? size + 5 : size;
          } else if (route.name === 'Absen') {
            iconName = focused
              ? 'checkmark-done-circle'
              : 'checkmark-done-circle-outline';
            size = focused ? size + 5 : size;
          } else if (route.name === 'AddDosen') {
            iconName = focused ? 'person-add' : 'person-add-outline';
            size = focused ? size + 5 : size;
          } else if (route.name === 'AddMahasiswa') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            size = focused ? size + 5 : size;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 14,
        },
        tabBarStyle: {
          padding: 5,
          height: 60,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {profile?.role === 1 && profile?.role === 2 ? (
        <Tab.Screen
          name="Jadwal"
          component={JadwalScreen}
          options={{
            title: 'Jadwal Saya',
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
      ) : (
        <Tab.Screen
          name="AddMahasiswa"
          component={AddMahasiswaScreen}
          options={{
            headerShown: true,
            title: 'Mahasiswa',
            headerTitle: 'Tambah Mahasiswa',
            headerTitleAlign: 'center',
          }}
        />
      )}
      {profile?.role === 1 ? (
        <Tab.Screen name="Kehadiran" component={KehadiranScreen} />
      ) : profile?.role === 2 ? (
        <Tab.Screen name="Absen" component={AbsenScreen} />
      ) : (
        <Tab.Screen
          name="AddDosen"
          component={AddDosenScreen}
          options={{headerShown: false, title: 'Dosen'}}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: true,
          title: 'Pengaturan',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ProfileUpdate"
        component={ProfileUpdateScreen}
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="UpdateDosen"
        component={UpdateDosen}
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="UpdateAdmin"
        component={UpdateAdmin}
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="TambahJadwal"
        component={TambahJadwal}
        options={{
          headerShown: true,
          title: 'Jadwal Manajemen',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Matkul"
        component={MatkulScreen}
        options={{
          headerShown: true,
          title: 'Perkuliahan',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: COLORS.black,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="UbahPassword"
        component={PasswordUpdate}
        options={{
          headerShown: true,
          title: 'Keamanan Akun',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Krs"
        component={KrsScreen}
        options={{
          headerShown: true,
          title: 'Perencanaan Studi',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
