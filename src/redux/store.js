import { configureStore, combineReducers } from '@reduxjs/toolkit';
import viedoSlice from './viedoSlice';  

const rootReducer = combineReducers({
    video: viedoSlice,  
});

export const store = configureStore({
    reducer: rootReducer,
});
