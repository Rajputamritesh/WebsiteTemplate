import {combineReducers} from "redux";
import itemReducer from './itemReducer.js';
import errorReducer from'./errorReducer';
import authReducer from'./authReducer';
import chatReducer from './chatReducer';
import searchReducer from "./searchReducer";
import mapReducers from "./mapReducers";

export default combineReducers({

    item:itemReducer,
    error:errorReducer,
    auth:authReducer,
    chatein:chatReducer,
    search:searchReducer,
    markers:mapReducers



});
