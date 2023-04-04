import "../../index.css";
import assets from "../../assets/svgimages";
import CheckConnection from "../checkConnection";
import { AnimateOnChange } from "react-animation";
import { AuthUser,FriendChats } from "../../contextStore";
import {useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentFriends from "./currentfriends";
import SearchFriend from "./searchfriend";
import { db, auth } from "../../firebase";
import { success, failed } from "../../reactToast";
import { ToastContainer } from "react-toastify";
import { collection, query, getDocs, where } from "firebase/firestore";
import {
  signOut
} from "firebase/auth";




function FriendList({ toggleIsVisible }) {
  const [loading, setLoading] = useState(false);
  const [isFocus, setisFocus] = useState(false);
  const [search, setSearch] = useState(true);
  const { authimage,saveDatas } = useContext(AuthUser);
  const [searching, setSearching] = useState(false);
  const [friends, setFriends] = useState([]);
  const {setChat} = useContext(FriendChats);

  const navigate = useNavigate();
 
  
  ///
  const [menuFocus, setMenuFocus] = useState(false);

  const toggleMenuFocus = () => {
    setMenuFocus(!menuFocus);
  };
 const onFocusEvent = () => {
  setisFocus(!isFocus);
  setSearch(!search)
  setSearching(!searching);
  
 }
  const toggleOnFocus = () => {
    setisFocus(!isFocus);
    setSearch(!search);
    setSearching(!searching);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

 
   
    const friendArray = []
    const queryRef = query(collection(db, "userinformation"), where("authemail" ,"!=", saveDatas.authemail ));
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {
     
      if (
        doc
          .data()
          .authname.toLowerCase()
          .includes(e.target.value.toLowerCase()) &&
        e.target.value !== ""
      ) {
        //console.log(doc.id, " => ", doc.data().authemail);
      
        friendArray.push({...doc.data(), id: doc.id});

        
        
      }
    });
    console.log(friendArray)
    setFriends(friendArray)
  };

  const handleLogout = async () => {
    toggleMenuFocus()
    setLoading(true)
    try {
      await signOut(auth)
      window.localStorage.removeItem("my-store-image"); 
      window.localStorage.removeItem("my-store");
      window.localStorage.removeItem("my-friend-store");
      window.localStorage.removeItem("my-room-key");
      setChat([]);
     
      success("Logging out")
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    catch(error)  {
      failed(error.code)

    }
   
    setLoading(false)
    
  }

  {/*

    function removeDuplicateValue(array, key) {
    return [...new Map(array.map(item => [item[key], item])).values()]
    const friendArray = JSON.stringify(removeDuplicateValue(sArray, "friendemail"));

  }

*/}


  return (
    <div className="chat bg-white h-full  overflow-hidden">
      {/*profile-section */}
      <div className="bg-[#F0F2F5] flex justify-between items-center px-6 border-x-0 border-t-0 border-b py-2">
        <div className="relative group">
          <div
            className="rounded-full h-12 w-12 lg:h-14 lg:w-14 cursor-pointer"
            onClick={toggleIsVisible}
          >
            <img
              className="rounded-full w-full h-full object-cover"
              src={authimage}
              alt="user-pics"
            />
          </div>

          <span className="absolute text-sm hidden min-w-max sm:group-hover:block -right-[100px] bottom-4 bg-white border-black border p-1">
            View Profile
          </span>
        </div>

        <div className="flex items-center space-x-6">
          {/*refresh-section-end */}
          <CheckConnection>
            <div className="relative group z-50">
              <div className="rounded-full p-1 bg-[#25D366] flex  text-black ">
                <span
                  dangerouslySetInnerHTML={{ __html: assets.connected }}
                ></span>
              </div>
              <span className="absolute min-w-max text-sm hidden group-hover:block right-7 -bottom-7 bg-white border-black border p-1">
                Connected
              </span>
            </div>
          </CheckConnection>

          {/*refresh-section-end */}

          <div className="relative group">
            <button
              onClick={toggleMenuFocus}
              className="relative outline-none bg-inherit rounded-full p-3 focus:bg-gray-200"
              dangerouslySetInnerHTML={{ __html: assets.menu }}
            ></button>
            <span className="absolute text-sm hidden group-hover:block -right-4 -bottom-4 bg-white border-black border p-1">
              Menu
            </span>
            {/*pop out */}
            <AnimateOnChange
              animationIn="popIn"
              animationOut="popOut"
              className="fixed z-30 top-[50px]"
            >
              {menuFocus && (
                <div className="sm:-left-[120px]  text-sm -left-[90px]  sm:text-[16px] sm:-bottom-[110px] shadow-md bg-white z-30 py-3 absolute min-w-max h-fit  text-zinc-500">
                  <button disabled={loading} onClick={handleLogout} className="block bg-inherit hover:bg-[#F0F2F5] mx-auto px-4 sm:px-6 py-1 ">
                    Log Out
                  </button>
                  <button className="block bg-inherit hover:bg-[#F0F2F5] mx-auto px-4 sm:px-6 py-1 ">
                    Settings
                  </button>
                </div>
              )}
            </AnimateOnChange>

            {/*pop out */}
          </div>
        </div>
      </div>
      {/*profile-section-end */}

      <div className="bg-white -z-20 flex space-x-3 items-center p-3 border-b">
        <div className="rounded-lg relative w-full h-8 sm:h-10">
          <input
            className="outline-none bg-[#F0F2F5] rounded-lg w-full h-full text-sm pl-14"
            type="text"
            placeholder="Search or start a new chat"
            name="search"
            onFocus={onFocusEvent}
            onBlur={toggleOnFocus}
            onChange={handleSearch}
          />
          {isFocus && (
            <span
              className="animate__rotateInDownRight absolute top-2 left-4"
              dangerouslySetInnerHTML={{ __html: assets.arrow }}
            ></span>
          )}
          {/* */}
          {search && (
            <span
              className="absolute top-2 left-4"
              dangerouslySetInnerHTML={{ __html: assets.search }}
            ></span>
          )}
        </div>
        <button className="bg-inherit">
          <span dangerouslySetInnerHTML={{ __html: assets.filter }}></span>
        </button>
      </div>

      <div className="chat-track bg-white w-full h-[85%] sm:h-[80%]  relative overflow-y-scroll sm:overflow-x-auto">
        <div className="  text-black bg-white flex-col flex w-full">
          {!searching && <CurrentFriends />}
          {searching && <SearchFriend searching={searching} setSearching={setSearching} friends={friends} />}
        </div>
      </div>

      <ToastContainer/>
      {/*chats

36+j
         */}
    </div>
  );
}//////////////////////////////////////////////////////           

export default FriendList;
