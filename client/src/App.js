import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ShoppingList from './components/ShoppingList';
import Navigation from "./components/Navigation";
import {Provider} from 'react-redux';
import store from "./store";
import {loadUser} from "./actions/authActions";
import Navbar from "reactstrap/es/Navbar";
import {Route} from "react-router";
import{BrowserRouter as Router } from "react-router-dom"
import Index from "./components/Main";
import chat from "./components/ChatModule/chat";
import search from "./components/SearchBox/search";
import map from "./components/Map/map";
class App extends Component {
componentDidMount() {
  store.dispatch(loadUser());
}

  render(){

    return (
        <Provider store={store}>
          {/*<div className="App">*/}
          {/*  <Navigation/>*/}
          {/*  <ShoppingList/>*/}
          {/*</div>*/}
          <Router >
            <div className={"App"}>
                <Navigation/>
        <Route exact path={"/"} component={(Index)}/>
                <Route exact path={"/chat"} component={(chat)}/>
                <Route exact path={"/search"} component={(search)}/>
                <Route exact path={"/map"} component={(map)}/>
            </div>
            </Router>

        </Provider>
    );


  }


}

export default App;
