import * as React from 'react';
import { Typography, Avatar, Modal, Backdrop, Fade } from '@mui/material';
import { Box } from '@mui/system';


const styles = {
    pageHeadingBox: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    pageHeadingAvatar: {
        bgcolor: "primary.main" ,
        width: 72, 
        height: 72
    },
    pageHeadingBoxTitle: {
        color: 'primary.main',
        fontWeight: '600'
    },
    pageHeadingBoxSubtitle: {

    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    },
    imageOffice: {
        display: 'block',
        margin: 'auto',
        maxWidth: '100vh',
        maxHeight: '95vh',
        overflow: 'auto',
        padding: '10px'
    },
    iconWrapperBox: {
        paddingLeft: '30px',
        '&:hover': {
            filter: 'brightness(0.7)'
        }

    },
    iconOffice: {
        width: 72, 
        height: 72,
        objectFit: 'contain',
        cursor: 'pointer',
        paddingTop: '25%',
    }
};

const iconParkingMap = "/images/map_glass.png";

const PageHeadParking = (props) => {

    const [open, setOpen] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const setImage = (img) => setImageSrc(img);
    const maps = props.map.split(",");

    return (  
            <Box>
            <Box sx ={styles.pageHeadingBox}> 
                <Avatar sx={styles.pageHeadingAvatar} variant="rounded">
                {props.avatar}
                </Avatar>
                <Box sx={{marginLeft: '1%'}}>
                    <Typography variant='h4' sx={styles.pageHeadingBoxTitle}>{props.title}</Typography>
                    <Typography variant='subtitle1' sx={styles.pageHeadingBoxSubtitle}>
                    {props.subtitle} 
                    </Typography>
                </Box>
                {props.map && maps.map((image) => (
                <Box sx={styles.iconWrapperBox} onClick={() => {setImage(image); handleOpen();}}>
                    <img style={styles.iconOffice} src={iconParkingMap} alt="office map icon"></img>
                </Box>
                ))}
            </Box>
            {props.map &&
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-description"
                open={open}
                onClose={() => {handleClose(); setImage(null)}}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={styles.modal}>
                        <img style={styles.imageOffice} src={imageSrc} alt="office map"></img>
                    </Box>
                </Fade>
            </Modal>
            }
        </Box>
     );
}
 
export default PageHeadParking;