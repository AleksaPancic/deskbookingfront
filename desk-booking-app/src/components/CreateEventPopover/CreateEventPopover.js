import React, {useState} from 'react'
import {Box, IconButton , Typography,  TextField, Popover, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import moment from 'moment';


const styles = {
    popoverWrapperStyle: {
        width: '40vh',
    },
    iconBoxWrapper : {
        display: 'flex',
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        justifyContent: 'end'
    },
    contentWrapper: {
        marginTop: '1%',
        marginBottom: '4%',
        marginLeft: '4%',
        marginRight: '2%',

    },
    timeWrapper: {
        display: 'flex',
        marginTop: '4%'
    }
}

const CreateEventPopover = (props) => {

    const [date, setDate] = useState(moment().add(1,'days'));
    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    const [error, setError] = useState(null);

    const overlapTest = (start, end) => {
      let result = false;
       props.allEvents.forEach((event) => {
         let overlap = start < event.end && event.start < end;
         if(overlap){
           result = true;
         }
       })
       return result;
     };

     const handleSubmitEvent =()=>{
       if(timeFrom && timeTo){
        const newEvent = {
          username: props.currentUserUsername,
          deskName: props.selectedDesk.name,
          dateFrom: date.set({'hour': timeFrom.get('hour'),'minute': timeFrom.get('minute'),'second':0}).format("YYYY-MM-D HH:mm:ss"),
          dateTo: date.set({'hour': timeTo.get('hour'),'minute': timeTo.get('minute'), 'second':0}).format("YYYY-MM-D HH:mm:ss"),
        }
        //console.log(newEvent);
        if(!overlapTest(moment(newEvent.dateFrom).toDate(),moment(newEvent.dateTo).toDate())){
          props.handleSetNewEvent(newEvent);
          props.handleCreateClose();
          resetState();
        }
        else setError('Selected date and time are not avaliable!');
      }
      else setError('You must select start and end time!');

     }

     const resetState = () => {
      setDate(moment().add(1,'days'));
      setTimeFrom(null);
      setTimeTo(null);
      setError(null);
     }

    return (
      <Popover
        sx={styles.popoverStyle}
        id={props.createPopoverID}
        open={props.openCreatePopover}
        anchorEl={props.anchorCreatePopover}
        onClose={() => {
            props.handleCreateClose();
            resetState();
          
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={styles.popoverWrapperStyle}>
          <Box sx={styles.iconBoxWrapper}>
            <IconButton onClick={() => {
                  props.handleCreateClose();
                  resetState();
                }}>
              <CloseIcon sx={styles.iconStyle} />
            </IconButton>
          </Box>
          <Box sx={styles.contentWrapper}>
            <Typography variant="h5" sx={{color: 'primary.main', fontWeight: '600'}} gutterBottom>Book a desk 😇</Typography>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                minDate={moment().add(1,'days')}
                label="Pick a date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Box sx={styles.timeWrapper}>
                <Box>
              <LocalizationProvider dateAdapter={DateAdapter} >
                <TimePicker
                  ampm={false}
                  label="Time from"
                  value={timeFrom}
                  onChange={(newValue) => {
                    setTimeFrom(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              </Box>
              <Box sx={{marginLeft: '4%'}}>
              <LocalizationProvider dateAdapter={DateAdapter} >
                <TimePicker
                  ampm={false}
                  minTime= {timeFrom ? timeFrom : null }  
                  label="Time to"
                  value={timeTo}
                  onChange={(newValue) => {
                    setTimeTo(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              </Box>
            </Box>
            <Button sx={{marginTop: '4%'}} variant="contained" onClick={() => handleSubmitEvent()} >SUBMIT</Button>
            {error &&
                <Typography variant="subtitle1" sx={{color:'red'}}>{error}</Typography>
            }
          </Box>
        </Box>
      </Popover>
    );
}
 
export default CreateEventPopover;