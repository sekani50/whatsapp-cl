import "../../index.css";
//import assets from "../../assets/svgimages";
//import img from "../../assets/testimage/pic.png";
import { useState, useContext } from "react";
import { FriendChats } from "../../contextStore";

function CurrentFriends() {
  const { friendData, setIsChat,setIsMobileChat, chats } = useContext(FriendChats);

  return (
    <div className="currentfriends">
      <div onClick={() => 
        {setIsChat(true)
        setIsMobileChat(true)
       } } className=" group cursor-pointer ">
        <div className="border-b px-3 flex justify-between group-hover:bg-[#F0F2F5] items-center py-2 sm:py-3">
          <div className="flex items-center space-x-3">
            <div className="rounded-full h-12 w-12 lg:h-14 lg:w-14">
              <img
                className="rounded-full w-full h-full object-cover"
                src={friendData.friendPics}
                alt="user-pics"
              />
            </div>

            <div className="">
              <p className="truncate text-[15px] text-start w-48 sm:text-lg">
                {friendData.friendName}
              </p>
              <p className="truncate text-sm text-start w-48 sm:text-[16px]">
                {chats.length !== 0 ? chats[chats.length - 1].text : "---"}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-[13px]">
              {chats.length !== 0 ? chats[chats.length - 1].date : "---"}
            </p>
            {/*
               
                <div className="flex space-x-2 items-center">
                  <span className="bg-[#25d366] rounded-full px-2 py-1 text-[12px] text-white">
                    2
                  </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: assets.showMore }}
                  ></span>
                </div>
               */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentFriends;
