import { configureStore } from '@reduxjs/toolkit';
import roomSlice from './RoomSlice';

const store = configureStore({
  reducer: {
    room: roomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
