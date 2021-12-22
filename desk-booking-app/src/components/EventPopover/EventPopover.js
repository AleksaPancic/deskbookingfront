import React from 'react'
import {Box, IconButton ,Divider, Typography, Popover} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const styles = {
    popoverWrapperStyle: {
        width: '32vh',
    },
    iconBoxWrapper : {
        display: 'flex',
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        justifyContent: 'end'
    },
    iconStyle: {
        width: '28px',
        height: '28px'
    },
    contentWrapper: {
        marginTop: '1%',
        marginLeft: '4%',
        marginRight: '4%',
        marginBottom: '4%',
    },
    nameTypographyDefault: {
        color: 'primary.main', 
        fontWeight: 'bold'
    },
    nameTypographyCurrentUser: {
        color: 'success.main', 
        fontWeight: 'bold'
    }
}

const EventPopover = (props) => {
    return (
      <Popover
        sx={styles.popoverStyle}
        id={props.eventPopoverID}
        open={props.openEventPopover}
        anchorEl={props.anchorEventPopover}
        onClose={props.handleEventClose}
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
            {((props.currentUserID === props.eventUserID || props.currentUserRoles.find(role => role.id === 2 || role.id === 3)) && props.selectedEventEndDate > new Date()) && (
              <>
                <IconButton onClick= {() => {
                    props.handleEventDelete(props.event.id);
                    props.handleEventClose();
                }}>
                  <DeleteIcon sx={styles.iconStyle} />
                </IconButton>
                <Divider orientation="vertical" flexItem />
              </>
            )}
            <IconButton onClick={() => props.handleEventClose()}>
              <CloseIcon sx={styles.iconStyle} />
            </IconButton>
          </Box>
          <Box sx={styles.contentWrapper}>
            {props.event && (
              <>
                <Typography
                  variant="h6"
                  sx={
                    props.currentUserID === props.eventUserID
                      ? styles.nameTypographyCurrentUser
                      : styles.nameTypographyDefault
                  }
                >
                  {props.event.title}
                </Typography>
                <Typography>
                  {props.event.start.toLocaleDateString()}
                </Typography>
                <Box sx={{ display: "flex", marginTop: "2%" }}>
                  <AccessTimeIcon sx={{ marginRight: "2%" }} />
                  <Typography>
                    {props.event.start.toLocaleTimeString()} -{" "}
                    {props.event.end.toLocaleTimeString()}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Popover>
    );
}
 
export default EventPopover;