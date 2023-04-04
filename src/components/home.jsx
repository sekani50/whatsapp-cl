import "../index.css";
import Chat from "./chat/chat";
import FriendList from "./chat/friendlist";
import Userinfo from "./chat/userinfo";
import FriendInfo from "./chat/friendinfo";
import { useState, useContext } from "react";
import "animate.css/animate.min.css";
import "animate.css";
import { FriendChats } from "../contextStore";

function Home() {
  const [isListVisible, setIsListVisible] = useState(true);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isFriendVisible, setIsFriendVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const {isMobileChat} = useContext(FriendChats);

  const toggleIsVisible = () => {
    setIsListVisible(!isListVisible);
    setIsProfileVisible(!isProfileVisible);
  };

  const toggleChatsVisibility = () => {
    setIsFriendVisible(!isFriendVisible);
    setIsChatVisible(!isChatVisible);
  };
  
  return (
    <div className="home ">
      <div className="flex fixed inset-0 w-full h-full">
        <div 
        id={isMobileChat ? "hide-friendList" : "show-friendList"}
        className=" relative w-[100%] md:w-[45%] lg:w-[35%] border-r">
          {isListVisible && <FriendList toggleIsVisible={toggleIsVisible} />}
          {isProfileVisible && <Userinfo toggleIsVisible={toggleIsVisible} />}
        </div>

        {/*
            <ScrollAnimation
            className=" relative w-[100%] md:w-[45%] lg:w-[35%] border-r"
          animateIn="fadeIn"
          
        >
         
        </ScrollAnimation>
          
          */}
      
          <div
            id={isMobileChat ? "let-chat" : "no-chat"}
          className=" w-[100%] md:w-[55%] lg:w-[65%] relative sm:block  ">
            {isChatVisible && (
              <Chat toggleChatsVisibility={toggleChatsVisibility} />
            )}

            {isFriendVisible && (
              <div className="w-full xl:flex h-full">
                <div className="hidden xl:block xl:w-3/5 relative">
                  <Chat toggleChatsVisibility={toggleChatsVisibility} />
                </div>
                <div className="w-full xl:w-2/5 relative border-l">
                  <FriendInfo toggleChatsVisibility={toggleChatsVisibility} />
                </div>
              </div>
            )}
          </div>
       

        {/*<div dangerouslySetInnerHTML={{__html:assets.laptop}}> 
     
 */}
      </div>
    </div>
  );
}

export default Home;
