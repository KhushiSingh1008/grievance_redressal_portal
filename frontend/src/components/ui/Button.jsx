import React from 'react';

export function Button({ className, children, onClick, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-900 text-white hover:bg-blue-800 h-10 px-4 py-2 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
