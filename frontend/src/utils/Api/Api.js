import axios from "axios";
import { getData } from "../storage/Storage";

const API = axios.create({baseURL: 'http://192.168.1.12:5001'});

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

// Update data mahasiswa
export const updateMahasiswa = async (id, data) => {
  return API.patch(`/mahasiswa/update/${id}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Update data dosen
export const updateDataDosen = async(id, data) => {
  return API.patch(`/dosen/update_data_dosen/${id}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
}

// Update data admin
export const updateDataAdmin = async (id, data) => {
  return API.patch(`/admin/update/${id}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Update Password
export const updateDataPassword = async(id, data) => {
  return API.patch(`/auth/update_password/${id}`, data)
}