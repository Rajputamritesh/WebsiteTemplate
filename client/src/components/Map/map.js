import React, {Component} from 'react';
import L from 'leaflet';
import  {Map,TileLayer, Marker,Popup} from 'react-leaflet';
import FormGroup from "reactstrap/es/FormGroup";
import Form from "reactstrap/es/Form";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import {Card} from 'reactstrap';
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import {Button} from 'reactstrap'
import {markMessage,getMarkers} from "../../actions/mapAction";
import {connect} from "react-redux";
import MaterialUIPickers from "../DateModel";
var myIcon=L.icon({
    iconUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII',
    iconSize:[25,41],
    iconAnchor:[12.5 ,41],
    popupAnchor:[0,-41]
})
var otherIcon=L.icon({
    iconUrl:'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    iconSize:[25,41],
    iconAnchor:[12.5 ,41],
    popupAnchor:[0,-41]

})
class Mapper extends Component {
    constructor(props){
        super(props);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };

    forceUpdateHandler(){
        this.forceUpdate();
    };

    state = {
        coords:{

            lat: 51.505,
            lng: -0.09,
        },
        haveUserLocation:false,
        zoom: 1,
        userMessage:{
            name:"",
            message:""
        },
        position:[],
        SelectedEmployeeId:"",
        authId:""
    }

componentDidMount() {
        let date =Date.now();
console.log(date);
date=new Date(date);
let SelectedEmployeeId="";
    this.props.getMarkers(date,SelectedEmployeeId).then(()=>{
console.log(this.props.markers.markersInfo);
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            this.setState({
                coords:{
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                },
                haveUserLocation:true,
                zoom:13,
                position:this.props.markers.markersInfo
            })
        },()=>{
            alert("Ooh so you didnt allowed the access location but  still we will get it 😀");
            fetch('https://ipapi.co/json').then(res=>res.json()).then(

                res=>{this.setState({
                    coords:{
                        lat:res.latitude,
                        lng:res.longitude
                    },
                    haveUserLocation:true,
                    zoom:13,
                    position:this.props.markers.markersInfo


                })}
                )




        })




    });
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
 Submitted=(event)=>{
        event.preventDefault();
        console.log(this.state);
        this.state.authId=this.props.auth.user.id;
        let date =Date.now();
console.log(date);
date=new Date(date);

        this.props.markMessage(this.state).then(()=>{
           alert(this.props.markers.respMessage);
            this.props.getMarkers(date,this.state.authId).then(()=>{

                console.log(this.props.markers.markersInfo);

                this.setState(prevState=>({
                    ...prevState.position,
                    position:this.props.markers.markersInfo

                }))
            });

        });
    }
    changedFormValue=(event)=>{
       const {name,value}=event.target;
        this.setState(prevState=>({
            userMessage:{
                ...prevState.userMessage,//TO PREVENT  OVERIDING
                [name]:value

            }
        }))

    };
componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevState.position!=this.state.position)
        {
            const position = this.state.position
            return(<div>{this.renderMarkers(position)}</div>);
        }
}

renderMarkers=(position)=>(

        <Map  className="map" center={[this.state.coords.lat,this.state.coords.lng]} zoom={this.state.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />



            {( this.state.haveUserLocation)?
        position.map((position)=>(

            (position.latitude==this.state.coords.lat.toFixed(4) || position.longitude==this.state.coords.lng.toFixed(4))?


            <Marker  position={[position.latitude,position.longitude]}
                    icon={myIcon}
            >
                <Popup>
                    {position.name} <br /> {position.message}.
                </Popup>
            </Marker>:  <Marker  position={[position.latitude,position.longitude]}
                                 icon={otherIcon}
                >
                    <Popup>
                        {position.name} <br /> {position.message}.
                    </Popup>
                </Marker>



        )):''}
                </Map>


)





    render() {

    if(this.state.position!==this.props.markers.markersInfo)
    {
        this.state.position=this.props.markers.markersInfo
    }
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv .imp to  this is how automatically change anythinmg in component
        //by simply declaring in render

        return (
            <div className={'body'}>

                {console.log(this.state.position)}
                {/*//this hhow you return a comonent bycalling a function and retirn the component inside the function*/}
              
                <div style={{display:"block"}}>
  <div style={{marginLeft:"0px"}}><MaterialUIPickers
  SelectedEmployeeId={this.state.SelectedEmployeeId}
  flag={"Map"}
   />
   </div>

<Input type="select" bsSize="sm"  style={{color:"white",backgroundColor:"#343a40"}}onChange={this.handleChange("SelectedEmployeeId")}>
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
           </div>


                {this.renderMarkers(this.state.position)}
                <Card body className={"formStyle"}  style={{marginTop:"30px"}}>
                    <CardBody >
                        <CardTitle><b>Welcome to map</b> </CardTitle>
                        <Form onSubmit={this.Submitted} >
                            <FormGroup >
                                <Label className={"form"} for="Name"><b>Name</b></Label>
                                <Input onChange={this.changedFormValue}
                                    type="text"
                                       className={"form"}
                                       name="name" id="exampleEmail" placeholder="Name.." />
                            </FormGroup>
                            <FormGroup>
                                <Label className={"form"} for="Message"><b>Message</b></Label>
                                <Input type="message"  onChange={this.changedFormValue}
                                       className={"form"}
                                       name="message"
                                       id="message" placeholder="message ..." />
                            </FormGroup>
                            <Button type={"submit"} >Send</Button>
                        </Form>
                        <hr/>

                    </CardBody>

                </Card>
            </div>

        )
    }
}

const mapStateToProps=(state)=>({
    markers: state.markers,

    auth:state.auth

});

export default connect(mapStateToProps,{markMessage,getMarkers})(Mapper);

