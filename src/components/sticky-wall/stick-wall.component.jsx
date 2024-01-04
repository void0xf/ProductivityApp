import React, { useContext, useEffect } from 'react';
import StickyCart from './sticky-cart-component';
import CreateButton from './create-button.component';
import { StickyWallContext } from '../../contexts/sticky-wall.context';
import { PenSquare, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import StickyNoteInfo from './create-button.component';


const StickWall = () => {
  const {state, dispatch} = useContext(StickyWallContext);
  
  const handleCreateNewStickyNote = () => {
    const id = uuidv4(); 
    dispatch({type:'ADD_STICKY_NOTE', payload: {
      id: id,
      header: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
    }})
    dispatch({type:'OPEN_STICKY_NOTE_INFO', payload: id})
  }
  useEffect(() => {console.log(state);}, [state])
  
  const toogleEdit = () => {
    dispatch({type:'TOGGLE_EDIT_BUTTON', payload: null})
  }

  return (
    <div className='m-5'>
        <div className={`absolute right-0 z-20 w-full shadow-2xl transition-all ${state.activeStickNoteToEdit !== null ? 'opacity-100' : ' opacity-0 translate-y-full '}`}>
          <StickyNoteInfo />
        </div>
        <div className={`${state.activeStickNoteToEdit !== null ? 'blur-[4px]' : ''}`}>
          <div className='flex justify-between mb-1 items-baseline'>
            <div className=''>
              <button onClick={() => {handleCreateNewStickyNote()}}>
                <Plus />
              </button>
            </div>
            <div className=''>
              <button onClick={() => {toogleEdit()}} >
                <PenSquare size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
          
          <div className="h-full p-5 border-2 border-bordercolor rounded-lg overflow-y-scroll">
            {state.StickyNote.map((stickyNote) => (
              stickyNote.header && stickyNote.content
              ?
              <StickyCart stickyNote={stickyNote}/>
              :
              null
            ))}
          </div>
        </div>
    </div>
  );
};

export default StickWall;
