import { RoomType } from 'types/RoomType';
import { Room } from 'types/Room';
import { User } from 'types/User';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// export const API_URL = 'https://node-hotel-backend.onrender.com';
export const API_URL = 'http://localhost:5005';

export function getRooms(): Promise<Room[]> {
  return fetch(API_URL + '/rooms').then(response => response.json());
}

export function getOneRoom(id: string): Promise<Room> {
  return fetch(API_URL + `/rooms/${id}`).then(response => response.json());
}

export function getBestRooms(): Promise<Room[]> {
  return fetch(API_URL + `/rooms/best`).then(response =>
    response.json(),
  );
}

export const getCheapestRooms = (): Promise<Room[]> => {
  return fetch(API_URL + `/rooms/cheapest`).then(response =>
    response.json(),
  );
};

export const getRoomTypes = (): Promise<RoomType[]> => {
  return fetch(API_URL + '/roomTypes').then(response => response.json());
}

export const getRoomTypeById = (id: number): Promise<RoomType> => {
  return fetch(API_URL + `/roomTypes/${id}`).then(response => response.json());
};

export const getInstanceOfType = (id: number): Promise<Room> => {
  return fetch(API_URL + `/roomTypes/instance/${id}`).then(response => response.json());
}

export async function getRoomsByRoomType(
  roomType: string,
  perPage: string,
  sortBy: string,
  page: string,
  type: string,
): Promise<{ rooms: Room[]; totalCount: number; totalPages: number }> {
  // &type=${type}
  try {
    const response = await fetch(
      `${API_URL}/rooms/type/${roomType}?sortBy=${sortBy}&perPage=${perPage}&page=${page}&type=${type}`,
    );
    const data = await response.json();
    return {
      rooms: data.rooms,
      totalCount: data.totalCount,
      totalPages: data.totalPages,
    };
  } catch (error) {
    throw new Error('Failed to fetch rooms by type');
  }
}

export const getOneUser = async (): Promise<User> => {
  try {
    const email = localStorage.getItem('email');

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${Cookies.get('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error('Failed to fetch user');
    throw error;
  }
};

export const doDeposit = async (amount: number) => {
  const email = localStorage.getItem('email');

  try {
    const response = await fetch(`${API_URL}/users/money`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${Cookies.get('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, amount }),
    });
    if (!response.ok) {
      throw new Error('Failed to deposit');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error('Failed to deposit');
    throw error;
  }
};

export const addBooked = async (id: number, rooms: Room[]) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}/add-booked`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${Cookies.get('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rooms }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error('Failed to add booked room');
    throw error;
  }
};

export const getBooked = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}/booked`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${Cookies.get('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return data;
};
