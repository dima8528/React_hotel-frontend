import { Product, SortProductBy } from "types";

export const sortProductsBy = (products: Product[], sortBy: SortProductBy) => {
  switch (sortBy) {
    case SortProductBy.year:
      return [...products].sort((a, b) => b.year - a.year).slice(0,20);
    case SortProductBy.price:
      return [...products].sort((a, b) => b.price - a.price).slice(0,20);
    default:
      return products;
  }
};
