import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'components/UI/DropDown';
import { useTranslation } from 'react-i18next';
import styles from './filter.module.scss';
import { useTheme } from 'hooks/useTheme';

export enum SortBy {
  ALL = 'All',
  BEST = 'Best',
  PRICE_PER_NIGHT = 'PricePerNight',
}

export const Filter = () => {
  const [t] = useTranslation('global');
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    { value: `${SortBy.ALL}`, label: t('filters.All') },
    { value: `${SortBy.BEST}`, label: t('filters.Best') },
    { value: `${SortBy.PRICE_PER_NIGHT}`, label: t('filters.Cheapest') },
  ];

  const itemsPerPageOptions = [
    { value: 200, label: t('filters.All') },
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
  ];

  const handleSortParams = (selectedSort: SortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', selectedSort);
    setSearchParams(params.toString());
  };

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
          {t('filters.Sort by')}
        </span>

        <Dropdown
          options={sortOptions}
          onSelectChange={handleSortParams}
          isSortDropdown={true}
          theme={isDarkTheme}
        />
      </div>

      <div className={styles.filter__сontainer}>
        <span className={styles.filter__description}>
          {t('filters.Items on page')}
        </span>

        <div>
          <Dropdown
            options={itemsPerPageOptions}
            onSelectChange={handlePerPageParams}
            theme={isDarkTheme}
          />
        </div>
      </div>
    </div>
  );
};
