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

const AddDeskPopover = (props) => {
  const [deskName, setDeskName] = useState("");
  const [deskErrorMsg, setDeskErrorMsg] = useState("");

const resetPopoverState =()=> {
    setDeskName("");
    setDeskErrorMsg("");

}

  const handleSubmitEvent = () => {
        if(deskName.length > 0){
            props.handleEventAddDesk(deskName);
            props.handleAddDeskClose();
            resetPopoverState();
            
        }
        else {
            setDeskErrorMsg("You must enter a desk name!")
        }
  };

  return (
    <Popover
      sx={styles.popoverStyle}
      id={props.deskPopoverID}
      open={props.openDeskPopover}
      anchorEl={props.anchorDeskPopover}
      onClose={() => {
        props.handleAddDeskClose();
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
              props.handleAddDeskClose();
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
            Add a desk
          </Typography>
          <TextField
            label="Desk name"
            value={deskName}
            onChange={(e) => setDeskName(e.target.value)}
            sx={styles.textFieldStyle}
            error={deskErrorMsg.length > 0}
            helperText={deskErrorMsg}
            id="deskName"
            variant="outlined"
          />
          <Box sx={{display: 'flex', justifyContent: 'start', marginTop:'4%'}}>
          <Button onClick = {() => handleSubmitEvent() }variant="contained">Add desk</Button>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default AddDeskPopover;
