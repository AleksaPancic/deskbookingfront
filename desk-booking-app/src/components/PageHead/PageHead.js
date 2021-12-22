import { Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import './PageHead.css';


const styles = {
    pageHeadingBox: {
        display: 'flex'
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

    }

}

const PageHead = (props) => {

    return ( 
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
        </Box>
     );
}
 
export default PageHead;