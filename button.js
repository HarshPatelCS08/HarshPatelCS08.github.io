import React from 'react';

export const Button = ({ onClick, children, disabled }) => {
  return (
    <button
      className={`py-2 px-4 bg-blue-500 text-white rounded-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
