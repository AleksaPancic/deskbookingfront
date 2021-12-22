import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Popover,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  popoverWrapperStyle: {
    width: "35vh",
  },
  iconBoxWrapper: {
    display: "flex",
    marginTop: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    justifyContent: "end",
  },
  contentWrapper: {
    marginTop: "1%",
    marginBottom: "4%",
    marginLeft: "4%",
    marginRight: "2%",
  },
  timeWrapper: {
    display: "flex",
    marginTop: "4%",
  },
};

const AddOfficePopover = (props) => {
  const [officeName, setOfficeName] = useState("");
  const [officeErrorMsg, setOfficeErrorMsg] = useState("");

const resetPopoverState =()=> {
    setOfficeName("");
    setOfficeErrorMsg("");

}

  const handleSubmitEvent = () => {
        if(officeName.length > 0){
            props.handleEventAddOffice(officeName);
            props.handleAddOfficeClose();
            resetPopoverState();
            
        }
        else {
            setOfficeErrorMsg("You must enter an office name!")
        }
  };

  return (
    <Popover
      sx={styles.popoverStyle}
      id={props.officePopoverID}
      open={props.openOfficePopover}
      anchorEl={props.anchorOfficePopover}
      onClose={() => {
        props.handleAddOfficeClose();
        resetPopoverState();
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
          <IconButton
            onClick={() => {
              props.handleAddOfficeClose();
              resetPopoverState();
            }}
          >
            <CloseIcon sx={styles.iconStyle} />
          </IconButton>
        </Box>
        <Box sx={styles.contentWrapper}>
          <Typography
            variant="h5"
            sx={{ color: "primary.main", fontWeight: "600" }}
            gutterBottom
          >
            Add an office
          </Typography>
          <TextField
            label="Office name"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            sx={styles.textFieldStyle}
            error={officeErrorMsg.length > 0}
            helperText={officeErrorMsg}
            id="officeName"
            variant="outlined"
          />
          <Box sx={{display: 'flex', justifyContent: 'start', marginTop:'4%'}}>
          <Button onClick = {() => handleSubmitEvent() }variant="contained">Add office</Button>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default AddOfficePopover;
