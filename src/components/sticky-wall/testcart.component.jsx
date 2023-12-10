import React from 'react';

const Cart = ({ title, children }) => {
  return (
    <div className="max-w-lg bg-gray-300 rounded-md shadow-2xl">
      <div className="font-semibold text-2xl mx-4 pt-2 ">
        {title}
      </div>
      <div className="px-4 pb-4 break-words leading-loose max-w-xs">
        {children}
      </div>
    </div>
  );
};

export default Cart;