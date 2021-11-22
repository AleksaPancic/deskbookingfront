import React, {useState, useEffect} from 'react'
import {Box, Button, Typography, Modal, Paper, TextField} from '@mui/material';
import { changePaswordRequest } from '../../services/userService';

const styles = {
    paperStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
        width: "42vh",
        height: "400px",
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    modalTitle: {
        color: 'primary.main',
        fontWeight: '600',
        textAlign: 'center'
    },
    inputBoxWrapperStyle: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "4%"
      },
      inputLabelStyle: {
          fontWeight: 'bold'
      },
      buttonStyle: {
        padding: '2%',
        fontWeight: '600',
        '&:hover': {
            textDecoration: 'underline'
        }
    }

}

const defaultData = {
    newPassword: "",
    confirmNewPassword: ""
}

const ChangePasswordModal = (props) => {

   const [data,setData] = useState(defaultData)
   const [errId, setErrId] = useState(null);

   
   const handleChangePassword = () => {
            if(data.newPassword.length > 4 ){
                if(data.newPassword === data.confirmNewPassword){
                    setErrId(null);
                    changePaswordRequest(data.newPassword)
                        .then((res) => {
                            console.log("sucess"+ res);
                            setData(defaultData);
                        })
                        .catch((err) => {
                            console.log(err);
                        }) 
                }
                else setErrId("confirmNewPassword")
            }
            else setErrId("newPassword")
   }

  

    return (
      <Modal
        open={props.open}
        onClose={() => {
            props.handleClose();
            setData(defaultData);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={styles.paperStyle}>
          <Box sx={styles.contentWrapper}>
            <Typography variant="h5" sx={styles.modalTitle}>
              Change Your Password
            </Typography>
            <Box sx={styles.inputBoxWrapperStyle}>
              <Typography
                variant="subtitle1"
                sx={styles.inputLabelStyle}
                gutterBottom
              >
                Your new password
              </Typography>
              <TextField
                value={data.newPassword}
                onChange={(e) => {
                  setData({ ...data, newPassword: e.target.value });
                }}
                error={errId === "newPassword"}
                helperText={
                  errId === "newPassword"
                    ? "Password must be at least 4 characters long!"
                    : ""
                }
                id="newPassword"
                type="password"
                variant="outlined"
              />
            </Box>
            <Box sx={styles.inputBoxWrapperStyle}>
              <Typography
                variant="subtitle1"
                sx={styles.inputLabelStyle}
                gutterBottom
              >
                Confirm your new password
              </Typography>
              <TextField
                value={data.confirmNewPassword}
                onChange={(e) => {
                  setData({ ...data, confirmNewPassword: e.target.value });
                }}
                error={errId === "confirmNewPassword"}
                helperText={
                  errId === "confirmNewPassword"
                    ? "Passwords in the fields must be the same!"
                    : ""
                }
                id="confirmNewPassword"
                type="password"
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginTop: "5%", display: "flex", justifyContent: 'center' }}>
            <Button
                variant="text"
                sx={styles.buttonStyle}
                onClick={() => {
                  handleChangePassword();
                }}
              >
                Change
              </Button>
              <Button
                variant="text"
                sx={styles.buttonStyle}
                onClick={() => {
                    props.handleClose();
                    setData(defaultData);
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    );
}
 
export default ChangePasswordModal;