import React from 'react';

export const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="w-full p-3 border rounded-md"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
