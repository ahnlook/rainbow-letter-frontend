import axios from 'axios';

import { getToken, removeToken } from 'utils/localStorage';
import { getCurrentLanguage } from 'utils/language';

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = process.env.REACT_APP_API_URL_LEGACY;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: '',
  },
});

const logout = () => {
  removeToken();
  const currentLanguage = getCurrentLanguage();
  const message =
    currentLanguage === 'ko'
      ? `로그인을 하시면\n더 많은 페이지를 둘러볼 수 있어요`
      : 'You can browse more pages by logging in.';
  alert(message);
  window.location.href = '/login';
  Promise.reject(new Error('Token is expired'));
};

baseInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    const newConfig = { ...config };

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    const currentLanguage = getCurrentLanguage();
    newConfig.headers['Accept-Language'] = currentLanguage;

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return logout();
    }

    return Promise.reject(error);
  }
);

const apiRequest = {
  get: (url, request) => baseInstance.get(url, request),
  post: (url, data, config) => baseInstance.post(url, data, { ...config }),
  put: (url, data, config) => baseInstance.put(url, data, { ...config }),
  delete: (url, config) => baseInstance.delete(url, config),
};

export default apiRequest;
