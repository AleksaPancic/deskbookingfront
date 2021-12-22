import { Box } from "@mui/system";
import "./Home.css";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import PageHead from "../PageHead/PageHead";
import { useEffect, useState } from "react";
import moment from "moment";
import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import React from "react";
import { disabledHomeSchedule, getHomeSchedule } from "../../services/homeService";
import { useUserContext } from "../../UserContext";



const styles = {
  pageHeadingHomeIcon: {
    fontSize: "48px",
    color: "white",
  },
  cardStyle: {
    marginTop: '2%',
    maxWidth: '500px',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'primary.main'
  },
  titleTypographyStyle: {
    fontWeight: 'bold'
  },
  deskTypographyStyle: {
    fontWeight: 'bold'
  },
  deleteButton: {
    fontWeight: 'bold'
  }
};

const Home = () => {
  const [myBookings, setMyBookings] = useState(null);
  const {user} = useUserContext();


  useEffect(() => {
    if(user.username){
    getHomeSchedule(user.username)
      .then((res => {
        setMyBookings(res);
      }))
    }
    
  }, [user.username]);

  function handleRemove(id) {
    disabledHomeSchedule(id)
      .then(res => {
        getHomeSchedule(user.username)
        .then((res => {
        console.log(res);
        setMyBookings(res);
      }))}
      )
  }

  return (
    <>
       <PageHead
        avatar={<HomeTwoToneIcon sx={styles.pageHeadingHomeIcon} />}
        title="Home"
        subtitle="Here you can see all your bookings!"
      />
      <Box>
        {myBookings && myBookings.map((item) => (
          <Card key={item.id}  sx={styles.cardStyle} elevation={3}>
            <CardContent>
                <Typography variant="h5" sx={styles.titleTypographyStyle} color="primary.main">
                  {item.workingUnitName + " - "+ item.officeName} 
                </Typography>
              <Typography variant="body1"  sx={styles.deskTypographyStyle} color="secondary.main">
                {item.deskName}
              </Typography>
              <Typography variant="body1"  sx={styles.dateStyle} >
                {moment(item.dateFrom).format("D MMM YYYY")+ " from " + moment(item.dateFrom).format("HH:mm") + " to "+ moment(item.dateTo).format("HH:mm")}
              </Typography>
            </CardContent>
            {!(moment(item.dateFrom) < moment()) &&
            <CardActions>
              <Button
              sx={styles.deleteButton}
              variant="outlined"
                color="error"
                onClick={() => handleRemove(item.id)}
              >
                CANCEL
              </Button>
            </CardActions>
}
          </Card>
          
        ))}
        </Box>
    </>
  );
};

export default Home;
