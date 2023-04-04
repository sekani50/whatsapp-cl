import "../../index.css";
import assets from "../../assets/svgimages";
//import img from "../../assets/testimage/pic.png";
import { AuthUser } from "../../contextStore";
import { useContext } from "react";


function Userinfo({toggleIsVisible}) {
    const {authimage, saveDatas}  = useContext(AuthUser);


    return (
        <div className="userinfo bg-[#F0F2F5] h-full w-full flex flex-col space-y-3">
            <div className="flex justify-start items-end bg-[#008069] py-2 px-4 text-white font-semibold text-lg sm:text-xl w-full h-24 sm:h-32">
                <div className="flex min-w-max items-center space-x-4">
                
                    <button className="bg-inherit"
                    onClick={toggleIsVisible}
                    >
                        <span dangerouslySetInnerHTML={{__html:assets.profileArrow}}></span>
                    </button>
                    <p>Profile</p>
                </div>

            </div>

            <div className="w-full p-4 h-2/5 flex items-center justify-center">

                <div className="sm:w-[300px] sm:h-[300px] w-[200px] h-[200px]  rounded-full ">
                    <img className="object-cover w-full h-full rounded-full" src={authimage} alt="profile"/>
                </div>

            </div>

            <div className="bg-white w-full p-3 text-start sm:p-6 space-y-2 sm:space-y-4">
                <p className="text-[#008069] sm:text-sm text-[13px]">Your Username</p>
                <p className="text-[15px] sm:text-lg">{saveDatas.authname}</p>
                <p className="text-[#008069] sm:text-sm text-[13px]">Your Email</p>
                <p className="text-[15px] sm:text-lg">{saveDatas.authemail}</p>
            </div>

        </div>


    )
}


export default Userinfo