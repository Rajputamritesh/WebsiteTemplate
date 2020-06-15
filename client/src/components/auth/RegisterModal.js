import React,{Component} from 'react';

import {

    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,ModalBody,CustomInput}from 'reactstrap';

import {connect} from 'react-redux';
import {register} from '../../actions/authActions';
import {clearErrors} from "../../actions/errorActions";
import PropTypes from 'prop-types';
import Alert from "reactstrap/es/Alert";

class RegisterModal extends Component{

    state={
        modal:false,
        name:'',
        email:'',
        password:'',
        EmployerEmail:'',
        message:null,
        flag:false,
        checkbox:false
    };
   static  propTypes={
        isAuthenticated: PropTypes.bool,
        error:PropTypes.object.isRequired,
            register:PropTypes.func.isRequired,

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
    

        if(e.target.name =="checkbox")
        {
            this.setState({
                [e.target.name]:!this.state.checkbox
            });
        
        }else{
            this.setState({
                [e.target.name]:e.target.value
            });
        }
  

    }

    onSubmit=e=>{
        e.preventDefault();
        console.log("hiiiii");

const{name,email,password,EmployerEmail}=this.state;

const newUser={
    name,
    email,
    EmployerEmail,
    password
}
this.props.register(newUser);
this.toggle();
    };

    render(){

        return (
            <div>
          <NavLink onClick={this.toggle} href={"#"}>
              Register
          </NavLink>

                <Modal isOpen={this.state.modal} >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>

                    <ModalBody>
                        {(this.state.message)?<Alert color={"danger"}>{this.state.message}</Alert>:null}
                        <Form onSubmit={this.onSubmit}><FormGroup>
                            <Label for ="name">Name</Label>
                            <Input
                                type="text"
                                name={"name"}
                                id={"name"}
                                placeholder={"Name...."}
                                className={"mb-3"}
                                onChange={this.onChange}
                            />
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

                           <Label for ="password">Add your Employer ?</Label>
                           <CustomInput type="checkbox" name ="checkbox" id="checkbox"  onChange={this.onChange} />

                           <Input
                                type="email"
                                name={"EmployerEmail"}
                                id={"EmployerEmail"}
                                className={"mb-3"}
                                placeholder={"Employer EmailId...."}
                                onChange={this.onChange}
                                disabled={!this.state.checkbox}
                            
                            />

                            <Button color={'dark'} type="submit" style={{marginTop:'2rem'}} block>
                                Register</Button>
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

});

export default connect(mapStateToProps,{register,clearErrors})(RegisterModal);

