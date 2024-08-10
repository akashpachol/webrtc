import { useEffect } from "react";
import socketConnection from "../webrtcUtilities/socketConnection";
import clientSocketListeners from "../webrtcUtilities/clientSocketListeners";
import { useState } from "react";
import createPeerConnection from "../webrtcUtilities/createPeerConn";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nameAdd } from "../redux/viedoSlice";
import { useWebRTC } from "../redux/context"; 

const Home = () => {
  const [typeOfCall, setTypeOfCall] = useState();
  const [joined, setJoined] = useState(false);
  const [availableCalls, setAvailableCalls] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.video); 
  const { peerConnection, setPeerConnection, remoteStream, setRemoteStream, localStream, setLocalStream ,callStatus,updateCallStatus,setOfferData} = useWebRTC();
  const initCall = async (typeOfCall) => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
setLocalStream(stream)
    setTypeOfCall(typeOfCall); 
  };
  useEffect(() => {
    if (joined) {
      const userName = prompt("Enter username");
      dispatch(nameAdd({ data: userName }));
      const socket = socketConnection(userName);
      socket.on("availableOffers", (data) => {
        console.log(data, 'ghjfghfjh');
        setAvailableCalls(data);    
      });
    }
  }, [joined]);
  useEffect(() => {
    if ( localStream && !peerConnection) {
      const { peerConnection, remoteStream } = createPeerConnection(videoData.userName,typeOfCall,localStream
      );
      setPeerConnection(peerConnection);
      setRemoteStream(remoteStream);
      console.log("peerConnection",typeOfCall);
      
    }
  }, [localStream]);
  console.log(remoteStream,'remoteStream');
  
  useEffect(() => {
    if (typeOfCall && peerConnection) {
      const socket = socketConnection(videoData.userName);
      clientSocketListeners(socket,typeOfCall,callStatus,updateCallStatus,peerConnection);
      console.log("clientSocketListeners",typeOfCall);

    }
  }, [typeOfCall, peerConnection]);
  console.log(callStatus,'home');
  useEffect(() => {
    if (remoteStream && peerConnection) navigate(`/${typeOfCall}`)
  }, [remoteStream, peerConnection]);

  const call = async () => {
    initCall("offer");
  };

  const answer = (callData) => {
    initCall("answer");
    setOfferData(callData);
  };

console.log(availableCalls,'gfhgjkhgjk');
  return (
    <>
      {joined ? (
        <div className="container">
          <div className="row">
            <h1>{videoData.userName}</h1>
            <div className="col-6">
              <h2>Make a call</h2>
              <button onClick={call} className="btn btn-success btn-lg hang-up">Start Call</button>
            </div>
            <div className="col-6">
              <h2>Available Calls</h2>
              {availableCalls.map((callData, i) => (
                <div className="col mb-2" key={i}>
                  <button onClick={() => { answer(callData) }}className="btn btn-lg btn-warning hang-up">Answer Call From {callData.offererUserName}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
          <button onClick={() => setJoined(true)} className="btn btn-primary btn-lg">Join</button>
        </div>
      )}
    </>
  );
}
export default Home;
