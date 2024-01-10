import React from 'react'

const ComputerTitleCard = ({name, numberOfNotifictaions}) => {
  return (
    <div className='hidden sm:flex flex-row py-2 visible'>
        <span className='text-3xl pr-5 font-semibold text-textcolor'>{name}</span>
        <span className='p-1 px-3 text-2xl border-2 rounded-lg bg-bkg'>{numberOfNotifictaions}</span>
      </div>
  )
}

export default ComputerTitleCard
