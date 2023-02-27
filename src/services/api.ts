import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://192.168.1.9:5000/',
  //casa
  baseURL: 'http://192.168.15.41:5000',
  //serviço
  // baseURL: 'https://apibaoba.herokuapp.com/',
});
