import { Check, Plus, X } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StickyWallContext } from '../../contexts/sticky-wall.context'

const CreateButton = () => {
  const [isInputFormActive, setIsInputFormActive] = useState(false);
  const [stickNoteName, setStickNoteName] = useState('');
  const [stickNoteContent, setstickNoteContent] = useState('');
  const stickNoteNameRef = useRef();
  const stickNoteContentRef = useRef();

  const {state, dispatch} = useContext(StickyWallContext);

  const handleStickNoteNameChange = (event) => {
    setStickNoteName(event.target.value);
  }

  const handleStickNoteContentChange = (event) => {
    setstickNoteContent(event.target.value);
  }

  const handleCheck = () => {
    dispatch({type:'ADD_STICKY_NOTE', payload: {header: stickNoteName, content: stickNoteContent}})
    setIsInputFormActive(false);
  }

  return isInputFormActive 
    ? 
    (
        <div className='max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-gray-300 rounded-md       shadow-2xl'>
        <div className="font-semibold text-2xl mx-4 pr-5 pt-2 max-w-auto flex justify-between">
          <div>
            <input
              type="text"
              value={stickNoteName}
              onChange={handleStickNoteNameChange}
              useRef={stickNoteNameRef}
              placeholder='Name'
              className='bg-gray-300 focus:outline-none max-w-auto'
              maxLength={15}
            />
          </div>
          <div className='flex'>
            <button 
              className='px-2 hover:bg-gray-200 rounded-lg'
              onClick={() => {handleCheck()}}
            >
              <Check />
            </button>
            <button 
              className='px-2 hover:bg-gray-200 rpunded-lg'
              onClick={() => {setIsInputFormActive(false)}}
            ><X /></button>
          </div>
        </div>
        <div className="px-4 pb-4 break-words leading-loose">
          <textarea
            value={stickNoteContent}
            onChange={handleStickNoteContentChange}
            name=""
            id=""
            cols="30"
            rows="10"
            className='resize-none bg-gray-300 focus:outline-none'
            placeholder='Type Your content'
          >
          </textarea>
        </div>
      </div>

    )  
    :
    (
    <div className='bg-gray-300 h-1/2 w-1/2 shadow-2xl max-h-96'>
      <div className='flex text-center justify-center items-center justify-items-center h-full w-full '>
        <button className='hover:bg-slate-400 rounded-md' onClick={() => {setIsInputFormActive(true)}}>
          <Plus size={40}/>
        </button>
      </div>
      
    </div>
    )
  
}

export default CreateButton
