import React, { useContext, useEffect } from 'react';
import StickyCart from './sticky-cart-component';
import CreateButton from './create-button.component';
import Cart from './testcart.component';
import { StickyWallContext } from '../../contexts/sticky-wall.context';
import { PenSquare, Plus } from 'lucide-react';

const StickWall = () => {
  const {state} = useContext(StickyWallContext);

  return (
    <div className='m-5 '>
      <div className='flex justify-between items-baseline'>
        <div className='mb-2'><Plus /></div>
        <div><PenSquare size={16} strokeWidth={1.5} /></div>
      </div>
      <div className="grid grid-cols-3 items-start gap-5 h-screen p-5 border-2 rounded-lg">
        {/* {state.StickyNote.map((element) => (
          <Cart title={element.header}>{element.content}</Cart>
        ))} */}
        {/* <CreateButton/> */}
      </div>
    </div>
    
  );
};

export default StickWall;
