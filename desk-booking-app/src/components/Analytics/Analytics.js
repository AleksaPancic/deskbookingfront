import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem

} from "@mui/material";
import PageHead from "../PageHead/PageHead";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { getDeskAnalytics, getGeneralAnalytics, getOfficeAnalytics, getParkingAnalytics } from "../../services/adminService";
import GeneralAnalytics from "./GneralAnalytics";
import OfficeAnalytics from "./OfficeAnalytics";
import DeskAnalytics from "./DeskAnalytics";
import ParkingAnalytics from "./ParkingAnalytics";


const styles = {
    pageHeadingAnalyticsIcon: {
      fontSize: "48px",
      color: "white",
    },
    headWrapperBox: {
      display: 'flex',
      flexWrap: 'wrap'
    },
}

const Analytics = () => {
  const history = useHistory();
  const workingUnitList = history.location.state.detail;
  const [category, setCategory] = useState('general');
  const [timeFrame, setTimeFrame] = useState(30);
  const [data, setData]= useState(null);


  useEffect(() => {
    getAnalyticData(category, timeFrame)
    .then(res => {
      setData(res);
      console.log(res);

    })

  },[category, timeFrame])

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const getAnalyticData = (category, timeFrame) => {
      switch(category) {
        case 'general' : return getGeneralAnalytics(timeFrame)

        case 'office' : return getOfficeAnalytics(timeFrame)

        case 'desk' : return getDeskAnalytics(timeFrame)

        case 'parking' : return getParkingAnalytics(timeFrame)

        default:
        console.log(`Error happened in request process`);
      }
  }

  const renderCategory = (category, data) => {
    switch(category) {
      case 'general' : return (<GeneralAnalytics workingUnitList={workingUnitList ? workingUnitList : []} data={data ? data : []} setTimeFrame={(timeFrame) => setTimeFrame(timeFrame)} timeFrame={timeFrame}/>);

      case 'office' : return (<OfficeAnalytics workingUnitList={workingUnitList ? workingUnitList : []} data={data ? data : []}  setTimeFrame={(timeFrame) => setTimeFrame(timeFrame)} timeFrame={timeFrame}/>);

      case 'desk' : return (<DeskAnalytics workingUnitList={workingUnitList ? workingUnitList : []} data={data ? data : []}  setTimeFrame={(timeFrame) => setTimeFrame(timeFrame)} timeFrame={timeFrame}/>);

      case 'parking' : return (<ParkingAnalytics workingUnitList={workingUnitList ? workingUnitList : []} data={data ? data : []}  setTimeFrame={(timeFrame) => setTimeFrame(timeFrame)} timeFrame={timeFrame}/>);

      default:
      console.log(`Error in the request process`);
    }
  }

    return ( 
      <Box>
        <Box sx={styles.headWrapperBox}>
          <Box sx={{minWidth: 270}}>
        <PageHead
        avatar={<AnalyticsIcon sx={styles.pageHeadingAnalyticsIcon} />}
        title="Analytics"
        subtitle="View analytical data."
        />
        </Box>
         <Box sx={{ width: 200, marginTop: '1%'}}>
      <FormControl fullWidth>
        <InputLabel id="categories-select-label">Categories</InputLabel>
        <Select
          labelId="categories-select-label"
          id="categories-select"
          value={category}
          label="Categories"
          onChange={handleChangeCategory}
        >
          <MenuItem value={'general'}>General analytics</MenuItem>
          <MenuItem value={'office'}>Office analytics</MenuItem>
          <MenuItem value={'desk'}>Desk analytics</MenuItem>
          <MenuItem value={'parking'}>Parking analytics</MenuItem>

        </Select>
      </FormControl>
    </Box>
        </Box>
        <Box sx={styles.contentWrapper}>
        {
          renderCategory(category, data)
        }
        </Box>
      </Box>
    );
}
 
export default Analytics;