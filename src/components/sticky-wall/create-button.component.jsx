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

  return (
    <div className='absolute z-50 bg-gray-400'>
      <div>
        <p>Name: </p>
        <input type="text" className='bg-gray-400'/>
      </div>
      <p>Note</p>
      <textarea type="text" name="" id="" className='bg-gray-400'/>
    </div>
  );
  
}

export default CreateButton
