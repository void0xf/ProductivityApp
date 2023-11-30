
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, useEffect } from "react"
import { SidebarContext } from '../menu-bar.component'
import { filtrTasks, useFilterContext } from "../../../contexts/filter.context"
import { useTaskContext } from "../../../contexts/tasks.context"

export function SidebarItem({ icon, text, active, alert, numberOfAlerts, clickType, payload }) {
  const { expanded } = useContext(SidebarContext)
  const { state, dispatch } = useFilterContext();
  
  useEffect(()=>{
    console.log(state);
  }, [state])

  const handleClick = () => {

    if(clickType == 'Upcoming' || clickType == 'Today') {
      payload === state.filter ? payload='' : payload=payload

      dispatch({type:'UPDATE_FILTER', 
      payload:{
        filter:payload,
        listFilter:'',
        tagsFilter:[]
      }})
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
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
        ${
          state.listFilter === payload && state.listFilter !=='' ? "bg-slate-600" : ""
        }
        ${
          state.filter === payload && state.filter !=='' ? "bg-slate-600" : ""
        }
      
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {numberOfAlerts > 0 &&  (
        <div className={`  ${
          expanded ? "bg-customBlack w-6 h-6 rounded-xl text-center" : " relative bg-customBlack bottom-1 left-1 w-2 h-2 rounded-xl"
        }`}>
          {expanded ? <div className="antialiased font-semibold text-customWhite">{numberOfAlerts }</div> : <p></p>}
          
        </div>
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}