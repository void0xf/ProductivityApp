
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, useEffect } from "react"
import { filtrTasks, useFilterContext } from "../../../contexts/filter.context"
import { useTaskContext } from "../../../contexts/tasks.context"

export function SidebarItem({ icon, text, active, alert, numberOfAlerts, clickType, payload }) {
  const { state, dispatch } = useFilterContext();

  const handleClick = () => {

    if(clickType !== 'list') {
      payload === state.filter ? payload='' : payload=payload

      dispatch({type:'UPDATE_FILTER', 
      payload:{
        filter:payload,
        listFilter:'',
        tagsFilter:[]
      }})
      console.log(payload)
    }
    if(clickType == 'list') {
      //handle button toggle
      payload === state.listFilter ? payload='' : payload=payload
      
      dispatch({type:'UPDATE_FILTER_LIST', 
        payload:{
          filter:'',
          listFilter:payload,
          tagsFilter:[]
        }})
    }
    
  }

  return (
    <li onClick={handleClick}
      className={` ml-2
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }

      
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
           "w-52 ml-3"
        }`}
      >
        {text}
      </span>
      {numberOfAlerts > 0 &&  (
        <div className={`  ${
          "bg-customBlack w-6 h-6 rounded-xl text-center"
          }`}>
          {<div className="antialiased font-semibold text-customWhite">{numberOfAlerts }</div>}
          
        </div>
      )}

    </li>
  )
}