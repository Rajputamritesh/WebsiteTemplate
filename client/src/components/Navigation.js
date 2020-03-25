import React,{Component} from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container

} from 'reactstrap';
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/Login";
import "../../src/stylesheet.css";
import {LinkContainer} from "react-router-bootstrap"
import {connect} from "react-redux";
import '../reducers/index';
import {addItem, deleteItem, fetchList} from "../actions/action";
class Navigation extends  Component{
   state={
       isOpen:false,
       flag:false
   }

   toggle=()=>{
       this.setState({
           isOpen:!this.state.isOpen
       })
   }
    AccessControl=()=>(getState)=>{
      if(getState().auth.isAuthenticated){
          this.setState({flag:true})
      }else{this.state.flag=false}
    }

componentDidUpdate(prevProps, prevState, snapshot) {
       this.AccessControl();
}

    render() {



       return(
               <Navbar color={"dark"} dark expand={"sm"} className={"mb-5"}>
                <Container>
                   {/*<NavbarBrand href={"/"}>*/}
                   {/*Guest Management*/}
                   {/*</NavbarBrand>*/}
                    <LinkContainer className={"colo m-2"} to="/">
                        <NavItem className={"nav"}>MarkLife Application</NavItem>
                    </LinkContainer>
                   <NavbarToggler onClick={this.toggle}/>
                   <Collapse isOpen={this.state.isOpen} navbar>
                   <Nav className={"ml-auto"} navbar>

                       {(!this.props.auth.isAuthenticated)?
                   <NavItem>
                       <RegisterModal/>
                   </NavItem>
                           :""}
                       {(this.props.auth.isAuthenticated)?

                           <LinkContainer className={"colo m-2"} to="/chat">
                               <NavItem className={"nav"}>Chat</NavItem>
                           </LinkContainer>:""
                       }

                       {(this.props.auth.isAuthenticated)?

                           <LinkContainer  className={"colo m-2"}  to="/map">
                               <NavItem className={"colo"} style={{color:"white"}}>Map</NavItem>
                           </LinkContainer>


                           :""

                       }

                       {/*<LinkContainer  className={"colo m-2"}  to="/map">*/}
                       {/*    <NavItem className={"colo"} style={{color:"white"}}>Map</NavItem>*/}
                       {/*</LinkContainer>*/}

                       {(this.props.auth.isAuthenticated)?
                       <NavItem>
                           <Logout/>
                       </NavItem>:""}


                       {(!this.props.auth.isAuthenticated)?

                       <NavItem>
                           <LoginModal/>
                       </NavItem>:""}
                   </Nav>
                   </Collapse>


                </Container>

               </Navbar>


       );
   }


}


const mapStateToProps=(state)=>({

    auth:state.auth,




});
export default  connect(mapStateToProps,{})(Navigation);

