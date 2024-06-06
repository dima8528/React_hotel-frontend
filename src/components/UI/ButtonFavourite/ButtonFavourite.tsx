import { Link } from 'react-router-dom';
import styles from './buttonFavourite.module.scss';
import React, { FC, useState } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Product, ProductItemType } from 'types';
import classNames from 'classnames';

interface Props {
  product: ProductItemType | Product;
  callback: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
export const ButtonFavourite: FC<Props> = ({ product, callback }) => {
  const [selectedFavourite, setSelectedFavourite] = useState(false);
  const products = useSelector((state: RootState) => state.product.favourites);

  const handleClickFavourite = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setSelectedFavourite(!selectedFavourite);
    callback(event);
  };

  const findProductInFavourites = (
    products: Product[],
    product: Product | ProductItemType,
  ) => {
    return products.some(
      (favProduct: Product | ProductItemType) => favProduct.id === product.id,
    );
  };

  const getButtonClass = (isProductInFavourites: boolean) =>
    classNames(styles.button, {
      [styles.selected]: isProductInFavourites,
      [styles.default]: !isProductInFavourites,
    });

  const isProductInFavourites = findProductInFavourites(products, product);

  return (
    <>
      <Link
        to="#"
        className={getButtonClass(isProductInFavourites)}
        onClick={handleClickFavourite}
      ></Link>
    </>
  );
};
