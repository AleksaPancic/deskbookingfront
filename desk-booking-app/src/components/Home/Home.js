import { Box } from '@mui/system';
import './Home.css';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PageHead from '../PageHead/PageHead';
import { useEffect, useState } from 'react';
import moment from 'moment';


const styles = {
  pageHeadingHomeIcon: {
    fontSize: "48px",
    color: "white",
  },
};

const bookingList = {
  bookings: [
    {
      id: 0,
      workingUnit: 'Nis office',
      office: 'ExLibris',
      desk: 'desk 7',
      dateFrom: moment().toDate(),
      dateTo: moment(26, "DD").toDate()

    },
    {
      id: 1,
      workingUnit: 'Nis office',
      office: 'ExLibris',
      desk: 'desk 7',
      dateFrom: moment().toDate(),
      dateTo: moment(29, "DD").toDate()

    }
  ]
}

const Home = () => {
    const [myBookings, setMyBookings] = useState(null);

    useEffect(() => {
      setMyBookings(bookingList.bookings)

    },[])

    return (
      <PageHead
        avatar={<HomeTwoToneIcon sx={styles.pageHeadingHomeIcon} />}
        title="My Bookings"
        subtitle="See your bookings, and cancel the ones you cannot make to!"
      />
    );
}
 
export default Home;