import * as React from 'react';
import { Card , CardContent, CardActionArea, Typography } from '@mui/material';

const styles = {
    cardStyle: {
        minWidth: '250px',
        marginTop: '2%',
        marginBottom: '2%',
        marginRight: '2%',
        borderRadius: '8px',
  
        '&:hover': {
            filter: "brightness(0.9)"
        }
    },
    cardDisabledStyle: {
        minWidth: '250px',
        marginTop: '2%',
        marginBottom: '2%',
        marginRight: '2%',
        borderRadius: '8px',
        opacity: '0.3'

    },
    cardTitle: {
        fontWeight: 'bold'
    },
    captionTypograpyStyle: {
        fontWeight: 'bold',
        fontSize: '10px',
        opacity: '0.6'
    }
}



const OfficeCard = (props) => {

    const handleIfAvaliableClick = () => {
        if(props.office.available){
            props.handleClick()
        }
    }

    return (
      <Card onClick={() => handleIfAvaliableClick()} elevation={3} sx={props.office.available ? styles.cardStyle : styles.cardDisabledStyle}>
        <CardActionArea>
          <CardContent>
            <Typography sx={styles.cardTitle} variant="h4" color="primary.main" gutterBottom>
              {props.office.name}
            </Typography>
            <Typography sx={styles.captionTypograpyStyle} variant="caption" color="secondary.main" gutterBottom>
              CLICK TO OPEN
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}
 
export default OfficeCard;