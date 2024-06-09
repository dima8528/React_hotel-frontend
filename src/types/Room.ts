export type Room = {
  id: number;
  roomName: string;
  roomNumber: number;
  roomTypeId: number;
  floor: number;
  capacity: number;
  pricePerNight: number;
  description: string;
  available: boolean;
  images: string[];
  nights: number;
}
