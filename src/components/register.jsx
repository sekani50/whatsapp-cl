import "../index.css";
import assets from "../assets/svgimages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthUser } from "../contextStore";
import { useState, useContext } from "react";
import { success, failed, warning } from "../reactToast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase";
import img from "../assets/testimage/avatar.jfif";
import { setDoc, doc } from "firebase/firestore";
import { db ,auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

function Register() {
  const { name, setName } = useContext(AuthUser);
  const { data } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setloader] = useState(false);
  const [loading, setloading] = useState(false);
  const { setSaveData, authimage, setAuthImage } = useContext(AuthUser);
  const navigate = useNavigate();
  const [authid, setAuthId] = useState("");

  async function selectPhoto(event) {
    if (event.target.files[0]) {
      //setPhoto(e.target.files[0]);
      //data.uploadPics(event.target.files[0]);
      const imgRef = ref(storage, `images/${event.target.files[0] + v4()}`);

      await uploadBytes(imgRef, event.target.files[0])
        .then((res) => {
          console.log(res);

          success("Image uploaded successfully");
        })
        .catch((error) => {
          console.log(error);
          failed(error.code);
        });

      await getDownloadURL(imgRef)
        .then((res) => {
          console.log(res);
          window.localStorage.removeItem("my-store-image");
          window.localStorage.removeItem("my-store");
          setAuthImage(res);
          success("Image downloaded successfully");
        })
        .catch((error) => {
          console.log(error);
          failed(error.code);
        });
    }
  }

  //////////
  const handleRegister = async () => {
    //e.preventDefault();
    if (authimage == null || authimage == img) {
      warning("No image was selected");
      return;
    }
    setloading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (credentials) => {
          //console.log(credentials.user);
          setAuthId(credentials.user.uid);
          const ref = doc(db, "userinformation", credentials.user.uid);
            
          await setDoc(ref, {
            authname: name,
            authemail: email,
            authimage: authimage,
            
          });
          setSaveData({
            authname: name,
            authemail: email,
            authID: credentials.user.uid,
        
            
          });
          setloader(true);
          success("Registration Successful");
          setTimeout(() => {
            navigate("/main");
            setloader(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);

          failed(error.code);
          setloader(false);
          //setIsError(true)
        });
    } catch (error) {
      console.log(error.code);

      failed(error.code);
    }

    setloading(false);
  };

  function imageUplaodAuth() {
    selectPhoto(event);
    failed();
    success();
  }

  function registrationAuth() {
    success();
    failed();
    handleRegister();
  }

  return (
    <div className="register">
      <div className="reg fixed overflow-y-auto sm:overflow-hidden w-[80%] lg:w-[70%] h-full sm:h-fit sm:shadow-lg border-0  sm:border-2  sm:rounded-md m-auto inset-0">
        <div className="flex flex-col sm:flex-row space-y-3 bg-[#F0F2F5] bg-opacity-10  sm:space-y-0 sm:space-x-3 items-center justify-center">
          <div className=" sm:w-[45%] md:w-[40%] w-full h-full">
            <div className="flex flex-col space-y-3 sm:space-y-4 justify-center items-center p-2 sm:p-3">
              <div className="rounded-full border-2 border-zinc-800 w-[150px] h-[150px]  sm:w-[180px] sm:h-[180px] lg:w-[250px] lg:h-[250px]">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={authimage}
                  alt=""
                />
              </div>
              <label className="label">
                <input
                  type="file"
                  name="file"
                  accept=".jpg, .png, .jpeg"
                  onChange={imageUplaodAuth}
                />
                <span className="text-white text-sm md:text-lg">
                  Select a photo
                </span>
              </label>
            </div>
          </div>

          <div className="sm:w-[55%] md:w-[60%] w-full p-3 sm:p-6 sm:border-l border-gray-400 sm:border-[#F0F2F5] rounded-md sm:hover:border-[#F0F2F5] hover:border-gray-400  border-2 space-y-2 sm:space-y-3">
            <div className=" mx-auto">
              <span
                className="w-[150px]"
                dangerouslySetInnerHTML={{ __html: assets.logo }}
              ></span>
            </div>

            <div className="mx-auto space-y-4">
              <p className="md:text-xl text-lg text-center font-semibold p-4">
                Register
              </p>

              <div className="form-group space-y-3">
                <label
                  className="block form__label font-normal text-sm md:text-lg"
                  htmlFor="name"
                >
                  Create a Username
                </label>
                <input
                  className="block form__input input-field"
                  type="text"
                  placeholder="e.g Umar Chioma Obasa"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="form-group space-y-3">
                <label
                  className="block form__label font-normal text-sm md:text-lg"
                  htmlFor="email"
                >
                  Enter your Email Address
                </label>
                <input
                  className="block form__input input-field"
                  type="email"
                  placeholder="e.g jj@example.com"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group space-y-3">
                <label
                  className="block form__label font-normal text-sm md:text-lg"
                  htmlFor="password"
                >
                  Create a Password
                </label>
                <input
                  className="block form__input input-field"
                  type="password"
                  placeholder="e.g ****"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button
                onClick={registrationAuth}
                disabled={loading}
                className="bg-gray-800 focus:bg-gray-800 focus:text-white sm:bg-[#F0F2F5] hover:bg-gray-800 text-white sm:text-inherit border hover:border-0 rounded-sm sm:rounded-md hover:text-white font-semibold flex justify-center items-center space-x-2 py-2 sm:py-3 w-full"
              >
                <span>Register</span>
                {loader && (
                  <span className="animate-spin h-4 w-4 rounded-full border-4 border-l-white border-b-white border-t-gray-400 border-r-gray-400 ml-2"></span>
                )}
              </button>
            </div>

            <div className="hidden space-x-2 justify-center items-center">
              <span
                className=""
                dangerouslySetInnerHTML={{ __html: assets.padlock }}
              ></span>
              <p className="text-sm">End-to-end encryption</p>
            </div>
            <div className="flex justify-center items-center">
              <Link to="/">
                <button className="outline-none border-0 bg-[#F0F2F5] text-[16px]">
                  Already have an account?
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/*<div dangerouslySetInnerHTML={{__html:assets.laptop}}> 
      <div className="bg-zinc-700 absolute bottom-0 left-0 h-3 w-full"></div>
      */}
    </div>
  );
}

export default Register;
