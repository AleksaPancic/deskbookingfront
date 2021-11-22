import { Box } from '@mui/system';
import './Users.css';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PageHead from '../PageHead/PageHead';

const styles = {
    pageHeadingUsersIcon: {
        fontSize: '48px',
        color: 'white',
        
    },
}


const Users = () => {

    return ( 
        <PageHead avatar={(<PeopleAltTwoToneIcon sx={styles.pageHeadingUsersIcon} />)} 
        title="Our Users" 
        subtitle="See all our users!"/>
     );
}
 
export default Users;