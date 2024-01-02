import React, { useContext } from 'react';
import { StickyWallContext } from '../../contexts/sticky-wall.context';
import { FileEdit, X } from 'lucide-react';

const StickyCart = ({ stickyNote }) => {
  const {id, header, content, date } = stickyNote;
  const {state, dispatch} = useContext(StickyWallContext)
 
  const handleStickyNoteDelete = () => {
    dispatch({ type:'REMOVE_STICKY_NOTE', payload:id })
  }
  const handleStickyNoteEdit = () => {
    dispatch({ type:'OPEN_STICKY_NOTE_INFO', payload:id })
  }

  return (
    <div className=' bg-slate-400 rounded-md py-1 px-4 w-full shadow-2xl mb-4'>
      <div className='flex justify-between'>
        <div className='font-semibold text-2xl'>{header}</div>
     
        <div className={`flex gap-2 transition-opacity ${state.isEditButtonActive ? 'opacity-100' : 'opacity-0'}`}>
          {state.isEditButtonActive 
          ?
          (<>
          <button  onClick={() => {handleStickyNoteDelete()}}><X /></button>
          <button  onClick={() => {handleStickyNoteEdit()}}><FileEdit /></button>
          </>)
          :
          null
          }
        </div>

        
      </div>
      <div className=' text-sm'>{content}</div>
    <div className=' text-right'>{date}</div>
  </div>
  );
};

export default StickyCart;
