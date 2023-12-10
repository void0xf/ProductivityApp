import React from 'react';

const StickyCart = ({ header, content }) => {
  return (
    <div className='max-w-xs bg-orange-300 rounded-md shadow-2xl'>
      <div className="font-semibold text-2xl mx-4 pt-2">{header}</div>
      <div className="px-4 pb-4 break-words leading-loose">{content}</div>
    </div>
  );
};

export default StickyCart;
