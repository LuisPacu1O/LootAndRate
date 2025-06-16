import React from 'react';
import Select from 'react-select';

export default function SearchableSelect({ label, value, onChange, options }) {
  return (
    <div className="w-full">
      <Select
        value={options.find((opt) => opt.value === value)}
        onChange={(selected) => onChange(selected?.value || '')}
        options={options}
        placeholder={label}
        isClearable
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: '#111827',
            borderColor: state.isFocused ? '#2563EB' : '#4B5563',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(59,130,246,0.5)' : 'none',
            height: '48px',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
          }),
          input: (base) => ({ ...base, color: 'white' }),
          placeholder: (base) => ({ ...base, color: '#9CA3AF' }),
          menu: (base) => ({ ...base, backgroundColor: '#111827', zIndex: 50 }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#1E3A8A' : '#111827',
            color: 'white',
          }),
          singleValue: (base) => ({ ...base, color: 'white' }),
        }}
      />
    </div>
  );
}
