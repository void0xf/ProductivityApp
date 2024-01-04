import { useContext } from "react";
import { SidebarContext } from "../../App";
import { useFilterContext } from "../../contexts/filter.context";


export function SidebarItem({ icon, text, active, alert, numberOfAlerts, clickType, payload }) {
  const { state, dispatch } = useFilterContext();
  const { isSideBarActive, setIsSideBarActive } = useContext(SidebarContext);


  const handleClick = () => {

    if(clickType !== 'list') {
      dispatch({type:'UPDATE_FILTER', 
      payload:{
        filter:payload,
        listFilter:'',
        tagsFilter:[]
      }})
      setIsSideBarActive(false);
    }
    if(clickType == 'list') {
      //handle button toggle
      payload === state.listFilter ? payload='None' : payload=payload
      
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
        transition-colors group text-gray-600
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all  w-52 ml-3  ${active ? 'font-bold' : ''}`}
      >
        {text}
      </span>
      {numberOfAlerts > 0 &&  (
        <div className={`  ${
          "bg-acent w-6 h-6 rounded-xl text-center"
          }`}>
          {<div className="antialiased font-semibold text-textcolor">{numberOfAlerts }</div>}
          
        </div>
      )}

    </li>
  )
}