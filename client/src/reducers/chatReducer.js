import{


    CHAT_LOADED,

} from '../actions/types'


const initialState={
  chats:""
};
export default function(state=initialState,action){
    switch(action.type){
        case CHAT_LOADED:
            return{
                ...state,
                chats:action.payload

            };
        default:
            return state;
    }

}
