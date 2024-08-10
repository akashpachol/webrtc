import socketConnection from "./socketConnection";



let peerConfiguration = {
    iceServers:[
        {
            urls:[
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302'
            ]
        }
    ]
}
const createPeerConnection = (userName,typeOfCall,localStream)=>{
    //token for example
    const token = 123
    //init socket connection
    const socket = socketConnection(token) 
    try{
        const peerConnection = new RTCPeerConnection(peerConfiguration);
      
        const remoteStream = new MediaStream();
localStream.getTracks().forEach(track=>{
    peerConnection.addTrack(track,localStream)
})




    peerConnection.addEventListener('icecandidate',e=>{
        console.log("Found and ice candidate!")
        console.log("Found and ice candidate!",e.candidate,1)

        if(e.candidate){
            // emit the new ice cand. to the signaling server
            console.log('hello');
            
            socket.emit('sendIceCandidateToSignalingServer',{
                iceCandidate: e.candidate,
                iceUserName: userName,
                didIOffer: typeOfCall === "offer",
            })
        }
    })

    peerConnection.addEventListener('track',e=>{
        console.log('track');
        
        e.streams[0].getTracks().forEach(track=>{
            remoteStream.addTrack(track,remoteStream)
            console.log("This should add some video/audio to the remote feed...")
        })
    })



        return({
            peerConnection,
            remoteStream,
        })
    }catch(err){
        console.log(err)
    }
}

export default createPeerConnection
