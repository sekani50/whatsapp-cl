import "../../index.css";
import { FriendChats, AuthUser } from "../../contextStore";
import {useContext } from "react";

import {
  doc,
  updateDoc,
  collection,
  query,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

function SearchFriends({ setSearching, searching, friends }) {
  const { setFriendData, setRoom, setChat } = useContext(FriendChats);
  const { saveDatas } = useContext(AuthUser);


  return (
    <div className="searchfriends">
      {!searching && (
        <div className="pt-12 pl-6  w-full text-zinc-600">
          <p className="text-center">Search for a friend....</p>
        </div>
      )}
      {searching &&
        friends.map((content) => {
          return (
            <div
              onClick={async () => {
               setRoom(content.authemail)
                const chatArray = [];
                const queryRef = query(
                  collection(db, "messages"),
                  where(
                    "room", "==",`${saveDatas.authemail}+${content.authemail}`
                  )
                );
                const queryRefAgain = query(
                  collection(db, "messages"),
                  where(
                    "room", "==",`${content.authemail}+${saveDatas.authemail}`
                  )
                );
                const querySnapshot = await getDocs(queryRef);
                querySnapshot.forEach((doc) => {
                  chatArray.push({ ...doc.data(), id: doc.id });
                });
                const querySnapshotAgain = await getDocs( queryRefAgain );
                querySnapshotAgain.forEach((doc) => {
                  chatArray.push({ ...doc.data(), id: doc.id });
                });
                setChat(chatArray);

                setFriendData({
                  friendPics: content.authimage,
                  friendName: content.authname,
                  
                });
                setSearching(!searching);
              }}
              className=" group cursor-pointer "
              key={content.id}
            >
              <div className="border-b px-4 group-hover:bg-[#F0F2F5] items-center py-3 sm:py-3">
                <div className="flex flex-col items-start">
                  <div className="space-y-2 sm:space-y-3 text-black">
                    <p className="truncate text-sm sm:text-[15px]">
                      {content.authname}
                    </p>
                    <p className="truncate text-zinc-600 text-sm sm:text-[15px]">
                      {content.authemail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SearchFriends;
