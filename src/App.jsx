import React, { useState, useEffect } from "react";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext, AuthUser,FriendChats } from "./contextStore";
import { distributeData } from "./authContext";
import img from "./assets/testimage/avatar.jfif";

const getimage = () => {
  const storedImage = JSON.parse(window.localStorage.getItem("my-store-image"));

  if (storedImage == null) {
    return img;
  } else {
    return storedImage;
  }
};

const getAuthNameAndEmail = () => {
  const storedData = window.localStorage.getItem("my-store");

  if (storedData == null) {
    return {
      authname: "",
      authemail: "",
      authID:"",
      chatRoom:[],
    };
  } else {
    return JSON.parse(storedData);
  }
};

const getFriendInfo = () => {
  const stored = window.localStorage.getItem("my-friend-store");

  if (stored == null) {
    return {
      friendPics: "",
      friendName: "",
      
    };
  } else {
    return JSON.parse(stored);
  }
};


const getRoomKey = () => {
  const storekey = window.localStorage.getItem("my-room-key");

  if (storekey == null) {
    return ""
  } else {
    return JSON.parse(storekey);
  }
};


function App() {
  const [name, setName] = useState("");
  const data = distributeData();
  const [authimage, setAuthImage] = useState(getimage);
  const [saveDatas, setSaveData] = useState(getAuthNameAndEmail);
  const [friendData, setFriendData] = useState(getFriendInfo)
  const [chats, setChat] = useState([])
  const [isMobileChat, setIsMobileChat] = useState(false);
  const [rooms, setRoom] = useState(getRoomKey)
  const [isChat, setIsChat] = useState(false)
  

  useEffect(() => {
    window.localStorage.setItem("my-friend-store", JSON.stringify(friendData));
  }, [friendData]);
 
  useEffect(() => {
    window.localStorage.setItem("my-store-image", JSON.stringify(authimage));
  }, [authimage]);

  useEffect(() => {
    window.localStorage.setItem("my-store", JSON.stringify(saveDatas));
  }, [saveDatas]);

  useEffect(() => {
    window.localStorage.setItem("my-room-key", JSON.stringify(rooms));
  }, [rooms]);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthUser.Provider
          value={{ saveDatas, setSaveData, authimage, setAuthImage,name, setName }}
        >
          
            <FriendChats.Provider value={{rooms,isChat, setIsChat, setRoom, chats, setChat,friendData, setFriendData,isMobileChat, setIsMobileChat}}>
            <AuthContext.Provider value={data}>
            <Routes>
              <Route exact path="/" index element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/main" element={<Home />} />
            </Routes>
            </AuthContext.Provider>
            </FriendChats.Provider>
         
        </AuthUser.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
