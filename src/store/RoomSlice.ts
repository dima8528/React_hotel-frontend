import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Room } from 'types/Room';
import { toast } from 'react-toastify';
import { RootState } from './store';

export interface RoomState {
  rooms: Room[];
  cart: Room[];
  cartTotalNights: number;
  cartTotalAmount: number;
  isLogedIn: boolean;
}

const initialState: RoomState = {
  rooms: [],
  cart: [],
  cartTotalNights: 0,
  cartTotalAmount: 0,
  isLogedIn: false,
};

type CartTotal = {
  total: number;
  nights: number;
};

const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    toast.error('The page can\'t load');
  }
};

const saveState = (key: string, state: Room[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    toast.error('The room has not been removed from booked ones');
  }
};

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    ...initialState,
    cart: loadState('cart') || initialState.cart,
  },
  reducers: {
    setCart: (state, action: PayloadAction<Room[]>) => {
      state.cart = action.payload;
      saveState('cart', action.payload);
    },
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    addToCart: (state, action: PayloadAction<Room>) => {
      const index = state.cart.findIndex(
        (room: Room) => room.id === action.payload.id,
      );

      if (index >= 0) {
        state.cart[index] = {
          ...state.cart[index],
          nights: state.cart[index].nights + 1,
        };
      } else {
        const roomToAdd = { ...action.payload, nights: 1 };
        state.cart.push(roomToAdd);
      }

      saveState('cart', state.cart);
    },

    removeFromCart: (state, action: PayloadAction<Room>) => {
      const roomToRemove: Room = action.payload;
      const index = state.cart.findIndex(
        (room: Room) => room.id === roomToRemove.id,
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
        saveState('cart', state.cart);
      }
    },

    decreaseCart: (state, action: PayloadAction<Room>) => {
      const decreaseItem = state.cart.find(
        (item: Room) => item.id === action.payload.id,
      );
      if (decreaseItem && decreaseItem.nights > 1) {
        decreaseItem.nights -= 1;
        saveState('cart', state.cart);
      }
    },

    getTotals(state) {
      // eslint-disable-next-line prefer-const
      let { total, nights } : CartTotal = state.cart.reduce(
        (cartTotal: CartTotal, cartItem: Room) => {
          const { pricePerNight, nights } = cartItem;
          const itemTotal = pricePerNight * nights;

          cartTotal.total += itemTotal;
          cartTotal.nights += nights;

          return cartTotal;
        },
        {
          total: 0,
          nights: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalNights = nights;
      state.cartTotalAmount = total;
    },

    clearCart(state) {
      state.cart = [];
      saveState('cart', state.cart);
  },

    toggleIsLogedIn(state) {
      state.isLogedIn = !state.isLogedIn;
    }
  },
});

export const selectIsLogedIn = (state: RootState) => state.room.isLogedIn;

export const {
  setCart,
  setRooms,
  addToCart,
  removeFromCart,
  decreaseCart,
  getTotals,
  clearCart,
  toggleIsLogedIn
} = roomSlice.actions;

export default roomSlice.reducer;
