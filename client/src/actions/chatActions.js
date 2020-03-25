import {CHAT_LOADED} from './types';
import axios from "axios";


export const getChats=()=>(dispatch)=> {//ID is null if nothing is passed in it

    axios.get('/api/chats').then(res=>dispatch({
            type:CHAT_LOADED,
            payload:res.data
        }))


};
