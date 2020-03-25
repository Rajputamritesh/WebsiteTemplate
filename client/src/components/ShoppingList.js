import {CSSTransition,TransitionGroup} from "react-transition-group";

import React,{Component} from 'react';
import{Container,ListGroup,ListGroupItem,Button

} from 'reactstrap';
import {connect} from "react-redux";
import {fetchList} from '../actions/action';
import {addItem,deleteItem} from "../actions/action";
import '../reducers/index';
import MaterialUIPickers from './DateModel/index';
class ShoppingList extends Component{

    componentDidMount() {
        console.log("hiii")
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
                                    this.props.addItem(name)

                                }
                            }
                            else{
                                alert("Kindly sign in ");
                            }


                        }}

                >
                Add Item
                </Button>
                <MaterialUIPickers
                flag={"Mark"}
                />
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
