import { API_URL } from "api";

export const getImageUrl = (imagePath: string): string => {
  return `${API_URL}/${imagePath}`;
};
