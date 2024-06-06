import { SortBy } from "components/Filter";
import { Room } from "types/Room";

export const sortRooms = (rooms: Room[], sortBy: SortBy) => {
  const sortedRoomsCopy = [...rooms];
  if (sortBy === SortBy.BEST) {
    sortedRoomsCopy.sort((a, b) => b.roomTypeId - a.roomTypeId);
  } else if (sortBy === SortBy.PRICE_PER_NIGHT) {
    sortedRoomsCopy.sort((a, b) => a.pricePerNight - b.pricePerNight);
  }

  return sortedRoomsCopy;
}
