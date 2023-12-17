import { Search } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { SearchContext } from '../../contexts/search.context';

const SearchTask = () => {
  const {state, dispatch} = useContext(SearchContext);
  const handleTaskSearch = (event) => { // Corrected typo from 'hadnleTaskSearch' to 'handleTaskSearch'
    const input = event.target.value;
    dispatch({ type: 'UPDATE_SEARCH_BAR', payload: input }); // Corrected 'paylaod' to 'payload'
  };

  return (
    <div className='flex justify-center text-center mb-4 mr-4'>
            <div className='relative left-7 top-[7px]'><Search size={20} strokeWidth={3} color='gray'/></div>
            <input 
              type="text" 
              className='border-2 rounded-md px-8 py-1 w-full' placeholder='Search...'
              onChange={handleTaskSearch}
            />
    </div>
  )
}

export default SearchTask
