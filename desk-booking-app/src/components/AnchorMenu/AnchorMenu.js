import * as React from 'react';
import {Box , Divider, Menu, MenuItem, Typography} from '@mui/material';
import LetterAvatar from 'lettered-avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';

const styles = {
    menuStyle: {
        padding:'5%'
    },
    menuItemStyle: {
        marginLeft: '25px',
        marginRight: '25px',
        '&:hover': {
            color: 'primary.main'
        }
    },
    avatarWrapper : {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5px',
        marginLeft: '25px',
        marginRight: '25px'

    },
    dividerStyle : {
        marginTop: '10%',
       
      },
    nameStyle: {
        fontWeight: 'bold',
        color: 'primary.main'
    },
    menyItemIconStyle: {
        marginRight: '5%'
    },
    nameUsernameWrapper : {
        marginLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
}

const AnchorMenu = (props) => {
  const history = useHistory();

    return (
      <Menu
        sx={styles.menuStyle}
        anchorEl={props.anchorMenuEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={props.menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={props.isMenuOpen}
        onClose={props.handleAnchorMenuClose}
      >
        <Box sx={styles.avatarWrapper}>
          <LetterAvatar
            name={props.user.firstName + " " + props.user.lastName}
            options={{
                shape: 'square',
                twoLetter: true,
                size: 60,
            }}
          />
          <Box sx={styles.nameUsernameWrapper}>
          <Typography sx={styles.nameStyle} variant="subtitle1">
            {props.user.firstName + " " + props.user.lastName}
          </Typography>
          <Typography sx={styles.usernameStyle} variant="subtitle2">
            {props.user.username}
          </Typography>
          </Box>
        </Box>
        <Divider variant="middle" sx={styles.dividerStyle} />
        <MenuItem
          sx={styles.menuItemStyle}
          onClick={() => {
            history.push('/profile');
            props.handleAnchorMenuClose();
          }}
        >
          <AccountCircleIcon sx={styles.menyItemIconStyle} /> My Profile
        </MenuItem>
        <MenuItem sx={styles.menuItemStyle} onClick={props.logOut}>
          <LogoutIcon sx={styles.menyItemIconStyle} /> Log Out
        </MenuItem>
      </Menu>
    );
}
 
export default AnchorMenu;