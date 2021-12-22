import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { getTopOfficeAnalytics } from "../../services/adminService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const styles = {
  contentWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  analyticsCardSyles: {
    maxWidth: "600px",
    minWidth: '300px',
    marginRight: "2%",
    marginTop: "1%",
    padding: "1%",
  },
  dataTypographyStyles: {
    fontWeight: "bold",
    marginLeft: "2%",
    color: "secondary.main",
    marginTop: "1%",
  },
};


const OfficeAnalytics = (props) => {
  const [mostUsedOffices, setMostUsedOffices] = useState(null);

  const returnWorkingUnitName = (id) => {
    let workingUnit = props.workingUnitList.find(
      (workingUnit) => workingUnit.id === id
    );
    return workingUnit.unitName;
  };

  useEffect(() => {
    getTopOfficeAnalytics(props.timeFrame).then((res) => {
      setMostUsedOffices(res);
    });
  }, [props.timeFrame]);

  return (
    <Box sx={{ marginTop: "4%" }}>
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
              <Box sx={{ display: "flex", marginBottom: "4%" }}>
                <HomeWorkIcon
                  sx={{
                    color: "primary.main",
                    width: "32px",
                    height: "32px",
                    marginRight: "2%",
                  }}
                />
                <Typography variant="h5">
                  {returnWorkingUnitName(item.workingUnitId)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">
                  Total number of offices:
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                  variant="h3"
                >
                  {item.numOfDisableOffices || item.numOfEnableOffices
                    ? item.numOfDisableOffices + item.numOfEnableOffices
                    : 0}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ paddingTop: "2.5%" }} variant="subtitle2">
                  Available/unavailable:
                </Typography>
                <Typography sx={styles.dataTypographyStyles} variant="h5">
                  {item.numOfDisableOffices || item.numOfEnableOffices
                    ? item.numOfEnableOffices + "/" + item.numOfDisableOffices
                    : 0}
                </Typography>
              </Box>
            </Paper>
          ))}
      </Box>
      {mostUsedOffices &&
        mostUsedOffices.map(
          (office, index) =>
            office.length > 0 && (
              <Paper sx={styles.analyticsCardSyles} key={index} elevation={3}>
                <Typography sx={{ fontWeight: "bold", marginTop: "2%", textAlign: 'center' }} gutterBottom>
                  
                  {"Most used offices in "+returnWorkingUnitName(office[index].workingUnitId)}
                </Typography>
                <Box sx={{ width: '500px', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={office}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="officeName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="numOfUsed" fill="#279cce" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            )
        )}
    </Box>
  );
};

export default OfficeAnalytics;
