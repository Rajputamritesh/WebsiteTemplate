
import React  from 'react';
import {applyMiddleware, createStore,compose} from "redux";
import thunk from 'redux-thunk';
import  rootReducer from './reducers';
const initialState={};
const middleware=[thunk];

const Store=createStore(
    rootReducer,
    initialState,
compose(  applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)

);
export default Store;
