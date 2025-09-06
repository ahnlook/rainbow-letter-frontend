import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import modalSlice from 'store/modal/modal-slice';
import userSlice from 'store/user/user-slice';
import petSlice from 'store/pet/pet-slice';
import letterSlice from 'store/letter/letter-slice';
import adminLettersSlice from './admin/letters-slice';
import adminLetterSlice from './admin/letter-slice';
import adminLetterUiSlice from './admin/letterUi-slice';
import { setupListeners } from './listeners';
import adminUserLettersSlice from './admin/useLetter-slice';
import toolTipSlice from './toolTip/toolTip-slice';
import commonSlice from './common/common-slice';
import adminForeLettersSlice from './admin/foreLetters/letters-slice';
import adminForeLetterUiSlice from './admin/foreLetters/letterUi-slice';

export const listenerMiddleware = createListenerMiddleware();
export const { startListening, stopListening } = listenerMiddleware;

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    user: userSlice.reducer,
    pet: petSlice.reducer,
    letter: letterSlice.reducer,
    toolTip: toolTipSlice.reducer,
    common: commonSlice.reducer,
    adminLetters: adminLettersSlice.reducer,
    adminLetter: adminLetterSlice.reducer,
    adminLetterUi: adminLetterUiSlice.reducer,
    adminUserLetters: adminUserLettersSlice.reducer,
    adminForeLetters: adminForeLettersSlice.reducer,
    adminForeLetterUi: adminForeLetterUiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners({ startListening });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
