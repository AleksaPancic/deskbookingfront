import * as React from 'react';
import './AppHeaderMenu.css';
import {Box ,Drawer, AppBar,CssBaseline,Toolbar, List, ListItemIcon, ListItemText , Button, ListItemButton, Divider, Typography, IconButton, Collapse} from '@mui/material';
import AppLogoWhite from '../../assets/deskbookingWhite.png'
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router';
import { useState , useEffect} from 'react';
import LetterAvatar from 'lettered-avatar';
import AnchorMenu from '../AnchorMenu/AnchorMenu';
import {menuItems} from './menuItems';
import UserProvider, { useUserContext } from '../../UserContext';
import jwtDecode from 'jwt-decode';
import { currentUser } from '../../services/userService';

const drawerWidth = 240;

const styles = {
    appBar: {
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        paddingTop: '7px',
        paddingBottom: '7px',    
        
    },
    drawerStyle : {
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        display: { xs: 'none', md: 'block' },
    },
    mobileDrawerStyle: {
      zIndex: (theme) => theme.zIndex.drawer + 1,
      display: { xs: "block", md: "none" , },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
      },
    },
    toolbarStyle: {
        display: 'flex',
        justifyContent: 'space-between'

    },
    appBarButtonStyle : {
        color: 'white',
    },
    listItemStyle:{
        '&:hover' :{
            color: 'primary.main', 
        },

    },
    subitemListItemStyle: {
      pl: 4,
      '&:hover' :{
        color: 'primary.main', 
    },
    },
    listItemStyleSelected: {
      color: 'primary.main',
    },
    subitemListItemStyleSelected: {
      color: 'primary.main',
      pl: 4
    },
    listIconColorStyle : {
      color: '#121212'
    },
    listItemTypographyStyle: {
      fontWeight: '600',
    },
    appLogoStyleBox: {
        '&:hover' :{
            cursor: 'pointer',
        },
      },
      welcomeTitleStyle: {
        marginTop: '2%',
        fontWeight: 'bold',
        color: 'primary.main',
        padding: '5%',
      },

    drawerNameStyle: {
      fontWeight: 'bold',
      color: 'primary.main',
      marginLeft: '10%',
      marginTop: '10%'
  },
  drawerUsernameStyle: {
    fontWeight: 'bold',
    marginLeft: '10%',
},
drawerProfileInfoBox: {
  display: 'flex', 
  flexDirection: 'column',
  '&:hover' :{
    cursor: 'pointer',
},}
}


const AppHeaderMenu = (props) => {

    const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedListButton, setSelectedListButton] = useState(0);
    const [selectedSublistButton, setSelectedSublistButton] = useState(-1);
    const [anchorMenuEl, setAnchorMenuEl] = useState(null);
    const [openSubOptions, setOpenSubOptions] = useState(false);
    const { window } = props;

    const [user, setUser] = useState({});
    const value = {user, setUser};
    
    //const {user, setUser} = useUserContext();

    const isMenuOpen = Boolean(anchorMenuEl);
    const menuId = 'primary-anchor-account-menu';
    const drawerContainer = window !== undefined ? () => window().document.body : undefined;

    const handleMobileDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    }

    const handleAnchorMenuOpen = (event) => {
      setAnchorMenuEl(event.currentTarget);
    };

    const handleAnchorMenuClose = () => {
      setAnchorMenuEl(null);
    };

    const handleSuboptionExpand = (id) => {
      setSelectedListButton(id);
      setOpenSubOptions(!openSubOptions);
    }

    const handleMenuItemButtonClick = (id, urlFragment) => {
      setSelectedSublistButton(-1);
      setSelectedListButton(id);
      history.push(urlFragment);
    }

    const handleSubmenuItemButtonClick = (id, urlFragment) => {
      setSelectedSublistButton(id);
      history.push(urlFragment);
    }


  useEffect(() => {
    currentUser()
    .then((res) => {
      console.log(res);
      setUser(res);
    }).catch((error) => {
      console.log(error);
    })
    
    },[])


    const drawer = (
      <Box sx={{ overflow: "auto", marginTop: "16px" }}>
        <Box onClick={() => history.push('/profile')} sx={styles.drawerProfileInfoBox}>
        <Typography sx={styles.drawerNameStyle} variant="h5">
          {user.firstName +" "+ user.lastName}
        </Typography>
        <Typography sx={styles.drawerUsernameStyle} variant="subtitle1">
          {user.username}
        </Typography>
        </Box>
        <Divider variant="middle" />
        <List sx={{ marginTop: "8px" }} onClick={() => setMobileOpen(false)}>
          {menuItems.itemsList.map((item) => (
            <React.Fragment key={item.itemText}>
              <ListItemButton
                key={item.itemText}
                selected={selectedListButton === item.id}
                className="list-item-drawer"
                sx={
                  selectedListButton === item.id
                    ? styles.listItemStyleSelected
                    : styles.listItemStyle
                }
                onClick={() => {
                  item.suboptions
                    ? handleSuboptionExpand(item.id)
                    : handleMenuItemButtonClick(item.id, item.urlFragment);
                }}
              >
                <ListItemIcon
                  sx={
                    selectedListButton === item.id
                      ? styles.listItemStyleSelected
                      : styles.listIconColorStyle
                  }
                  className="list-item-drawer-icon"
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={styles.listItemTypographyStyle}
                  primary={item.itemText}
                />
                {item.suboptions &&
                  (openSubOptions ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {item.suboptions &&
                  (<Collapse in={openSubOptions} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.suboptions.map((subitem) => (
                      <ListItemButton key={subitem.subitemText}  
                      onClick={() => handleSubmenuItemButtonClick(subitem.subitemId, subitem.subitemUrlFragment)}
                      sx={
                        selectedSublistButton === subitem.subitemId
                          ? styles.subitemListItemStyleSelected
                          : styles.subitemListItemStyle
                      }>
                        <ListItemText
                          primary={subitem.subitemText}
                          primaryTypographyProps={
                            styles.listItemTypographyStyle
                          }
                        />
                      </ListItemButton>
                      ))}     
                    </List>
                  </Collapse>
                )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    );

    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={styles.appBar}>
          <Toolbar sx={styles.toolbarStyle}>
            <Box
              sx={styles.appLogoStyleBox}
              onClick={() => {
                setSelectedListButton(0);
                history.push("/");
              }}
            >
              <img
                src={AppLogoWhite}
                alt="deskbooking"
                className="app-logo-white"
              />
            </Box>
            <Box sx={{display: 'flex'}}>
            <Button
              sx={styles.appBarButtonStyle}
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleAnchorMenuOpen}
            >
              <LetterAvatar
                name={user.firstName +" "+ user.lastName}
                options={{
                  twoLetter: true,
                  size: 42,
                }}
              />
              <KeyboardArrowDownIcon />
            </Button>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleMobileDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            </Box>
          </Toolbar>
          {
            <AnchorMenu
              anchorMenuEl={anchorMenuEl}
              handleAnchorMenuClose={() => handleAnchorMenuClose()}
              logOut={() => props.logOut()}
              isMenuOpen={isMenuOpen}
              menuId={menuId}
              user = {user}
            />
          }
        </AppBar>
        <Drawer variant="permanent" sx={styles.drawerStyle} open>
          <Toolbar />
          {drawer}
        </Drawer>
        <Drawer
          container={drawerContainer}
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={styles.mobileDrawerStyle}
        >
          {drawer}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "16px" }}>
          <Toolbar />
          <UserProvider value={value}>
          {props.contentComponents}
          </UserProvider>
        </Box>
      </Box>
    );
}
 
export default AppHeaderMenu;



