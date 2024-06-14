import { FC } from 'react';
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select';
import { SortBy } from 'components/Filter';
import { FilterBy } from 'components/Filter';
import { ItemsOnPage } from 'components/Filter';
import { useSearchParams } from 'react-router-dom';
import { Option } from 'types/Option';

interface DropdownProps {
  options: Option[];
  onSortSelectChange?: (selectedOption: SortBy) => void;
  onFilterSelectChange?: (selectedOption: FilterBy) => void;
  onItemsSelectChange?: (selectedOption: ItemsOnPage) => void;
  // isSortDropdown?: boolean;
  // isFilterDropdown?: boolean;
  // isItemsDropdown?: boolean;
  theme: boolean;
  defaultValue?: Option;
}

interface CustomStylesProps {
  isFocused?: boolean;
  isSelected?: boolean;
  menuIsOpen?: boolean;
}

const getBaseStyles = (theme: boolean): StylesConfig<Option, false> => ({
  control: (base: CSSObjectWithLabel, { isFocused }: CustomStylesProps) => ({
    ...base,
    border: `1px solid ${isFocused ? 'var(--select-border-focused-color)' : 'var(--select-border-color)'}`,
    backgroundColor: 'var(--select-control-bg-color)',
    color: `${theme ? '#242736' : '#fff'}`,
    boxShadow: 'none',
    borderRadius: '8px',
    fontFamily: 'Mont',
    fontSize: '14px',
    fontWeight: '500',
    minHeight: '40px',
    cursor: 'pointer',
    transition: 'all .3s ease',

    '&:hover': {
      borderColor: 'var(--select-border-focused-color)',
      transition: 'all .3s ease',
    },
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color: 'var(--primary-color)',
    transition: 'all .3s ease',
  }),

  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: 'var(--select-menu-border-color)',
  }),
  option: (base: CSSObjectWithLabel, { isSelected }: CustomStylesProps) => ({
    ...base,
    fontSize: '14px',
    lineHeight: '21px',
    cursor: 'pointer',
    color: `${isSelected ? 'var(--select-menu-selected-color)' : 'var(--select-menu-not-selected-color)'}`,
    fontWeight: '500',
    backgroundColor: `var(--main-bg-color)`,
    '&:hover': {
      backgroundColor: `var(--select-option-hover-color)`,
      color: `var(--select-hover-text-color)`,
      transition: 'all .3s ease',
    },
  }),
  valueContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '0 12px',
    lineHeight: '1',
  }),
  dropdownIndicator: (base: CSSObjectWithLabel, state: CustomStylesProps) => ({
    ...base,
    transition: 'all .3s ease',
    transform: state.menuIsOpen ? 'rotate(180deg)' : 'none',
  }),
  indicatorSeparator: (base: CSSObjectWithLabel) => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '0 4px',
  }),
});

const getCustomStyles = (theme: boolean): StylesConfig<Option, false> => {
  const baseStyles = getBaseStyles(theme);
  return {
    ...baseStyles,
    container: (base: CSSObjectWithLabel) => ({
      ...base,
      minWidth: '180px',
    }),
  };
};

const getDefaultStyles = (theme: boolean): StylesConfig<Option, false> => {
  const baseStyles = getBaseStyles(theme);
  return {
    ...baseStyles,
    container: (base: CSSObjectWithLabel) => ({
      ...base,
      width: '136px',
    }),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isInstanceOf = (row: string, enm: any) => {
  return Object.values(enm).includes(row);
}

export const Dropdown: FC<DropdownProps> = ({
  options,
  onSortSelectChange,
  onFilterSelectChange,
  onItemsSelectChange,
  // isSortDropdown,
  // isFilterDropdown,
  // isItemsDropdown,
  theme,
  defaultValue,
}) => {
  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      if (onSortSelectChange && isInstanceOf(selectedOption.value as string, SortBy)) {
        onSortSelectChange(selectedOption.value as SortBy);
      } else if (onFilterSelectChange && isInstanceOf(selectedOption.value as string, FilterBy)) {
        onFilterSelectChange(selectedOption.value as FilterBy);
      } else if (onItemsSelectChange && isInstanceOf(selectedOption.value.toString(), ItemsOnPage)) {
        onItemsSelectChange(selectedOption.value as ItemsOnPage);
      }
    }
  };

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortByParam = params.get('sort');
  const filterByClassParam = params.get('type');
  const perPageParam = params.get('perPage');

  const getSelectedValue = (options: Option[]) => {
    if (defaultValue) {
      return defaultValue;
    }

    if (onSortSelectChange) {
      if (!sortByParam) {
        return options[0];
      }

      return options.find(option => option.value === sortByParam) || options[0];
    }

    if (onFilterSelectChange) {
      if (!filterByClassParam) {
        return options[0];
      }

      return options.find(option => option.value === filterByClassParam) || options[0];
    }

    if (onItemsSelectChange) {
      if (!perPageParam) {
        return options[0];
      }

      return options.find(option => option.value === perPageParam) || options[0];
    }

    // return options.find(option => option.value === perPageParam) || options[0]
  };

  const isWideScreen = window.innerWidth >= 640;

  return (
    <div>
      <Select
        defaultValue={getSelectedValue(options)}
        options={options}
        styles={
          isWideScreen
            ? getCustomStyles(theme)
            : getDefaultStyles(theme)
        }
        isSearchable={false}
        onChange={handleChange}
      />
    </div>
  );
};
