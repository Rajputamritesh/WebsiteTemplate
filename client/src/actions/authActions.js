import{
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCESS
}from'./types';

import axios from 'axios';

import {returnErrors} from "./errorActions";

//get state is the curr state of redux //reducers sets state and soon as it is callled one by one the state changes and the state is reflected in redux store
// getState is simply representing the state of redux store

//check token &load user

export const loadUser=()=>(dispatch,getState)=>{
//User loading

    dispatch({type:USER_LOADING});


    //passing confi opn setting headers which have token and type as we use to set in postman manually
    axios.get('/api/auth/user',tokenConfig(getState))
        .then(res=>dispatch({
            type:USER_LOADED,
            payload:res.data

        })).catch(err=>{//err is basically res a response from backend on hitting the api

            dispatch(
                returnErrors(err.response.data,err.response.status)
            );

        dispatch({
            type:AUTH_ERROR//THIS DISPATH WILL REMOVE TOKEN from state aswell as state and make necessary state of change in authreducer
        });
        });
}

//register user
export const register=({name,email,password,EmployerEmail})=>(dispatch,getState)=>{
   console.log(password)
    var body = JSON.stringify({name,email,password,EmployerEmail});
    const config={
        headers:{
            "Content-type":"application/json"
        }}


axios.post('/api/users',body,config).then(res=>dispatch({
    type:REGISTER_SUCCESS,
    payload:res.data

})).catch(err=>{
    dispatch(returnErrors(err.response.data,err.response.status,REGISTER_FAIL));
    dispatch({type:AUTH_ERROR});
})
};

//login
export const login=({email,password})=>(dispatch,getState)=>{
    console.log(email);
    console.log(password);
    var body = JSON.stringify({email,password});


    axios.post('/api/auth',body,tokenConfig(getState)).then(res=>dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data

    })).catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status,LOGIN_FAIL));
        dispatch({type:LOGIN_FAIL});
    })

};




//logout user
export const logout=()=>(dispatch)=>{
console.log("kskksk");
    dispatch({type:LOGOUT_SUCESS});

}


//set up headers/config nd token
export const tokenConfig =(getState)=>{

    //get token from localstorage;
    // getState is the universal state of redux which uses reducers to take out various properties that are setted in reducers.

    const token =getState().auth. token;//auth is the reducer of authReducer so we get token from authReducer.js

    //Headers

    const config={
        headers:{
            "Content-type":"application/json"
        }

    }
//if token is presemt add to headers


    if(token){
        //setting token
        config.headers['x-auth-token']=token;

    }
    return config;

}
