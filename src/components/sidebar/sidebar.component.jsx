import { Menu, Settings } from "lucide-react";
import SidebarContext from "../../contexts/sidebar.context";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebase/firebaseConfig";

export default function Sidebar({ children }) {
  const { isSideBarActive, setIsSideBarActive } = useContext(SidebarContext);
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const [user] = useAuthState(auth);
  const { dispatch } = useContext(UserContext);
  const handleSettings = () => {
    dispatch({ type: "TOGGLE_SETTINGS_CARD" });
  };

  return (
    <div className="h-full">
      <nav className="h-full flex flex-col bg-bkg border-bordercolor border-r shadow-sm justify-between">
        <div>
          <div className=" pb-2 flex justify-between items-center">
            <div className="ml-2 font-semibold text-xl text-textcolor">
              Menu
            </div>
            <button
              onClick={() => {
                setIsSideBarActive(false);
              }}
              className="p-1.5 rounded-lg bg-bkg hover:bg-text"
            >
              <Menu />
            </button>
          </div>
          <div className="">{children}</div>
        </div>

        <div
          onClick={() => {
            handleSettings();
          }}
          className="cursor-pointer"
        >
          <div className="flex p-3">
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
              <div className="leading-4 flex flex-col items-start w-full">
                <h4 className="font-semibold truncate max-w-[180px]">
                  {user ? user.displayName || "User" : "Guest"}
                </h4>
                <span className="text-xs text-gray-600 truncate max-w-[180px]">
                  {user?.email || "Not logged in"}
                </span>
              </div>
              <div>
                <button>
                  <Settings strokeWidth={1.7} size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
