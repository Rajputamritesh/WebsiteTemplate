import {SEARCH_LOADING} from './types';
import axios from "axios";


export const getSearchSuggestions=(text)=>(dispatch)=> {//ID is null if nothing is passed in it
console.log(text);
let keyword={
    "key":text
}
    axios.post('/api/searchSuggestions',keyword).then(res=>console.log(res.data)).catch(error => {
        console.log(error.response)
    });

    //     dispatch({
    //     type:SEARCH_LOADING,
    //     payload:res.data
    // }))
};
