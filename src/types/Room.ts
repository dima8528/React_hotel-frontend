export type Room = {
  id: number;
  roomNumber: number;
  roomTypeId: number;
  floor: number;
  capacity: number;
  pricePerNight: number;
  description: string;
  available: boolean;
  images: string[];
}
