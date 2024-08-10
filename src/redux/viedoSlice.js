import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callStatus: {},
  localStream:null,
  remoteStream: null,
  peerConnection:null,
  userName: "",
  offerData:null,
};

const viedoSlice = createSlice({
  name: "viedo",
  initialState,
  reducers: {
    nameAdd: (state, action) => {
        state.userName = action.payload.data;    },
   
  },
});

export const { nameAdd } = viedoSlice.actions;
export default viedoSlice.reducer;