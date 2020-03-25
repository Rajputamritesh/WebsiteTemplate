import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {fetchList} from '../../actions/action';
import {connect} from "react-redux";
import {getMarkers} from "../../actions/mapAction";

export function changeState(date){


}
function MaterialUIPickers(props)
{
    //tthis is how you use mapstateto props and access state in rcc by passing props

    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {


        // console.log(props.items);
        date=new Date(date);
        console.log(date);
        setSelectedDate(date);
        if(props.flag == "Mark")
        {
            props.fetchList(date);
        }

        if(props.flag == "Map")
        {
            localStorage.setItem("Date",date);
            props.getMarkers(date)
        }
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                {/*<KeyboardDatePicker*/}
                {/*    disableToolbar*/}
                {/*    variant="inline"*/}
                {/*    format="MM/dd/yyyy"*/}
                {/*    margin="normal"*/}
                {/*    id="date-picker-inline"*/}
                {/*    label="Date picker inline"*/}
                {/*    value={selectedDate}*/}
                {/*    onChange={handleDateChange}*/}
                {/*    KeyboardButtonProps={{*/}
                {/*        'aria-label': 'change date',*/}
                {/*    }}*/}
                {/*/>*/}
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                {/*<KeyboardTimePicker*/}
                {/*    margin="normal"*/}
                {/*    id="time-picker"*/}
                {/*    label="Time picker"*/}
                {/*    value={selectedDate}*/}
                {/*    onChange={handleDateChange}*/}
                {/*    KeyboardButtonProps={{*/}
                {/*        'aria-label': 'change time',*/}
                {/*    }}*/}
                {/*/>*/}
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
function mapStateToProps(state) {
  return {  items:state.item};//this how you use mapstate to props in functional component
}

export default connect(mapStateToProps,{fetchList,getMarkers})(MaterialUIPickers)

