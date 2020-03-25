import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input,Button,Container } from 'reactstrap';
import "../../stylesheet.css";

import {Form} from "antd";
import {connect} from "react-redux";

import '../../reducers/index';

import {getSearchSuggestions} from "../../actions/searchActions";

class Search extends Component {
    state={
        searchText:"",
        newArray:[]
    }
componentDidMount() {
        // let server='localhost:5000';
        // this.socket=io(server);
        //
        // this.socket.on("Output Search Message",messagefromBackend=>{
        //     console.log(messagefromBackend[0]._id);
        // })
        // console.log(this.props.chats.chats);
        //
        // console.log(this.props.auth) ;
    }
handleSearchChange=(e)=>{
        this.setState({
            searchText:e.target.value
        });
        var input=e.target.value;
        console.log(input);
    this.props.getSearchSuggestions(input);

}

submitSearch=(e)=>{
        //
}


    // renderCards=()=>{
    //     //         // this.props.chats.chats.map((chat)=>(
    //     //         //     <ChatCard />
    //     //         // ))
    //     var arr=[];
    //     var newArray=arr.concat(this.props.chats.chats);
    //     console.log(newArray);
    //
    //     this.setState({
    //         newArray:newArray
    //     }) }
    render(){

    return (
        <React.Fragment>
            <label>SearchBox..</label>
            <Form onSubmit={this.submitSearch}>
            <InputGroup className='wrapper'>

                <Input
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                    placeholder="search..." type='text' name='search'  />
                <Button onClick={this.submitSearch} className={"x"} color="secondary">search</Button>
            </InputGroup>

            </Form>
        </React.Fragment>
    );
};
}




const mapStateToProps=(state)=>({
    // isAuthenticated: state.auth.isAuthenticated,
    // auth:state.auth,
    // chats:state.chatein
    search:state.search
});

export default connect(mapStateToProps,{getSearchSuggestions})(Search);


