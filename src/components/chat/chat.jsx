import "../../index.css";
import assets from "../../assets/svgimages";
//import img from "../../assets/testimage/pic.png";
import { useState, useContext, useEffect } from "react";
import { AnimateOnChange } from "react-animation";
import { FriendChats, AuthUser } from "../../contextStore";
import EncryptedMessage from "./encryptedmessage";
import timeFormat from "../timeformat";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  collection,
  query,
  where,
  addDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

function Chat({ toggleChatsVisibility }) {
  const [menuFocus, setMenuFocus] = useState(false);
  const { friendData, setChat, rooms, isChat, setIsMobileChat } =
    useContext(FriendChats);
  const { saveDatas } = useContext(AuthUser);
  const [newMessage, setNewMessage] = useState();

  let hour, minutes, seconds, amPm;
  const toggleMenuFocus = () => {
    setMenuFocus(!menuFocus);
  };

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where(
        "room", "==",`${saveDatas.authemail}+${rooms}`
      ),
      orderBy("createdAt")
    );

    const queryMessageAgain = query(
      messageRef,
      where(
        "room", "==",`${rooms}+${saveDatas.authemail}`
      ),
      orderBy("createdAt")
    );
    const messageArray = [];
    const unsub = onSnapshot(queryMessage, (snapShot) => {
     
      snapShot.forEach((message) => {
        messageArray.push({ ...message.data(), id: message.id });
      });
      
    });

    const unsubAgain = onSnapshot(queryMessageAgain, (snapShot) => {
     
      snapShot.forEach((message) => {
        messageArray.push({ ...message.data(), id: message.id });
      });
      
    });
     //return () => unsubAgain();

     setChat(messageArray);

    return () => {unsub()
                  unsubAgain()}
    
   
  }, []);

  const handleSubmit = async () => {
    if (newMessage == "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: new Date().getTime(),
      date: timeFormat(hour, minutes, seconds, amPm),
      user: saveDatas.authemail,
      
      room: `${saveDatas.authemail}+${rooms}`,
    });

    setNewMessage("");
  };

  return (
    <div className="friendList h-full flex flex-col overflow-hidden">
      {/*profile-section */}
      <div className="absolute bottom-0 w-full h-2 bg-[#25d366]"></div>

      {isChat && (
        <div className="absolute top-0 left-0 w-full bg-[#F0F2F5] flex justify-between items-center px-2 sm:px-6 border-b py-2">
          <div className="flex space-x-3 items-center">
            <div
              onClick={() => setIsMobileChat(false)}
              className="flex sm:hidden"
            >
              <span dangerouslySetInnerHTML={{ __html: assets.arrow }}></span>
            </div>
            <div className="rounded-full h-12 w-12 lg:h-14 lg:w-14">
              <img
                className="rounded-full w-full h-full object-cover"
                src={friendData.friendPics}
                alt="user-pics"
              />
            </div>

            <p className="truncate text-[15px] sm:text-lg ">
              {friendData.friendName}
            </p>
          </div>

          <div className="flex space-x-4 sm:space-x-6 lg:space-x-8">
            <div className="relative font-medium group">
              <button
                className="relative outline-none bg-inherit rounded-full p-3 focus:bg-gray-200"
                dangerouslySetInnerHTML={{ __html: assets.search }}
              ></button>
              <span className="absolute text-sm hidden group-hover:block -right-4 -bottom-4 bg-white border-black border p-1">
                Search
              </span>
            </div>

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
                className="fixed top-[50px] z-30"
              >
                {menuFocus && (
                  <div className="sm:-left-[160px] -left-[150px] -bottom-[80px] sm:-bottom-[90px] cursor-pointer text-start z-30 shadow-md bg-white py-3 absolute min-w-max h-fit text-lg sm::text-xl text-zinc-500">
                    <div
                      onClick={toggleChatsVisibility}
                      className="block bg-inherit text-sm sm:text-[16px] hover:bg-[#F0F2F5] mx-auto px-4 sm:px-6 py-1 "
                    >
                      Profile Info
                    </div>
                    <div className="block bg-inherit text-sm sm:text-[16px] hover:bg-[#F0F2F5] mx-auto px-4 sm:px-6 py-1 ">
                      Clear Messages
                    </div>
                  </div>
                )}
              </AnimateOnChange>
              {/*pop out */}
            </div>
          </div>
        </div>
      )}

      {isChat && (
        <div className="chat-track  w-full h-[83%] sm:h-[78%] mt-[68px] sm:mt-[72px] relative inset-0 overflow-y-scroll sm:overflow-x-auto">
          <div className=" flex-col space-y-3 flex w-full sm:p-6 p-4">
            {/*user*/}
            <EncryptedMessage />

            {/*friend
            <div className="flex justify-end items-center text-[#d9fdd3] ">
            <div className="bg-[#d9fdd3] relative w-[87%] sm:w-[80%] rounded-lg">
              <div className="absolute -right-[15px] -top-[5px]">
                <span
                  dangerouslySetInnerHTML={{ __html: assets.triangleB }}
                ></span>
              </div>
              <div className="text-black text-justify bg-[#d9fdd3] rounded-lg p-2 w-fit h-fit">
                How are you, will you go there? are you coming home How are you,
                will you go there? are you coming home How are you, will you go
                there? are you coming home
              </div>
            </div>
          </div>

           <div 
                    className="flex justify-start items-center text-white py-3 " key={content.id}>
                   
                    <div className="bg-none relative w-[87%] sm:w-[80%]">
                      <div className="absolute -left-[15px] -top-[13px]">
                        <span
                          dangerouslySetInnerHTML={{ __html: assets.triangle }}
                        ></span>
                      </div>
                      <div className="bg-white rounded-lg p-2 w-fit h-fit space-y-2 sm:space-y-4">
                      <div className="text-black text-justify bg-white rounded-lg p-2 w-fit h-fit">
                        {content.text}
                      </div>
                      <p className="text-end text-[11px] sm:text-[13px] text-gray-600">{content.date}</p>
                      </div>
                    </div>
                  </div>
          */}
          </div>
        </div>
      )}

      {/*message*/}
      {!isChat && (
        <div className=" w-full relative m-auto inset-0 px-3 h-3/4">
          <div className="w-full sm:w-[400px] lg:w-[500px] inset-0 absolute m-auto h-fit space-y-10 p-6">
            <span dangerouslySetInnerHTML={{ __html: assets.laptop }}></span>

            <div className="text-center space-y-6">
              <p className="text-xl sm:text-2xl lg:text-3xl tracking-wide text-zinc-700 font-light ">
                Whatsapp Web
              </p>
              <p className="text-sm sm:text[16px] text-zinc-700 font-light  leading-6 tracking-wide">
                Use whatsapp to send and receive messages without keeping your
                phone online
              </p>
            </div>

            <div className="flex space-x-2 justify-center items-center text-zinc-700">
              <span
                className=""
                dangerouslySetInnerHTML={{ __html: assets.padlock }}
              ></span>
              <p className="text-sm">End-to-end encryption</p>
            </div>
          </div>
        </div>
      )}

      {/*enter message */}
      {isChat && (
        <div className="px-3 py-2 border-t absolute left-0 bottom-3 w-full text-zinc-600 flex bg-[#F0F2F5] item-center justify-around">
          <button className="bg-[#F0F2F5] my-auto">
            <span dangerouslySetInnerHTML={{ __html: assets.smiley }}></span>
          </button>
          <button className="bg-[#F0F2F5] my-auto">
            <span dangerouslySetInnerHTML={{ __html: assets.attach }}></span>
          </button>
          <input
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Type a message"
            name="message"
            className="bg-white w-[70%] lg:w-3/4 font-medium tracking-wide outline-none pl-4 rounded-lg text-[15px] sm:h-12 h-10"
            type="text"
            value={newMessage || ""}
          />
          <button
            onClick={handleSubmit}
            onKeyDown={e => e.key ==="Enter" && handleSubmit}
            className="bg-[#F0F2F5] my-auto rounded-full p-3 focus:bg-gray-200"
          >
            <span dangerouslySetInnerHTML={{ __html: assets.send }}></span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Chat;
