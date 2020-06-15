import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,LOADING_ITEMS} from "../actions/types";
import axios from'axios';
import {tokenConfig} from "./authActions";

export const fetchList=(date,id)=>(dispatch,getState)=>{
console.log(id);
   dispatch(loadingItems());
   let obj=tokenConfig(getState);
   obj.params={date:date,id:id}
   //this is how you end auth token and another parameter to nodes js as quetry parameter
    //obj.params is mandatory

   axios.get('/api/items',obj).then(res=>
       dispatch({
       type:GET_ITEMS,
       payload:res.data
   })).catch(err=>{console.log(err)});

};
export const addItem=(name,id)=>(dispatch,getState)=>{

    console.log(name);
    console.log(id);
    axios.post('/api/items',{name,id},tokenConfig(getState)).then(res=>dispatch({
        payload:res.data,
        type:ADD_ITEM


    })).catch(err=>{console.log(err)})

}
export const deleteItem=(id)=>(dispatch,getState)=>{//getState is the universal state
console.log(id)
    axios.delete(`/api/items/${id}`,tokenConfig(getState)).then(dispatch({
        payload:{id},
        type:DELETE_ITEM
    }))
    // console.log(id)
    // return {
    //     payload:{uuid},
    //     type:DELETE_ITEM}
}
export const loadingItems=()=>{
    console.log("loading")
    return {type:LOADING_ITEMS
    }
}