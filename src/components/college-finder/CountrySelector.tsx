
import React from 'react';
import Select from 'react-select';
import { Country } from '../../types';

interface CountrySelectorProps {
  countries: Country[];
  value: string | null;
  onChange: (country: string) => void;
  className?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  value,
  onChange,
  className = '',
  placeholder = 'Select Country',
  isRequired = false
}) => {
  const options = countries.map(country => ({
    value: country.name,
    label: (
      <div className="flex items-center">
        <span className="mr-2 text-lg">{country.flag}</span>
        <span>{country.name}</span>
      </div>
    )
  }));

  // Find the selected option based on value
  const selectedOption = options.find(option => option.value === value) || null;

  return (
    <Select
      className={`${className} country-selector`}
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange(option ? option.value : '');
      }}
      placeholder={placeholder}
      required={isRequired}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          padding: '0.5rem',
          borderColor: state.isFocused ? '#9b87f5' : '#e2e8f0',
          boxShadow: state.isFocused ? '0 0 0 1px #9b87f5' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '#9b87f5' : '#e2e8f0',
          }
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected 
            ? '#9b87f5' 
            : state.isFocused 
              ? '#f2f2f2' 
              : 'white',
          color: state.isSelected ? 'white' : 'black',
          '&:hover': {
            backgroundColor: state.isSelected ? '#9b87f5' : '#f2f2f2',
          },
          cursor: 'pointer',
          padding: '10px'
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          zIndex: 30
        })
      }}
    />
  );
};

export default CountrySelector;
