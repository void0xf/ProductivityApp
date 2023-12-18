import React, { useContext, useEffect } from 'react';
import StickyCart from './sticky-cart-component';
import CreateButton from './create-button.component';
import Cart from './testcart.component';
import { StickyWallContext } from '../../contexts/sticky-wall.context';
import { PenSquare, Plus } from 'lucide-react';

const StickWall = () => {
  const {state} = useContext(StickyWallContext);

  return (
    <div className='m-5 mx-auto'>
      <div className='flex justify-between items-baseline'>
        <div className='mb-2'><Plus /></div>
        <div><PenSquare size={16} strokeWidth={1.5} /></div>
      </div>
      <div className="h-screen p-5 border-2 rounded-lg">
        {/* {state.StickyNote.map((element) => (
          <Cart title={element.header}>{element.content}</Cart>
        ))} */}
        {/* <CreateButton/> */}
        <div className=' bg-slate-400 rounded-md py-1 px-4 w-full shadow-2xl mb-4'>
          <div className='font-semibold text-2xl'>Task 1</div>
          <div className=' text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati suscipit dolores eos aut quod saepe reprehenderit officia accusantium voluptate excepturi minus consectetur eligendi nesciunt, dolore, earum assumenda in est voluptatibus!</div>
          <div className=' text-right'>{new Date().toISOString().split('T')[0]}</div>
        </div>
        <div className=' bg-zinc-300 rounded-md py-1 px-4 w-full shadow-2xl'>
          <div className='font-semibold text-2xl'>Some Content here</div>
          <div className=' text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati suscipit dolores eos aut quod saepe reprehenderit officia accusantium voluptate excepturi minus consectetur eligendi nesciunt, dolore, earum assumenda in est voluptatibus!</div>
          <div className=' text-right'>{new Date().toISOString().split('T')[0]}</div>
        </div>
      </div>
    </div>
    
  );
};

export default StickWall;
