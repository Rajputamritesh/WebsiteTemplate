import {POST_MESSAGE,GET_MARKERS} from "../actions/types";


const initialState=
    {

        statusCode:'',
        respMessage:'',
        markersInfo:''

    }

export default function(state=initialState,action){

    switch(action.type){

        case POST_MESSAGE:
            console.log(action.payload.status);
            return{
                ...state,
                statusCode:action.payload.status,
                respMessage:action.payload.message
            }
        case GET_MARKERS:
            console.log(action.payload);
            return{
                ...state,
               markersInfo:action.payload
            }

        default: return state;

    }


}
