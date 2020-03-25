import{


    SEARCH_LOADING,

} from '../actions/types'


const initialState={
    searchSuggestions:""
};
export default function(state=initialState,action){
    switch(action.type){
        case SEARCH_LOADING:
            return{
                ...state,
                searchSuggestions:action.payload

            };
        default:
            return state;
    }

}
