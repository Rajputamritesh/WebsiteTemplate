import React,{Component} from 'react';

import {

    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,ModalBody}from 'reactstrap';

import {connect} from 'react-redux';

import {clearErrors} from "../../actions/errorActions";
import PropTypes from 'prop-types';
import Alert from "reactstrap/es/Alert";
import {login} from "../../actions/authActions";

class LoginModal extends Component{

    state={
        modal:false,
        name:'',
        email:'',
        password:'',
        message:null,
        flag:false
    };
    static  propTypes={
        isAuthenticated: PropTypes.bool,
        error:PropTypes.object.isRequired,
        login:PropTypes.func.isRequired



    };
    //below function works when  there is any change in state
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {error}=this.props;
        if(error!==prevProps.error){
            this.setState({
                message:error.msg.msg
            })
        }
        else{this.state.message=null}

        //  if(this.state.modal){
        //      if(this.state.flag!==true){
        //          if(this.props.isAuthenticated)
        //          {
        //              this.setState({
        //                  flag:true
        //              })
        //              this.toggle();
        //          }
        //      }
        //
        // }
    }

    toggle=()=>{
        this.props.clearErrors();
        console.log(this.state.modal);
        this.setState({
            modal:!this.state.modal

        } ,function () {
            console.log(this.state.modal);
        });

    };

    onChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        });

    }

    onSubmit=e=>{
        e.preventDefault();
        console.log("login");

        const{email,password}=this.state;
        const exsistingUser={
            email,
            password
        }
        this.props.login(exsistingUser);
        this.toggle();
    };

    render(){

        return (
            <div>
                <NavLink onClick={this.toggle} href={"#"}>
                    Login
                </NavLink>


                <Modal isOpen={this.state.modal} >
                    <ModalHeader toggle={this.toggle}>LOGIN</ModalHeader>

                    <ModalBody>
                        {(this.state.message)?<Alert color={"danger"}>{this.state.message}</Alert>:null}
                        <Form onSubmit={this.onSubmit}><FormGroup>

                            <Label for ="email">Email</Label>
                            <Input
                                type="email"
                                name={"email"}
                                id={"email"}
                                className={"mb-3"}
                                placeholder={"Email...."}
                                onChange={this.onChange}
                            />
                            <Label for ="password">Password</Label>
                            <Input
                                type="password"
                                name={"password"}
                                id={"password"}
                                className={"mb-3"}
                                placeholder={"password...."}
                                onChange={this.onChange}
                            />
                            <Button color={'dark'} type="submit" style={{marginTop:'2rem'}} block>
                                Login</Button>
                        </FormGroup></Form>

                    </ModalBody>
                </Modal>

            </div>

        )

    }


};
const mapStateToProps=state=>({
    isAuthenticated: state.auth.isAuthenticated,
    error:state.error,
    item:state.item
});

export default connect(mapStateToProps,{login,clearErrors})(LoginModal);

