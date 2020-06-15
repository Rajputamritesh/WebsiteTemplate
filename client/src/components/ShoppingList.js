import {CSSTransition,TransitionGroup} from "react-transition-group";

import React,{Component} from 'react';
import{Container,ListGroup,ListGroupItem,Button
,Input
} from 'reactstrap';
import {connect} from "react-redux";
import {fetchList} from '../actions/action';
import {addItem,deleteItem} from "../actions/action";
import '../reducers/index';
import MaterialUIPickers from './DateModel/index';
class ShoppingList extends Component{
    constructor(props){
        super(props);
        this.state={
       SelectedEmployeeId:""
        }


    };
    componentDidMount() {
        console.log("hiii")
    }
    handleChange=name=>event=>{
        let value=event.target.value;
        console.log(name+" "+value);
       this.setState(prevState=>({
           ...prevState,
               [name]:value
       }))
       // setValues({...values,error:false,[name]:event.target.value})
}
    render(){
        const {items}=this.props.items;
        console.log(this.props.items)


        return(

            <Container>
                <Button color={"dark"}
                style={{marginBottom:'2rem'}}
                        onClick={()=>{

                            if(this.props.auth.isAuthenticated)
                            {
                                const name=prompt('Enter Item');
                                if(name){

                                    // this.setState(state=>({
                                    //     items:[...state.items,{id:uuid(),name}]
                                    // }));
                                    this.props.addItem(name,this.props.auth.user.id)

                                }
                            }
                            else{
                                alert("Kindly sign in ");
                            }


                        }}
                >
                Add Item
                </Button>
                <Input type="select" bsSize="sm" onChange={this.handleChange("SelectedEmployeeId")}>
                <option >Select Employee</option>
                {
                    (this.props.auth.user && this.props.auth.user.id)? 
                    <option value={this.props.auth.user.id}>Me</option>:""
                }
                

                {
                (this.props.auth.user && this.props.auth.user.Employees)?this.props.auth.user.Employees.map(({_id,name})=>(
                <option value={_id}>{name}</option>
                
                
                )):""}

           </Input>
           <br></br>
                <MaterialUIPickers 
                flag={"Mark"}
                SelectedEmployeeId={this.state.SelectedEmployeeId}
                />
                {/* // flag={"Mark"} */}
            
            
                <ListGroup>
                    <TransitionGroup className={"shopping-list"}>
                        {items.map(({_id,name})=>(



                            <CSSTransition key={_id} timeout={500} >
                            <ListGroupItem>
                                <Button className={"remove-btn"}

                                color={"danger"}
                                size={"sm"}
                                 onClick={()=>{

                                    this.props.deleteItem(_id);
                                     // this.setState(state=>({
                                     //
                                     //    items:state.items.filter(item=>item.id!==id)
                                     //
                                     // }))
                                 }}   >
                               &times;</Button>
                                {name}
                            </ListGroupItem>

                            </CSSTransition>

                        ))}

                    </TransitionGroup>
                </ListGroup>
            </Container>

        )
    }




}

const mapStateToProps=(state)=>({
items:state.item,
    auth:state.auth});

export default  connect(mapStateToProps,{fetchList,addItem,deleteItem})(ShoppingList);
