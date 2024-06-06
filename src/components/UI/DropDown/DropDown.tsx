import { FC } from 'react';
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select';
import { SortBy } from 'components/Filter';
import { useSearchParams } from 'react-router-dom';

interface Option {
  value: number | string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelectChange: (selectedOption: SortBy) => void;
  isSortDropdown?: boolean;
  theme: boolean;
}

interface CustomStylesProps {
  isFocused?: boolean;
  isSelected?: boolean;
  menuIsOpen?: boolean;
}

const getBaseStyles = (theme: boolean): StylesConfig<Option, false> => ({
  control: (base: CSSObjectWithLabel, { isFocused }: CustomStylesProps) => ({
    ...base,
    border: `1px solid ${isFocused ? 'var(--select-border-focudes-color)' : 'var(--select-border-color)'}`,
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
      borderColor: 'var(--select-border-focudes-color)',
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

export const Dropdown: FC<DropdownProps> = ({
  options,
  onSelectChange,
  isSortDropdown,
  theme,
}) => {
  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      onSelectChange(selectedOption.value as SortBy);
    }
  };

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortByParam = params.get('sort');
  const perPageParam = params.get('perPage');

  const getSelectedValue = (options: Option[]) => {
    if (options[0].value === SortBy.ALL) {
      return options.find(option => option.value === sortByParam);
    }
    return options.find(option => option.value === Number(perPageParam));
  };

  const isWideScreen = window.innerWidth >= 640;

  return (
    <div>
      <Select
        defaultValue={getSelectedValue(options) || options[0]}
        options={options}
        styles={
          isSortDropdown && isWideScreen
            ? getCustomStyles(theme)
            : getDefaultStyles(theme)
        }
        isSearchable={false}
        onChange={handleChange}
      />
    </div>
  );
};
