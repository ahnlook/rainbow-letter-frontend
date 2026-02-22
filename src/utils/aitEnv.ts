export const isAitBuild = () =>
  process.env.REACT_APP_ENABLE_AIT_PROVIDER === 'true';

export const isAitRuntime = () => {
  if (!isAitBuild()) {
    return false;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(window.ReactNativeWebView);
};
