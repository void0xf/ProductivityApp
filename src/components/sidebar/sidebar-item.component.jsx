import { useFilterContext } from "../../contexts/filter.context";


export function SidebarItem({ icon, text, active, alert, numberOfAlerts, clickType, payload }) {
  const { state, dispatch } = useFilterContext();

  const handleClick = () => {

    if(clickType !== 'list') {

      dispatch({type:'UPDATE_FILTER', 
      payload:{
        filter:payload,
        listFilter:'',
        tagsFilter:[]
      }})
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
        transition-colors group
        ${  
        active
            ? " text-white-400"
            : "hover:bg-indigo-50 text-gray-600"
        }
        ${
          state.listFilter == payload 
            ? ""
            : ''

        }

      
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
           "w-52 ml-3" 
        } ${active ? 'font-semibold' : ''}`}
      >
        {text}
      </span>
      {numberOfAlerts > 0 &&  (
        <div className={`  ${
          "bg-[#415A77] w-6 h-6 rounded-xl text-center"
          }`}>
          {<div className="antialiased font-semibold text-customWhite">{numberOfAlerts }</div>}
          
        </div>
      )}

    </li>
  )
}