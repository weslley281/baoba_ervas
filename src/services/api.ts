import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://baobabrasil.com.br/apiBaoba',
  //casa
  // baseURL: 'http://192.168.24.132:5000',
  //serviço
  baseURL: 'https://appbaoba.herokuapp.com/',
});
