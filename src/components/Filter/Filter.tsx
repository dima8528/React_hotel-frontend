import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'components/UI/DropDown';
import { useTranslation } from 'react-i18next';
import styles from './filter.module.scss';
import { useTheme } from 'hooks/useTheme';

export enum SortBy {
  ALL = 'All',
  BEST = 'Best',
  CHEAPEST = 'Cheapest',
}

export enum FilterBy {
  ALL = 'All',
  STANDARD = 'Standard',
  LUX = 'Lux',
  PREMIUM = 'Premium',
}

export enum ItemsOnPage {
  ALL = 'All',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

export const Filter = () => {
  const [t] = useTranslation('global');
  const [searchParams, setSearchParams] = useSearchParams();

  const filterOptions = [
    { value: 'All', label: t(`filters.${FilterBy.ALL}`) },
    { value: 'Standard', label: t(`filters.${FilterBy.STANDARD}`) },
    { value: 'Lux', label: t(`filters.${FilterBy.LUX}`) },
    { value: 'Premium', label: t(`filters.${FilterBy.PREMIUM}`) },
  ];

  const sortOptions = [
    { value: `${SortBy.ALL}`, label: t('filters.All') },
    { value: `${SortBy.BEST}`, label: t('filters.Best') },
    { value: `${SortBy.CHEAPEST}`, label: t('filters.Cheapest') },
  ];

  const itemsPerPageOptions = [
    { value: 200, label: t('filters.All') },
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
  ];

  const handleFilterParams = (selectedFilter: FilterBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('type', selectedFilter);
    setSearchParams(params.toString());
  };

  const handleSortParams = (selectedSort: SortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', selectedSort);
    setSearchParams(params.toString());
  };

  // const handleItemsParams = (selectedItemsPerPage: ItemsOnPage) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set('perPage', selectedItemsPerPage);
  //   setSearchParams(params.toString());
  // };

  const handlePerPageParams = (selectedItemsPerPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('perPage', selectedItemsPerPage);

    if ((!params.get('perPage') || params.get('perPage') === '200') && params.get('page') && params.get('page') !== '1') {
      params.set('page', '1');
    }

    setSearchParams(params.toString());
  };

  const { theme } = useTheme();
  let isDarkTheme;
  theme === 'dark' ? (isDarkTheme = true) : (isDarkTheme = false);

  return (
    <div className={styles.filter}>
      <div className={styles.filter__сontainer}>
        <span className={styles.filter__description}>
          {t('filters.Filter by class')}
        </span>

        <Dropdown
          options={filterOptions}
          onFilterSelectChange={handleFilterParams}
          onSortSelectChange={handleSortParams}
          onItemsSelectChange={handlePerPageParams}
          isFilterDropdown={true}
          theme={isDarkTheme}
        />
      </div>

      <div className={styles.filter__сontainer}>
        <span className={styles.filter__description}>
          {t('filters.Sort by')}
        </span>

        <Dropdown
          options={sortOptions}
          onFilterSelectChange={handleFilterParams}
          onSortSelectChange={handleSortParams}
          onItemsSelectChange={handlePerPageParams}
          isSortDropdown={true}
          theme={isDarkTheme}
        />
      </div>

      <div className={styles.filter__сontainer}>
        <span className={styles.filter__description}>
          {t('filters.Rooms on page')}
        </span>

        <div>
          <Dropdown
            options={itemsPerPageOptions}
            onFilterSelectChange={handleFilterParams}
            onSortSelectChange={handlePerPageParams}
            onItemsSelectChange={handlePerPageParams}
            isItemsDropdown={true}
            theme={isDarkTheme}
          />
        </div>
      </div>
    </div>
  );
};
