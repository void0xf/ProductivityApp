import { Menu, Settings } from "lucide-react";
import { SidebarContext } from "../../App";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

export default function Sidebar({ children }) {
  const {isSideBarActive, setIsSideBarActive}  = useContext(SidebarContext);
  const {dispatch} = useContext(UserContext)
  const handleSettings = () => {
    dispatch({type: 'TOGGLE_SETTINGS_CARD'})
  }

  return (
    <div className="h-full">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm justify-between">
        <div>
          <div className=" pb-2 flex justify-between items-center">
            <div className="ml-2 font-semibold text-xl">Menu</div>
            <button
              onClick={() => { setIsSideBarActive(false) }}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
            <Menu />
            </button>
          </div>
          <div className="">{children}</div>
        </div>
        
        <button onClick={() => {handleSettings()}}>
        <div className=" flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3
          `}
          >
            <div className="leading-4 flex flex-col items-start">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
          <div>
            <button>
              <Settings strokeWidth={1.7} size={20} />
            </button>
          </div>
          </div>
        </div>
        </button>
      </nav>
    </div>
  )
}