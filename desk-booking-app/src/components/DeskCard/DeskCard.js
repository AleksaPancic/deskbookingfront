import React from 'react'
import {Box,  Typography} from '@mui/material';
//import DesktopMacIcon from '@mui/icons-material/DesktopMac';

const styles = {
    cardWrapper: {
        margin: '5px',
        padding: '5px',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    defaultStyleWrapper: {
        '&:hover': {
            color: 'primary.main'
        }
    },
    styleWrapperSelected: {
        color: 'primary.main'
    },
    styleWrapperDisabled: {
        opacity: '0.3'
    },
    iconWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    iconStyle: {
        height: '32px',
        width: '32px',
    },
    deskNameStyle: {
        textAlign: 'center'
    }
}

const DeskCard = (props) => {
    return (
      <Box>
        <Box
          onClick={() => props.handleSelect(props.desk.available, props.desk.id)}
          sx={styles.cardWrapper}
        >
          <Box
            sx={
              props.selectedDeskId === props.desk.id
                ? styles.styleWrapperSelected
                : props.desk.available
                ? styles.defaultStyleWrapper
                : styles.styleWrapperDisabled
            }
          >
            <Box sx={styles.iconWrapper}>
              {/* <DesktopMacIcon sx={styles.iconStyle} /> */}
              {props.icon}
            </Box>
            <Typography sx={styles.deskNameStyle}>{props.desk.name}</Typography>
          </Box>
        </Box>
      </Box>
    );
}
 
export default DeskCard;