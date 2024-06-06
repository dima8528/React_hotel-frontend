// import React, { useEffect, useState } from 'react';
// import styles from './productItemPage.module.scss';
// import classNames from 'classnames';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';
// import { getOneProduct, getProducts, getRecommendedProducts } from 'api';
// import { ProductButtonType, Product } from 'types';
// import { useScrollToTopEffect } from 'utils';
// import { Link, useLocation, useParams } from 'react-router-dom';
// import { ProductItemType } from 'types';
// import { NotFoundPage } from 'pages/NotFoundPage';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'store/store';
// import { Breadcrumbs } from 'components/Breadcrumbs';
// import { ButtonColor } from 'components/UI/ButtonColor';
// import { ButtonCapacity } from 'components/UI/ButtonCapacity';
// import { ButtonPrimary } from 'components/UI/ButtonPrimary';
// import { ButtonFavourite } from 'components/UI/ButtonFavourite';
// import { ButtonBack } from 'components/UI/ButtonBack';
// import { ProductsSlider } from 'components/ProductsSlider';
// import { getImageUrl } from 'utils/urlUtils';
// import Skeleton from 'react-loading-skeleton';

// export const ProductItemPage = () => {
//   const [t] = useTranslation('global');
//   const dispatch = useDispatch();
//   const location = useLocation();
//   useScrollToTopEffect();

//   const { productId } = useParams<{ productId: string }>();
//   const [product, setProduct] = useState<ProductItemType | null>(null);
//   const [loader, setLoader] = useState(true);
//   const { pathname } = location;
//   const parts = pathname.split('/').filter((part: string) => part !== '')[0];

//   const [isSelectedPhoto, setIsSelectedPhoto] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(product?.color);
//   const [selectedCapacity, setSelectedCapacity] = useState(product?.capacity);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

//   const [products, setProducts] = useState<Product[] | null>(null);
//   const productItemID = products?.find(item => item.itemId === productId);
//   const cart = useSelector((state: RootState) => state.product.cart);
//   const [fullId, setFullId] = useState<string | null>(null);

//   const favourites = useSelector(
//     (state: RootState) => state.product.favourites,
//   );

//   const isProductInCart = productItemID
//     ? cart.some((cartProduct: Product) => cartProduct.id === productItemID.id)
//     : false;

//   const isProductInFavourites = productItemID
//     ? favourites.some(
//         (favProduct: Product) => favProduct.id === productItemID.id,
//       )
//     : false;

//   const SHORT_DESCRIPTION_SECTION = [
//     { language: t('productPage.Screen'), value: product?.screen },
//     { language: t('productPage.Resolution'), value: product?.resolution },
//     { language: t('productPage.Processor'), value: product?.processor },
//     { language: t('productPage.RAM'), value: product?.ram },
//   ];

//   const TECH_SECTION = [
//     {
//       language: t('productPage.Screen'),
//       value: product?.screen,
//       isValid: product?.screen !== undefined && product?.screen !== null,
//     },
//     {
//       language: t('productPage.Resolution'),
//       value: product?.resolution,
//       isValid:
//         product?.resolution !== undefined && product?.resolution !== null,
//     },
//     {
//       language: t('productPage.Processor'),
//       value: product?.processor,
//       isValid: product?.processor !== undefined && product?.processor !== null,
//     },
//     {
//       language: t('productPage.RAM'),
//       value: product?.ram,
//       isValid: product?.ram !== undefined && product?.ram !== null,
//     },
//     {
//       language: t('productPage.Built in memory'),
//       value: product?.capacity,
//       isValid: product?.capacity !== undefined && product?.capacity !== null,
//     },
//     {
//       language: t('productPage.Camera'),
//       value: product?.camera,
//       isValid: product?.camera !== undefined && product?.camera !== null,
//     },
//     {
//       language: t('productPage.Zoom'),
//       value: product?.zoom,
//       isValid: product?.zoom !== undefined && product?.zoom !== null,
//     },
//     {
//       language: t('productPage.Cell'),
//       value: product?.cell,
//       isValid: product?.cell !== undefined && product?.cell !== null,
//     },
//   ];

//   useEffect(() => {
//     if (productId) {
//       getOneProduct(productId)
//         .then(data => {
//           setProduct(data);
//           setLoader(false);
//         })
//         .catch(() => {
//           toast.error('Failed to fetch product');
//           setLoader(false);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       toast.error('Product ID is undefined');
//       setLoader(false);
//     }
//   }, [productId]);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       const allProducts = await getProducts();
//       setProducts(allProducts);
//     };

//     fetchAllProducts();
//   }, []);

//   useEffect(() => {
//     if (productId) {
//       const fetchRecommendedProducts = async () => {
//         try {
//           const recommendedProducts = await getRecommendedProducts(productId);
//           setRecommendedProducts(recommendedProducts);
//         } catch (error) {
//           toast.error('Failed to fetch products');
//         }
//       };

//       fetchRecommendedProducts();
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (product && product.colorsAvailable) {
//       setSelectedColor(product.color);
//     }

//     if (product && product.capacityAvailable) {
//       setSelectedCapacity(product.capacity);
//     }
//   }, [product]);

//   const getUrlFromNewColor = (color: string) => {
//     const capacity = product?.capacity.toLowerCase();
//     const namespaceId = product?.namespaceId;
//     let checkingColor = color;

//     if (checkingColor.includes(' ')) {
//       checkingColor = checkingColor.split(' ').join('-');
//     }

//     const newLink = `${namespaceId}-${capacity}-${checkingColor}`;
//     return newLink;
//   };

//   const getUrlFromNewCapacity = (capacity: string) => {
//     let checkingColor = product?.color;

//     if (checkingColor && checkingColor.includes(' ')) {
//       checkingColor = checkingColor.split(' ').join('-');
//     }

//     const namespaceId = product?.namespaceId;
//     const checkingCapacity = capacity.toLowerCase();

//     const newLink = `${namespaceId}-${checkingCapacity}-${checkingColor}`;
//     return newLink;
//   };

//   const handlePhotoChange = (index: number) => {
//     setIsSelectedPhoto(index);
//   };

//   const handleAddToFavourites = () => {
//     if (isProductInFavourites) {
//       toast.success('The product has been removed');

//       dispatch({
//         type: 'product/removeFromFavourites',
//         payload: productItemID,
//       });
//     } else {
//       toast.success('The product has been added');

//       dispatch({
//         type: 'product/addToFavourites',
//         payload: productItemID,
//       });
//     }
//   };

//   const handleAddToCart = () => {
//     if (isProductInCart) {
//       toast.success('The product has been removed');

//       dispatch({
//         type: 'product/removeFromCart',
//         payload: productItemID,
//       });
//     } else {
//       toast.success('The product has been added');

//       dispatch({
//         type: 'product/addToCart',
//         payload: productItemID,
//       });
//     }
//   };

//   useEffect(() => {
//     if (product) {
//       const findIdFullNumber = async () => {
//         // const allProducts = await getProducts();
//         // const foundElement = allProducts.find(
//         //   element => element.itemId === product.id,
//         // );

//         const foundElement = { id};

//         if (foundElement) {
//           const idLength = foundElement.id.toString().length;
//           let zeroElements = '';
//           for (let i = 0; i < 8 - idLength; i++) {
//             zeroElements += '0';
//           }

//           setFullId(zeroElements + foundElement.id);
//         }
//       };

//       findIdFullNumber();
//     }
//   }, [product]);

//   return (
//     <div className={styles.product__content}>
//       <div className={styles.breadcrumbs__products}>
//         <Breadcrumbs />
//       </div>

//       <div className={styles.back__products}>
//         <ButtonBack textForBackButton={t('product.Back')} />
//       </div>

//       {loader && (
//         <div className={styles.skeletonContainer}>
//           <div className={styles.textSkeleton}>
//             <Skeleton height={44} width="100%" />
//           </div>

//           <div className={styles.upperImages}>
//             <div className={styles.smallImageSkeletons}>
//               {[...Array(5)].map((_, index) => (
//                 <Skeleton key={index} className={styles.imageSkeletonSmall} />
//               ))}
//             </div>

//             <div className={styles.bigImageSkeletons}>
//               <Skeleton className={styles.imageSkeletonBig} />
//             </div>
//           </div>

//           <div className={styles.smallDescriptionSkeletons}>
//             <Skeleton className={styles.smallTextSkeletons} count={2} />

//             <Skeleton className={styles.smallPriceSkeletons} />
//             <Skeleton className={styles.smallTextSkeletons} />
//           </div>

//           <div className={styles.textSkeleton}>
//             <Skeleton height={44} width="100%" />
//           </div>
//         </div>
//       )}

//       {!loader && (
//         <>
//           {product && product?.error !== 'Product not found' ? (
//             <>
//               <h1 className={styles.title}>{product.name}</h1>

//               <div className={styles.details}>
//                 <div className={styles.product__images}>
//                   <div className={styles.product__image_column}>
//                     {product.images.map((image, index) => (
//                       <div
//                         key={index}
//                         className={classNames(
//                           styles.product__image_column_small,
//                           {
//                             [styles.selected]: index === isSelectedPhoto,
//                           },
//                         )}
//                         onClick={() => handlePhotoChange(index)}
//                         onMouseEnter={() => handlePhotoChange(index)}
//                       >
//                         <img
//                           src={getImageUrl(image)}
//                           alt={product.name}
//                           className={`${styles.mainImg}`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className={styles.product__image_main}>
//                     {product.images.map(
//                       (image, index) =>
//                         index === isSelectedPhoto && (
//                           <img
//                             key={index}
//                             src={getImageUrl(image)}
//                             alt={product.name}
//                             className={`${styles.mainImage}`}
//                           />
//                         ),
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.product__info}>
//                   <div className={styles.product__info__colors}>
//                     <p className={styles.product__info__colors_title}>
//                       {t('productPage.Available colors')}
//                     </p>

//                     <div className={styles.product__info__colors_buttons}>
//                       {product.colorsAvailable.map((color, index) => (
//                         <Link
//                           to={`/${parts}/${getUrlFromNewColor(color)}`}
//                           key={index}
//                           className={styles.product__info__color_button}
//                         >
//                           <ButtonColor
//                             colorDevice={color}
//                             selected={selectedColor === color}
//                             setSelectedColor={setSelectedColor}
//                           />
//                         </Link>
//                       ))}
//                     </div>
//                   </div>

//                   <div className={styles.product__info__capacity}>
//                     <p className={styles.product__info__capacity_title}>
//                       {t('productPage.Select capacity')}
//                     </p>

//                     <div className={styles.product__info__capacity_buttons}>
//                       {product.capacityAvailable.map((capacity, index) => (
//                         <Link
//                           to={`/${parts}/${getUrlFromNewCapacity(capacity)}`}
//                           key={index}
//                           className={styles.product__info__capacity_button}
//                         >
//                           <ButtonCapacity
//                             text={capacity}
//                             selected={selectedCapacity === capacity}
//                             setSelectedCapacity={setSelectedCapacity}
//                           />
//                         </Link>
//                       ))}
//                     </div>
//                   </div>

//                   <div className={styles.product__info__price}>
//                     <p className={styles.product__info__price_s}>
//                       <strong className={styles.product__info__price_discount}>
//                         ${product.priceDiscount}
//                       </strong>

//                       <span className={styles.product__info__price_regular}>
//                         ${product.priceRegular}
//                       </span>
//                     </p>

//                     <div className={styles.product__info__price_buttons}>
//                       <ButtonPrimary
//                         textForPrimaryButton={
//                           isProductInCart
//                             ? ProductButtonType.ADDED
//                             : ProductButtonType.ADD
//                         }
//                         callback={handleAddToCart}
//                       />

//                       <div className={styles.product__info__price_gap}></div>
//                       {productItemID && (
//                         <ButtonFavourite
//                           product={productItemID}
//                           callback={handleAddToFavourites}
//                         />
//                       )}
//                     </div>
//                   </div>

//                   <div className={styles.product__info__smallDescription}>
//                     {SHORT_DESCRIPTION_SECTION.map((item, index) => (
//                       <div
//                         key={index}
//                         className={styles.product__info__smallDescription_s}
//                       >
//                         <p
//                           className={
//                             styles.product__info__smallDescription_name
//                           }
//                         >
//                           {item.language}
//                         </p>
//                         <p
//                           className={
//                             styles.product__info__smallDescription_value
//                           }
//                         >
//                           {item.value}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className={styles.product__id}>{'ID: ' + fullId}</div>
//               </div>

//               <div className={styles.more_details}>
//                 <div className={styles.more_details__about}>
//                   <strong className={styles.more_details__about_strong}>
//                     {t('productPage.About')}
//                   </strong>

//                   {product.description.map((desc, index) => (
//                     <div
//                       key={index}
//                       className={styles.more_details__about__info}
//                     >
//                       <p className={styles.more_details__about__info__title}>
//                         <strong>{desc.title}</strong>
//                       </p>

//                       {desc.text.map((text, indexJ) => (
//                         <div
//                           key={indexJ}
//                           className={
//                             styles.more_details__about__info__description
//                           }
//                         >
//                           {text}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>

//                 <div className={styles.more_details__tech}>
//                   <strong className={styles.more_details__tech_strong}>
//                     {t('productPage.Tech specs')}
//                   </strong>

//                   <div className={styles.more_details__tech__smallDescription}>
//                     {TECH_SECTION.map(
//                       (item, index) =>
//                         item.isValid && (
//                           <div
//                             key={index}
//                             className={
//                               styles.more_details__tech__smallDescription_s
//                             }
//                           >
//                             <p
//                               className={
//                                 styles.more_details__tech__smallDescription_name
//                               }
//                             >
//                               {item.language}
//                             </p>
//                             {item.value && (
//                               <p
//                                 className={
//                                   styles.more_details__tech__smallDescription_value
//                                 }
//                               >
//                                 {item.value}
//                               </p>
//                             )}
//                           </div>
//                         ),
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.slider}>
//                 {products && (
//                   <ProductsSlider
//                     title={t('home.You may also like')}
//                     products={recommendedProducts}
//                     loading={isLoading}
//                   />
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className={styles.NotFoundPage}>
//               <NotFoundPage />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

export const ProductItemPage = () => {
  return <></>;
};
