import './UserProfile.css';
import React, {useState} from 'react';
import {Box , Button, Divider, Typography} from '@mui/material';
import LetterAvatar from 'lettered-avatar';
import { useUserContext } from '../../UserContext';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import EditFormModal from '../EditFormModal/EditFormModal';

const styles = {
    columnWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    profileWrapper: {
        marginTop: '2%',
        display: 'flex',
        flexDirection: 'column',
        
    },
    avatarWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    nameAndLastNameStyle: {
        color: 'primary.main',
        marginTop: '8%',
        fontWeight: '600',
        textAlign: 'center'
    },
    usernameStyle: {
        marginTop: '8%',
        fontWeight: '500',
        textAlign: 'center'
    },
    contentBox: {
        marginTop: '8%',
    },
    contentBoxSubtitle: {
        fontWeight: '400'
    },
    contentBoxContent: {
        fontWeight: '600', 
        color: '#3f4450'
    }, 
    buttonStyle: {
        paddingLeft: '2%',
        fontWeight: '600',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}

const UserProfile = () => {
    const {user} = useUserContext();

    const [openChnagePasswordModal, setOpenChnagePasswordModal] =useState(false);
    const [openEditProfileModal, setOpenEditProfileModal] =useState(false);


    return (
    <Box sx= {styles.columnWrapper}>
      <Box sx={styles.profileWrapper}>
        <Box sx={styles.avatarWrapper}>
          <LetterAvatar
            name={user.firstName + " " + user.lastName}
            options={{
              shape: "square",
              twoLetter: true,
              size: 128,
            }}
          />
        </Box>
        <Typography variant="h4" sx = {styles.nameAndLastNameStyle}>
          {user.firstName + " " + user.lastName}
        </Typography>
        <Typography variant="h5" sx = {styles.usernameStyle}>
          {user.username }
        </Typography>
        <Divider variant="middle" />
        <Box sx={styles.contentBox}>
        <Typography variant="subtitle2" sx = {styles.contentBoxSubtitle}>
          Email
        </Typography>
        <Typography variant="h6" sx = {styles.contentBoxContent}>
          {user.email }
        </Typography>
        </Box>
        <Box sx={styles.contentBox}>
        <Typography variant="subtitle2" sx = {styles.contentBoxSubtitle}>
          Phone Number
        </Typography>
        <Typography variant="h6" sx = {styles.contentBoxContent}>
          {user.telephone }
        </Typography>
        </Box>
        <Box sx={styles.contentBox}>
        <Typography variant="subtitle2" sx = {styles.contentBoxSubtitle}>
          Office
        </Typography>
        <Typography variant="h6" sx = {styles.contentBoxContent}>
          {user.workingUnit.unitName }
        </Typography>
        </Box>
        <Box sx={styles.contentBox}>
            <Button variant="text" onClick = {() => setOpenEditProfileModal(true)} sx = {styles.buttonStyle}>Edit profile</Button>
            <Button variant="text" onClick = {() => setOpenChnagePasswordModal(true)} sx = {styles.buttonStyle}>Change password</Button>
        </Box>
      </Box>
      <ChangePasswordModal open= {openChnagePasswordModal} handleClose = {() => setOpenChnagePasswordModal(false)}></ChangePasswordModal>
      <EditFormModal open= {openEditProfileModal} handleClose = {() => setOpenEditProfileModal(false)}></EditFormModal>
      </Box>
    );
}
 
export default UserProfile;