import { useEffect, useState } from 'react';
import { SortBy } from 'components/Filter';
import { useSearchParams } from 'react-router-dom';
import { getRoomsByRoomType } from 'api';
import { Room } from 'types/Room';
import { RoomTypes } from 'types/RoomTypes';

export const usePageLogic = (roomType: RoomTypes) => {
  const [currentRooms, setCurrentRooms] = useState<Room[]>([]);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.ALL);
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const params = new URLSearchParams(searchParams);
  const perPage = params.get('perPage');
  const type = params.get('type') || RoomTypes.ALL;
  const roomsPerPage = perPage ? Number(perPage) : totalCount;

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const result = await getRoomsByRoomType(
          roomType,
          String(roomsPerPage),
          sortBy,
          currentPage.toString(),
          type,
        );
        console.log('roomType', roomType);
        if (result) {
          const { rooms, totalCount } = result;
          setCurrentRooms(rooms);
          setTotalCount(totalCount);
        } else {
          console.log('No data returned from getRoomsByRoomType');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [roomType, sortBy, roomsPerPage, currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const sortByParam = params.get('sort');
    setSortBy(
      sortByParam && Object.values(SortBy).includes(sortByParam as SortBy)
        ? (sortByParam as SortBy)
        : SortBy.ALL,
    );

    if (!params.get('page')) {
      params.set('page', '1');
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(params.get('page') as string));
    }

    const query = searchParams.get('query') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    params.set('page', pageNumber.toString());
    setSearchParams(params.toString());
  };

  return { isLoading, currentRooms, totalCount, currentPage, handlePagination };
};
