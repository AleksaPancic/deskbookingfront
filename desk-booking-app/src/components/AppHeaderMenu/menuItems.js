
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

export const menuItems = {
    itemsList: [
        {
            id: 0,
            urlFragment: "/",
            icon: (<HomeIcon/>),
            itemText: "Home",
            suboptions: null
        },
        {
            id: 1,
            urlFragment: "/booking",
            icon: (<DesktopMacIcon/>),
            itemText: "Booking",
            suboptions: [
                {
                    subitemId: 0,
                    subitemUrlFragment: "/booking",
                    subitemText: "Nis",
                },
                {
                    subitemId: 1,
                    subitemUrlFragment: "/booking",
                    subitemText: "Belgrade",
                },
                {
                    subitemId: 2,
                    subitemUrlFragment: "/booking",
                    subitemText: "Kragujevac",
                }
            ]

        },
        {
            id: 2,
            urlFragment: "/users",
            icon: (<PeopleIcon/>),
            itemText: "Users",
            suboptions: null
        },
    ]

    
}