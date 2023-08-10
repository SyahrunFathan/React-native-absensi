import axios from "axios";
import { getData } from "../storage/Storage";

const API = axios.create({baseURL: 'http://192.168.1.2:5001'});

API.interceptors.request.use(async req => {
  const response = await getData('profile');
  if (response?.token) {
    req.headers.Authorization = `Bearer ${response?.token}`;
  }
  return req;
});

// Login Aplikasi
export const Login = async data => {
  return API.post('/auth/login', data);
};

// Logout Aplikasi
export const Logout = async id => {
  return API.delete(`/auth/logout/${id}`);
};

// Mahasiswa
export const updateMahasiswa = async (id, data) => {
  return API.patch(`/mahasiswa/update/${id}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Admin
export const updateDataAdmin = async (id, data) => {
  return API.patch(`/admin/update/${id}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Update Password
export const updateDataPassword = async (id, data) => {
  return API.patch(`/auth/update_password/${id}`, data);
};

// Dosen
export const getDataDosen = async () => API.get('/dosen/data');
export const updateDataDosen = async (id, data) => {
  return API.patch(`/dosen/update_data_dosen/${id}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

//  Mata kuliah
export const createDataMataKuliah = async data =>
  API.post('/mata_kuliah/create_data', data);
export const generatorCode = async () => API.get('/mata_kuliah/generator_code');
export const getDataMatkul = async () => API.get('/mata_kuliah/get_data');
export const getDataMatkulJoinToJadwal = async id =>
  API.get(`/mata_kuliah/get_data_join/${id}`);

// Jadwal
export const postJadwal = async data => API.post('/jadwal/post', data);

// Krs
export const postKrs = async data => API.post('/krs/post_krs', data);
export const getDataKrsJoin = async id => API.get(`/krs/get_data/${id}`);
export const deleteKrs = async id => API.delete(`/krs/delete/${id}`);