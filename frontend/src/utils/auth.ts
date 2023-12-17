import {API} from './api';

interface SignInData {
  email: string;
  password: string;
  username?:string;
}

const signIn = async (userData: SignInData) => {
  const response = await API.post('/auth/login', userData);
  console.log(response, 'res');
  return response.data;
};

const signUp = async (userData: SignInData) => {
  const response = await API.post('/auth/register', userData);
  console.log(response, 'res');
  return response.data;
};

const getTrafficLights = async () => {
  const response = await API.get('/trafficLights')
  return response.data
}

const getAllInterceptions = async () => {
  const response = await API.get('/interceptions')
  return response.data
}

export default {signIn, signUp, getTrafficLights, getAllInterceptions};
