import React,{Component} from 'react';
import {connect} from "react-redux";
import {register} from "../../actions/authActions";
import {clearErrors} from "../../actions/errorActions";
import {logout} from "../../actions/authActions";
import {NavLink} from "reactstrap";

class Logout extends Component{

   loggingOut=()=>{

        this.props.logout();
    }
    render() {
        return(  <NavLink onClick={this.loggingOut} href={"/"}>
         Logout
        </NavLink>)

    }


}
const mapStateToProps=state=>({
    isAuthenticated: state.auth.isAuthenticated,
    error:state.error,

});

export default connect(mapStateToProps,{logout})(Logout);
