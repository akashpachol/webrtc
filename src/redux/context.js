import React, { createContext, useContext, useState, useEffect } from "react";

const WebRTCContext = createContext();

export const WebRTCProvider = ({ children }) => {
  const [peerConnection, setPeerConnection] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [ callStatus, updateCallStatus ] = useState({})

  const [ offerData, setOfferData ] = useState(null)

  // useEffect(() => {
  //   const pc = new RTCPeerConnection(peerConfiguration);
  //   setPeerConnection(pc);

  //   return () => {
  //     pc.close();
  //   };
  // }, []);

  return (
    <WebRTCContext.Provider value={{ peerConnection, setPeerConnection, remoteStream, setRemoteStream, localStream, setLocalStream,callStatus, updateCallStatus,offerData, setOfferData   }}>
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTC = () => useContext(WebRTCContext);
