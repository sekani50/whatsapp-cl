import "../../index.css";
import assets from "../../assets/svgimages";
import img from "../../assets/testimage/pic.png";
import {useState , useContext } from "react";
import { FriendChats } from "../../contextStore";

function FriendInfo({toggleChatsVisibility}) {
  const {friendData} = useContext(FriendChats);



  return (
    <div className="friendinfo w-full h-full relative bg-[#F0F2F5] ">
      <div className=" w-full bg-[#F0F2F5] flex space-x-6 px-6 border-b py-4 sm:py-6">
        <div className="cursor-pointer" onClick={toggleChatsVisibility}>
            
          <span dangerouslySetInnerHTML={{ __html: assets.close }}></span>
        </div>
        <p>Profile Info</p>
      </div>
      <div className="bg-white w-full h-1/2 space-y-3 p-4 flex items-center justify-center flex-col">
        <div className="sm:w-[300px] sm:h-[300px] w-[200px] h-[200px]  rounded-full ">
          <img
            className="object-cover w-full h-full rounded-full"
            src={friendData.friendPics}
            alt="profile"
          />
        </div>
            <p className="text-[15px] sm:text-lg">{friendData.friendName}</p>
      </div>
      <div className="my-3 text-start p-3 bg-white text-sm sm:text-[15px] space-y-3">
        <p>About</p>
        <p>Loading About...</p>
      </div>
    </div>
  );
}

export default FriendInfo;
