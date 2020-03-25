import {GET_MARKERS,POST_MESSAGE,DELETE_ITEM,LOADING_ITEMS} from "../actions/types";
import axios from'axios';
import {tokenConfig} from "./authActions";

// import {tokenConfig} from "./authActions";

export  function markMessage(stateRecv){
    console.log(stateRecv);
    return (dispatch,getState) => {


           return axios.post('/api/map', stateRecv,tokenConfig(getState)).then(res =>{
                dispatch({

                payload: res.data,
                type: POST_MESSAGE


            })
            
            }).catch(err => {
                console.log(err)
            })




    }

};






export const getMarkers=(date)=>(dispatch,getState)=> {//ID is null if nothing is passed in it
    console.log(date);
    let obj=tokenConfig(getState);
    obj.params={date:date}
    console.log(obj);
    return axios.get('/api/map',obj).then(res=>dispatch({
        type:GET_MARKERS,
        payload:res.data
    }))


};





    // return axios.get('/5/index.cfm?event=stream:listings')
    //     .then(( { data } ) => {
    //         dispatch({ type: FETCH_LISTINGS, payload: data });
    //     });

