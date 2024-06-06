import { RoomType } from 'types/RoomType';
import { Room } from 'types/Room';

// export const API_URL = 'https://phone-catalog-api-s7t8.onrender.com';
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
  roomTypeName: string,
  perPage: string,
  sortBy = 'id',
  page = 1,
): Promise<{ rooms: Room[]; totalCount: number; totalPages: number }> {

  try {
    const response = await fetch(
      `${API_URL}/rooms/type/${roomTypeName}?sortBy=${sortBy}&perPage=${perPage}&page=${page}`,
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
