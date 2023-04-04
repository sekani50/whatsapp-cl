import React from "react";
import { Detector } from "react-detect-offline";
import assets from "../assets/svgimages";

function CheckConnection(props) {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div className="relative group">
              <div className=" p-1 rounded-full bg-red-500 text-black">
                <span
                  dangerouslySetInnerHTML={{ __html: assets.notConnected }}
                ></span>
              </div>
              <span className="absolute min-w-max text-sm hidden group-hover:block right-7 -bottom-7 bg-white border-black border p-1">
                Not Connected
              </span>
            </div>
          )
        }
      />
    </>
  );
}

export default CheckConnection;
