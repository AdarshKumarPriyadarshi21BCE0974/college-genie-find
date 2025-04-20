
import React from 'react';
import Select from 'react-select';
import { CourseOption } from '@/types/api';

interface MajorSelectorProps {
  majors: CourseOption[];
  value: string | null;
  onChange: (majorId: string, taxonomyId: number) => void;  // Updated to include taxonomyId
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
  // Convert majors to select options
  const options = majors.map(major => ({
    value: major.course_taxonomy_id.toString(),
    label: major.course_name
  }));

  // Find the selected option based on value
  const selectedOption = options.find(option => option.value === value) || null;

  return (
    <Select
      className={`${className} major-selector`}
      options={options}
      value={selectedOption}
      onChange={(option) => {
        if (option) {
          const selectedMajor = majors.find(m => m.course_taxonomy_id.toString() === option.value);
          if (selectedMajor) {
            onChange(selectedMajor.course_name, selectedMajor.course_taxonomy_id);
          }
        } else {
          onChange('', 0);
        }
      }}
      placeholder={placeholder}
      required={isRequired}
      maxMenuHeight={280}
      menuPortalTarget={document.body}
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
        menuList: (base) => ({
          ...base,
          maxHeight: "400px", // Increased height to show more options
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected 
            ? '#f97316'
            : state.isFocused 
              ? '#f2f2f2' 
              : 'white',
          color: state.isSelected ? 'white' : 'black',
          '&:hover': {
            backgroundColor: state.isSelected ? '#f97316' : '#f2f2f2',
          },
          cursor: 'pointer',
          padding: '8px 12px',
          fontSize: '0.9rem'
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
