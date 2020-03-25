import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input,Button,Container } from 'reactstrap';
import "../../stylesheet.css";
import io from "socket.io-client";
import {Avatar, Comment, Form, Tooltip} from "antd";
import {connect} from "react-redux";
import authReducer from "../../reducers/authReducer";
import '../../reducers/index';
import ChatCard from "./ChatCard";
import {getChats} from "../../actions/chatActions";
import {Map, Marker, Popup} from "react-leaflet";
import moment from "moment";
import './chatModule.css';
import ScrollToBottom from 'react-scroll-to-bottom'
class Chat extends Component {
    state={
        chatMessage:"",
        newArray:[]
    }
componentDidMount() {
        let server='localhost:8080';
        this.socket=io(server);

        this.socket.on("Output Chat Message",messagefromBackend=>{
            console.log(messagefromBackend[0]._id);

            this.props.getChats();
        })

        this.props.getChats();
        // console.log(this.props.chats.chats);
        //
        // console.log(this.props.auth) ;
    }
handleSearchChange=(e)=>{
        this.setState({
            chatMessage:e.target.value
        })
}
    submitChatMessage=(e)=>{
        e.preventDefault();
console.log(this.props.auth.user)
      var d=Date(Date.now());

      var nowTime=d.toString();
        console.log(nowTime)
        var obj={
            userDetails:this.props.auth.user,
            nowTime:nowTime,
            type:"Text",
            chatMessage: this.state.chatMessage
        }

        this.socket.emit("Input Chat Message",obj);
        this.setState({chatMessage:""});

    }
    //
    // renderCards=(arr,newArr)=>(
    //     // this.props.chats.chats.map((chat)=>(
    //     //     <ChatCard />
    //     // ))
    //     <div>
    //         {console.log(newArr)
    //
    //     this.setState({
    //         newArray:newArr
    //     })}
    //     </div>
    //         )
    render(){
            console.log(this.props.chats.chats);
            let arr=[];let newArr=arr.concat(this.props.chats.chats)

            return (
        <React.Fragment>
            <div className={""}>

            <div className={"infoBar"}>   <label>Real time chatting..</label>   </div>
            <div className={"outerContainerChat"} >

                <div className={"containerChat"}>
                    <ScrollToBottom className={"messages"}>
                        {
                            ( this.props.chats.chats )?
                                this.props.chats.chats.map((chat)=>(
                                    <div style={{ width:'100%'}}>

                                        {


                                            (chat.sender._id!=null&&this.props.auth.user._id==chat.sender._id)?
                                        <div className={"messageContainer justifyEnd"}>
                                            <div className={"messageBox backgroundBlue"}>
                                            <p className={"messageText colorWhite"}>{chat.message}</p>
                                            </div>
                                            <p className={"sentText pr-10"}>you</p>
                                            </div>:<div className={"messageContainer justifyStart"}>
                                                <div className={"messageBox backgroundLight"}>
                                                    <p className={"messageText colorDark"}>{chat.message}</p>
                                                </div>
                                                <p className={"sentText pr-10"}>{chat.sender.name}</p>
                                            </div>

                                        }




                                    </div>
                                )):""
                        }
                    </ScrollToBottom>








                <Form  className={"form"} onSubmit={this.submitChatMessage}>
                    <InputGroup className='wrapper'  >

                        <Input className={"input"}
                            value={this.state.chatMessage}
                            onChange={this.handleSearchChange}
                            placeholder="Chat..." type='text' name='search'  />
                        <Button  onClick={this.submitChatMessage} className={"sendButton"} >Enter</Button>
                    </InputGroup>

                </Form>
            </div>
            </div>

            </div>
        </React.Fragment>
    );
};
}




const mapStateToProps=(state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    auth:state.auth,
    chats:state.chatein,


});

export default connect(mapStateToProps,{getChats})(Chat);


