import store from 'store';

export const getCurrentLanguage = (): string => {
  const state = store.getState();

  return state.common.lng || 'en';
};
