import React, { useContext, useEffect, useRef, useState } from 'react';
import { StickyWallContext } from '../../contexts/sticky-wall.context';
import { X } from 'lucide-react';

const getActiveStickyNoteInfo = (id, stickyNotes) => {
  return stickyNotes.find((stickyNote) => stickyNote.id === id) || { header: '', content: '' };
};

const StickyNoteInfo = () => {
  const [stickNoteName, setStickNoteName] = useState('');
  const [stickNoteContent, setStickNoteContent] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const { state, dispatch } = useContext(StickyWallContext);

  useEffect(() => {
    const activeStickyNote = getActiveStickyNoteInfo(
      state.activeStickNoteToEdit,
      state.StickyNote
    );

    setStickNoteName(activeStickyNote.header);
    setStickNoteContent(activeStickyNote.content);
  }, [state.activeStickNoteToEdit]);

  const handleAddStickyNote = () => {
    if ((stickNoteName && stickNoteName) && stickNoteName.length >= 3 && stickNoteContent.length >= 3) {
      dispatch({
        type: 'EDIT_STICKY_NOTE',
        payload: {
          id: state.activeStickNoteToEdit,
          header: stickNoteName,
          content: stickNoteContent,
        },
      });
      dispatch({ type: 'CLOSE_STICKY_NOTE_INFO', payload: null });
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleOnDeleteStickyNoteClick = () => {
    dispatch({ type: 'stickyNoteFiltered', payload: state.activeStickNoteToEdit });
  };

  const handleNameChange = (event) => {
    setStickNoteName(event.target.value);
  };

  const handleContentChange = (event) => {
    setStickNoteContent(event.target.value);
  };

  const handleCloseStickyNoteInfo = () => {
    if(stickNoteName === '' || stickNoteName === null) {
      dispatch({type:'REMOVE_STICKY_NOTE', payload:state.activeStickNoteToEdit})
    }
    dispatch({ type: 'CLOSE_STICKY_NOTE_INFO', payload: null });
  };

  return (
    <div className='border-2 border-bordercolor rounded-xl p-2 flex flex-col justify-between sm:mx-2 sm:max-w-full'>
      <div>
        <div className='flex justify-between items-center'>
          <span className='text-2xl text-textcolor'>Sticky Note: </span>
          <button onClick={handleCloseStickyNoteInfo}><X /></button>
        </div>
        <form action="">
          <div>
            <input
              type="text"
              value={stickNoteName}
              placeholder={'Type your name for this Task'}
              onChange={handleNameChange}
              className='border border-bordercolor bg-bkg rounded-lg border-gray-400 w-full placeholder-grey-200 border-opacity-40 py-2 px-1 my-1 focus:outline-acent'
              required
              minLength={3}
              maxLength={10}
            />
          </div>
          <div>
            <input
              type="text"
              value={stickNoteContent}
              placeholder={stickNoteContent === '' ? 'Type Your content Here' : stickNoteContent}
              onChange={handleContentChange}
              className='border rounded-lg border-bordercolor bg-bkg w-full placeholder-grey-200 border-opacity-40 pb-32 px-1 my-1 focus:outline-acent'
              required
              minLength={3}
            />
          </div>
          {showWarning && (
            <div className='text-red-500 mt-2'>
              Both fields must have a minimum length of 3 characters.
            </div>
          )}
        </form>

        <div className='flex justify-between mb-2 mt-5'>
          <button
            className='py-2 px-2 rounded-lg bg-acent font-semibold'
            onClick={handleAddStickyNote}>
            Add / Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyNoteInfo;
