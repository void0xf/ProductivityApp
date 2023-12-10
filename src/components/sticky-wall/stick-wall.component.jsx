import React, { useContext, useEffect } from 'react';
import StickyCart from './sticky-cart-component';
import CreateButton from './create-button.component';
import Cart from './testcart.component';
import { StickyWallContext } from '../../contexts/sticky-wall.context';

const StickWall = () => {
  const {state} = useContext(StickyWallContext)

  useEffect(()=>{

  }, [state.StickyNote])

  return (
    <div className='m-5 w-full'>
      <div className='text-2xl font-semibold mb-2'>Sticky Wall</div>
      <div className="grid grid-cols-3 items-start gap-5 h-screen w-full p-5 border-2 rounded-lg">
        {state.StickyNote.map((element) => (
          <Cart title={element.header}>{element.content}</Cart>
        ))}
        <CreateButton/>
      </div>
    </div>
    
  );
};

export default StickWall;
