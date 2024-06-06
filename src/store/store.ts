import { configureStore } from '@reduxjs/toolkit';
import productSlice from './ProductSlice';

const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
