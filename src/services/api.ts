import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://baobabrasil.com.br/apiBaoba',
});
