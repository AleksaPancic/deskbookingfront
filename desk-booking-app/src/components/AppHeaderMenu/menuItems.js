
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

export const menuItems = {
    itemsList: [
        {
            id: 0,
            adminOption: false,
            urlFragment: "/",
            icon: (<HomeIcon/>),
            itemText: "Home",
            suboptions: false
        },
        {
            id: 1,
            adminOption: true,
            urlFragment: "/analytics",
            icon: (<AnalyticsIcon/>),
            itemText: "Analytics",
            suboptions: false
        },
        {
            id: 2,
            adminOption: false,
            urlFragment: '/booking',
            icon: (<DesktopMacIcon/>),
            itemText: "Booking",
            suboptions: true

        },
        {
            id: 3,
            adminOption: false,
            urlFragment: "/users",
            icon: (<PeopleIcon/>),
            itemText: "Users",
            suboptions: false
        },
        {
            id: 4,
            adminOption: false,
            urlFragment: "/parking",
            icon :(<LocalParkingIcon/>),
            itemText: "Parking",
            suboptions: true
        },
    ]

    
}