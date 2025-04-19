
import React from 'react';
import Select from 'react-select';

interface MajorSelectorProps {
  majors: string[];
  value: string | null;
  onChange: (major: string) => void;
  className?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const MajorSelector: React.FC<MajorSelectorProps> = ({
  majors,
  value,
  onChange,
  className = '',
  placeholder = 'Select Major',
  isRequired = false
}) => {
  const options = majors.map(major => ({
    value: major,
    label: major
  }));

  // Find the selected option based on value
  const selectedOption = options.find(option => option.value === value) || null;

  return (
    <Select
      className={`${className} major-selector`}
      options={options}
      value={selectedOption}
      onChange={(option) => {
        onChange(option ? option.value : '');
      }}
      placeholder={placeholder}
      required={isRequired}
      maxMenuHeight={280} // Show more options in the dropdown
      menuPortalTarget={document.body} // To ensure dropdown is not cut off
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
            ? '#f97316' // Changed to orange
            : state.isFocused 
              ? '#f2f2f2' 
              : 'white',
          color: state.isSelected ? 'white' : 'black',
          '&:hover': {
            backgroundColor: state.isSelected ? '#f97316' : '#f2f2f2',
          },
          cursor: 'pointer',
          padding: '8px 12px', // More compact padding
          fontSize: '0.9rem' // Slightly smaller font
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          zIndex: 30
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        })
      }}
    />
  );
};

export default MajorSelector;
