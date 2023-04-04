import "../index.css";
import assets from "../assets/svgimages";
import { Link, useNavigate  } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext, AuthUser  } from "../contextStore";
import { success, failed } from "../reactToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInWithEmailAndPassword
} from "firebase/auth";
import { db,auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";


function Login() {
  const [loading, setLoading] = useState(false);
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const navigate = useNavigate();
  const data = useContext(AuthContext);
  const {  setSaveData,setAuthImage } = useContext(AuthUser);
  
  



  const handleLogin = async () => {
    //e.preventDefault()

    try {
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(async (credentials)=>{
        //console.log(res)

        const docRef = doc(db, "userinformation",credentials.user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          
          
          setSaveData({
            authname: docSnap.data().authname,
            authemail:docSnap.data().authemail,
            
            authID: credentials.user.uid,
            
            })
            setAuthImage(docSnap.data().authimage)

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        
      setLoading(true);
      success("Successfully logged in");
      setTimeout(() => {
        navigate("/main");
      }, 3000);

      }).catch((error)=> {
        failed(error.code)
      })

   
     

      
    } catch (error) {
      console.log(error.code);
      
      
    }

  }

  function validateLogin() {
    success()
    failed()
    handleLogin()
  }
  {/*

    
 */}

  return (
    <div className="home">
      <div className="absolute sm:w-[400px] border-2 hover:border-gray-400 sm:rounded-md p-6 h-fit m-auto inset-0 space-y-6 ">
        <div className="mx-auto">
          <span
            className="w-[150px]"
            dangerouslySetInnerHTML={{ __html: assets.logo }}
          ></span>
        </div>
        <div className="mx-auto space-y-5">
          <p className="sm:text-xl text-lg text-center font-semibold p-4">
            Log In {data.useAuth()?.email}
          </p>
          
          <div className="form-group space-y-3">
            <label
              className="block form__label font-normal text-sm sm:text-lg"
              htmlFor="email"
            >
              Enter your Email Address
            </label>
            <input
              className="block form__input input-field"
              type="email"
              placeholder="e.g jj@example.com"
              name="email"
              onChange={(event) => getEmail(event.target.value)}
            />
          </div>
          <div className="form-group space-y-3">
            <label
              className="block form__label font-normal text-sm sm:text-lg"
              htmlFor="password"
            >
              Enter Your Password
            </label>
            <input
              className="block form__input input-field"
              type="password"
              placeholder="e.g ****"
              name="password"
              onChange={(event) => getPassword(event.target.value)}
             
            />
          </div>

          <button onClick={validateLogin} className="bg-gray-800 focus:bg-gray-800 focus:text-white flex justify-center items-center space-x-2 sm:bg-[#F0F2F5] hover:bg-gray-800 text-white sm:text-inherit border hover:border-0 rounded-sm sm:rounded-md hover:text-white font-semibold mx-auto py-2 sm:py-3 w-full">
          <span>Log In</span>
            {loading && (
              <span className="animate-spin h-4 w-4 rounded-full border-4 border-l-white border-b-white border-t-gray-400 border-r-gray-400 ml-2"></span>
            )}
          </button>
        </div>
        <div className="flex space-x-2 justify-center items-center">
          <span
            className=""
            dangerouslySetInnerHTML={{ __html: assets.padlock }}
          ></span>
          <p className="text-sm">End-to-end encryption</p>
        </div>
        <div className="flex justify-center items-center">
          <Link to="/register">
            <button
              
              className="outline-none border-0 bg-[#F0F2F5] text-[16px]"
            >
              Create an account
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer/>
      {/*<div dangerouslySetInnerHTML={{__html:assets.laptop}}> */}
    </div>
  );
}

export default Login;
