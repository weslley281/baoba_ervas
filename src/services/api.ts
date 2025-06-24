import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://192.168.1.3:5000/',
  //casa
  baseURL: 'http://127.0.0.1',
  //serviço
  // baseURL: 'https://apibaoba.herokuapp.com/',
});
