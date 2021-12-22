import React from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const styles = {
  contentWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  analyticsCardSyles: {
    width: "300px",
    marginRight: "2%",
    marginTop: "1%",
    padding: "1%",
  },
  dataTypographyStyles: {
    fontWeight: "bold",
    marginLeft: "2%",
    color: "secondary.main",
  },
};



const ParkingAnalytics = (props) => {
    const returnWorkingUnitName =(id)=> {
        let workingUnit = props.workingUnitList.find(workingUnit => workingUnit.id === id);
        return workingUnit.unitName;
      }

      return (
        <Box sx={{marginTop: '4%'}}>
          <Box sx={{ width: 200, marginTop: "2%" }}>
            <FormControl fullWidth>
              <InputLabel id="time-frame-select-label">Time frame</InputLabel>
              <Select
                labelId="time-frame-select-label"
                id="categories-select"
                value={props.timeFrame}
                label="Time frame"
                onChange={(event) => props.setTimeFrame(event.target.value)}
              >
                <MenuItem value={30}>30 days</MenuItem>
                <MenuItem value={7}>7 days</MenuItem>
                <MenuItem value={1}>1 day</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={styles.contentWrapper}>
            {props.data &&
              props.data.map((item, index) => (
                <Paper sx={styles.analyticsCardSyles} key={index} elevation={3}>
                  <Box sx={{display: 'flex', marginBottom: '4%'}}>
                    <LocalParkingIcon sx={{color: 'primary.main', width: '36px', height: '36px', marginRight: '2%'}}/>
                    <Typography variant="h5">{returnWorkingUnitName(item.workingUnitId)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">
                      Total number of bookings:
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "primary.main",
                      }}
                      variant="h3"
                    >
    
                      {item.numOfTotalSchedules}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ paddingTop: "2.5%" }} variant="subtitle2">
                    Fulfilled/canceled:
                    </Typography>
                    <Typography sx={styles.dataTypographyStyles} variant="h5">
                      {(item.numOfSchedules ? item.numOfSchedules: 0) + "/" + (item.numOfCanceledSchedules ? item.numOfCanceledSchedules: 0)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ paddingTop: "2.5%" }} variant="subtitle2">
                      Average number of bookings:
                    </Typography>
                    <Typography sx={styles.dataTypographyStyles} variant="h5">
                      {item.avgDailyReservation}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ paddingTop: "2.5%" }} variant="subtitle2">
                    Available/Not available parkings:
                    </Typography>
                    <Typography sx={styles.dataTypographyStyles} variant="h5">
                      {(item.numOfEnableParkings ? item.numOfEnableParkings: 0) + "/" + (item.numOfDisableParkings ? item.numOfDisableParkings: 0)}
                    </Typography>
                  </Box>
                </Paper>
              ))}
          </Box>
        </Box>
      );
}
 
export default ParkingAnalytics;