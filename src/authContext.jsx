import { useState, useEffect} from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
//import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { v4 } from "uuid";
//import {AuthUser} from "./contextStore";



export function storeName () {
  const [name, setName] = useState("");

  return (
    {name, setName}
  )
}
export function distributeData() {
  //const {setAuthImage} = useContext(AuthUser)


  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email,password) => {
     return signInWithEmailAndPassword(auth, email, password);
  }

  function useAuth() {
    const [user, currentUser] = useState();

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        currentUser(user);
      });

      return unsub;
    }, []);

    return user;
  }

  const data = { register, useAuth,signIn };
  return data;
}

{
  /*
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser(user);
  });
}, []);

 setTimeout(() => {
        //navigate("/main");
        alert("Registration Successful");
      }, 2000);
*/
}

{/*
const uploadPics = async (pics) => {
   
    const imgRef = ref(storage,`images/${pics+ v4()}`)
    console.log(pics)
    
    //const reader = new FileReader();
    //const picURL = reader.readAsDataURL(pics)
    await uploadBytes(imgRef, pics)
    .then((res) => {
      console.log(res)
      alert("image uploaded successfully")
      
      
     
    })
    .catch((error) => {
      console.log(error)
      
    })

    await getDownloadURL(imgRef)
    .then((res) => {
      console.log(res)
      //setAuthImage(res)
      alert("image dowloaded successfully")
      
    })
    .catch((error) => {
      console.log(error)
      
    })

  };


*/}
  
