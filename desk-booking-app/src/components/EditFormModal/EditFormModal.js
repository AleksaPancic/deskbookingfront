import React, {useState, useEffect} from 'react'
import {Box, Button, Typography, Modal, Paper, TextField,MenuItem,Select} from '@mui/material';
import { useUserContext } from '../../UserContext';
import { editProfileRequest } from '../../services/userService';

const styles = {
    paperStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
        width: "60vh",
        height: "450px",
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
    rowWrapper: {
        display: 'flex'
    },
    inputBoxWrapperStyle: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: '4%',
        marginRight: '4%',
        marginTop: '2%'
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




const EditFormModal = (props) => {

    const {user,setUser} = useUserContext()
    const defaultData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        workingUnit: user.workingUnit.unitName,
        telephone: user.telephone
    }
    const [data,setData] = useState(defaultData);
    const [errId, setErrId] = useState(null);
    const handleEditProfile = () => {
             if(dataValidityChecker()){
                    setErrId(null);
                    console.log(data);
                    editProfileRequest(data)
                    .then((res) => {
                        console.log("sucess"+ res);
                        setUser(res);
                        props.handleClose();
                    })
                    .catch((err) => {
                        console.log(err);
                    }) 
             }
            
    }

    const dataValidityChecker = () => {
        if(data.firstName.length === 0 ){
            setErrId("firstName");
            return false;
        }
        if(data.lastName.length === 0 ){
            setErrId("lastName");
            return false;
        }
        if(!data.email.endsWith("@enjoying.rs")){
            setErrId("email");
            return false;
        }
        if(data.telephone.length === 0){
            setErrId("telephone");
            return false;
        }
        return true;

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
               Edit Your Profile
             </Typography>
             <Box sx={styles.rowWrapper}>
               <Box sx={styles.inputBoxWrapperStyle}>
                 <Typography
                   variant="subtitle1"
                   sx={styles.inputLabelStyle}
                   gutterBottom
                 >
                   Your Name
                 </Typography>
                 <TextField
                   size="small"
                   value={data.firstName}
                   onChange={(e) => {
                     setData({ ...data, firstName: e.target.value });
                   }}
                   error={errId === "firstName"}
                   helperText={
                     errId === "firstName"
                       ? "You can't leave this field empty!"
                       : ""
                   }
                   id="firstName"
                   type="text"
                   variant="outlined"
                 />
               </Box>
               <Box sx={styles.inputBoxWrapperStyle}>
                 <Typography
                   variant="subtitle1"
                   sx={styles.inputLabelStyle}
                   gutterBottom
                 >
                   Your Last Name
                 </Typography>
                 <TextField
                   size="small"
                   value={data.lastName}
                   onChange={(e) => {
                     setData({ ...data, lastName: e.target.value });
                   }}
                   error={errId === "lastName"}
                   helperText={
                     errId === "lastName"
                       ? "You can't leave this field empty!"
                       : ""
                   }
                   id="lastName"
                   type="text"
                   variant="outlined"
                 />
               </Box>
             </Box>
             <Box sx={styles.rowWrapper}>
               <Box sx={styles.inputBoxWrapperStyle}>
                 <Typography
                   variant="subtitle1"
                   sx={styles.inputLabelStyle}
                   gutterBottom
                 >
                   Your Email
                 </Typography>
                 <TextField
                   size="small"
                   value={data.email}
                   onChange={(e) => {
                     setData({ ...data, email: e.target.value });
                   }}
                   error={errId === "email"}
                   helperText={
                     errId === "email"
                       ? "You must type yout enjoy.ing email!"
                       : ""
                   }
                   id="email"
                   type="text"
                   variant="outlined"
                 />
               </Box>
               <Box sx={styles.inputBoxWrapperStyle}>
                 <Typography
                   variant="subtitle1"
                   sx={styles.inputLabelStyle}
                   gutterBottom
                 >
                   Your Phone Number
                 </Typography>
                 <TextField
                   size="small"
                   value={data.telephone}
                   onChange={(e) => {
                     setData({ ...data, telephone: e.target.value });
                   }}
                   error={errId === "telephone"}
                   helperText={
                     errId === "telephone"
                       ? "You can't leave this field empty!"
                       : ""
                   }
                   id="telephone"
                   type="number"
                   variant="outlined"
                 />
               </Box>
             </Box>
             <Box sx={styles.rowWrapper}>
               <Box sx={styles.inputBoxWrapperStyle}>
                 <Typography
                   variant="subtitle1"
                   sx={styles.inputLabelStyle}
                   gutterBottom
                 >
                   Your Office
                 </Typography>
                 <Select
                   size="small"
                   defaultValue={user.workingUnit.unitName}
                   id="workingUnit"
                   onChange={(e) =>
                     setData({ ...data, workingUnit: e.target.value })
                   }
                 >
                   <MenuItem value={"Nis Office"}>Nis Office</MenuItem>
                   <MenuItem value={"Beograd Office"}>Beograd Office</MenuItem>
                   <MenuItem value={"Kragujevac Office"}>Kragujevac Office</MenuItem>
                 </Select>
               </Box>
             </Box>
             <Box
               sx={{
                 marginTop: "5%",
                 display: "flex",
                 justifyContent: "center",
               }}
             >
               <Button
                 variant="text"
                 sx={styles.buttonStyle}
                 onClick={() => {
                   handleEditProfile();
                 }}
               >
                 Edit
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
 
export default EditFormModal;