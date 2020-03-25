import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,LOADING_ITEMS} from "../actions/types";


const initialState=
    {

    items:[]
    }

export default function(state=initialState,action){

        switch(action.type){

            case GET_ITEMS:
                return{
                    ...state,
                    items:action.payload,
                    loading:false
                }
            case ADD_ITEM:
                var item = action.payload

            return {

                ...state,
                items:[item,...state.items]
        }

            case DELETE_ITEM:
                console.log(action.payload.id)
                return {
                    ...state,
                    items:state.items.filter(item=>item._id!==action.payload.id)

                }
            case LOADING_ITEMS:
                return {
                    ...state,
                    loading:true
                }
            default: return state

        }


}
