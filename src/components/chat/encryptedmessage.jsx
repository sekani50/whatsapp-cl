import "../../index.css";
import { FriendChats,AuthUser } from "../../contextStore";
import { useRef, useEffect,useContext } from "react";
import assets from "../../assets/svgimages";



function EncryptedMessage() {
    const {chats}= useContext(FriendChats)
    const { saveDatas } = useContext(AuthUser);
    const chatRef = useRef();

  
 //console.log(chats)
 const uniqueChats = [...new Map(chats.map((m) => [m.id, m])).values()];
 uniqueChats.sort(function(a,b) {
  return a.createdAt - b.createdAt
 })

 useEffect(() => {
  chatRef.current.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  });
}, [chatRef, uniqueChats.length]);

 //console.log(uniqueChats)
    return (
      
      
        <div
        ref={chatRef}
        className="encryptedmessage h-full w-full">

          
            {uniqueChats.map((content)=>{
             

              if(content.user === saveDatas.authemail) {
                  return (
                <div
                key={content.id}
                className="flex justify-end items-center text-[#d9fdd3] text-sm sm:text-[16px] py-3">
                <div className="bg-[#d9fdd3] relative w-fit rounded-lg">
                  <div className="absolute -right-[15px] -top-[5px]">
                    <span
                      dangerouslySetInnerHTML={{ __html: assets.triangleB }}
                    ></span>
                  </div>
                  <div className="bg- rounded-lg p-2  h-fit space-y-2 sm:space-y-4">
                      <div className="text-black text-justify bg- rounded-lg p-2 w-fit h-fit">
                        {content.text}
                      </div>
                      <p className="text-end text-[11px] sm:text-[13px] text-gray-600">{content.date}</p>
                      </div>
                </div>
              </div>
                  )
              }

              else {
                return (
                  
                    <div 
                    key={content.id}
                    className="flex justify-start items-center text-white py-3 text-sm sm:text-[16px] " >
                   
                    <div className="bg-none relative w-fit">
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
                )}
            })}
         
        </div>

    )
}

export default EncryptedMessage