import DefaultImage from 'assets/Logo_256px.png';

export const formatImageType = (data?: string) => {
  if (!data) return DefaultImage;

  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_URL
      : process.env.REACT_APP_API_URL;
  return `${baseURL}/api/images/resources/${data}`;
};

export const formatImageRoute = (data?: string) => {
  if (!data) return DefaultImage;
  const filterdData = data.replace(/^\/static\//, '');
  const ASSETS_URL = process.env.REACT_APP_STATIC_IMAGE_URL;

  return `${ASSETS_URL}/${filterdData}`;
};
