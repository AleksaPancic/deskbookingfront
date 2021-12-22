import { Box } from "@mui/system";
import "./Users.css";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PageHead from "../PageHead/PageHead";
import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Pagination,
  ListItemAvatar,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
import { getNumOfUsers, getUserList } from "../../services/userService";
import LetterAvatar from "lettered-avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import { setUserActive, setUserInactive } from "../../services/adminService";
import { useUserContext } from "../../UserContext";

const styles = {
  pageHeadingUsersIcon: {
    fontSize: "48px",
    color: "white",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  fullName: {
    textAlign: "center",
    color: "primary.main",
    fontWeight: "600",
  },
  fieldBox: {
    marginTop: "5%",
  },
  fieldText: {
    fontWeight: "600",
  },
  userStyleActive: {
    display: "flex",
  },
  userStyleInactive: {
    display: "flex",
    opacity: "0.4",
  },
};

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [settingsForUser, setSettingsForUser] = useState(null);
  const { user } = useUserContext();

  const selectUser = (user) => setSelectedUser(user);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, value) => {
    setPaginationPage(value);
    setPage(value - 1);
  };

  const [anchorSettings, setAnchorSettings] = useState(null);

  const handleCloseSettings = () => {
    setAnchorSettings(null);
  };
  const handleOpenSettings = (event,user) => {
    setSettingsForUser(user);
    setAnchorSettings(event.currentTarget);
  };

  const handleEventUserActive = (user) => {
    console.log(user.userActive);
    if (user.userActive) {
      setUserInactive(user.username).then((res) => {
        getUserList(page).then((res) => {
          setUserList(res);
        });
      });
    } else {
      setUserActive(user.username).then((res) => {
        getUserList(page).then((res) => setUserList(res));
      });
    }
  };

  useEffect(() => {
    getNumOfUsers()
      .then((res) => {
        setNumOfPage(Math.round(res / 5));
      })
      .catch((error) => {
        console.log(error);
      });

    getUserList(page)
      .then((res) => {
        setUserList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <Box>
      <PageHead
        avatar={<PeopleAltTwoToneIcon sx={styles.pageHeadingUsersIcon} />}
        title="Our Users"
        subtitle="See all our users!"
      />

      <Box>
        <List>
          {userList.length > 0 &&
            userList.map((userItem) => (
              <Box
                key={userItem.username}
                sx={
                  userItem.userActive
                    ? styles.userStyleActive
                    : styles.userStyleInactive
                }
              >
                <ListItem
                  button
                  onClick={() => {
                    selectUser(userItem);
                    handleOpen();
                  }}
                >
                  <ListItemAvatar>
                    <Box sx={styles.avatarWrapper}>
                      <LetterAvatar
                        name={userItem.firstName + " " + userItem.lastName}
                        options={{
                          shape: "square",
                          twoLetter: true,
                          size: 50,
                        }}
                      />
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={userItem.firstName + " " + userItem.lastName}
                  />
                </ListItem>
                {user.roles.find(role => (role.id === 2 || role.id === 3)) &&
                  user.id !== userItem.id && (
                    <Box>
                      <Fab
                        sx={{
                          color: "white",
                          backgroundColor: "success.main",
                          marginTop: "4%",
                          "&:hover": { filter: "brightness(0.9)" },
                        }}
                        size="small"
                        onClick={(event) => handleOpenSettings(event, userItem)}
                      >
                        <SettingsIcon />
                      </Fab>
                    </Box>
                  )}
              </Box>
            ))}
        </List>
        {settingsForUser && 
        <Menu
          id="menu-settings"
          anchorEl={anchorSettings}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorSettings)}
          onClose={handleCloseSettings}
        >
           {settingsForUser.userActive ? (
            <MenuItem
              onClick={() => {
                handleEventUserActive(settingsForUser);
                handleCloseSettings();
              }}
            >
              Disable
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                handleEventUserActive(settingsForUser);
                handleCloseSettings();
              }}
            >
              Enable
            </MenuItem>
          )}
        </Menu>
        }
      </Box>
      <Box>
        <Stack spacing={2}>
          <Pagination
            page={paginationPage}
            onChange={handleChange}
            count={numOfPage}
            color="primary"
          />
        </Stack>
      </Box>
      {selectedUser && (
        <Modal
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={styles.modal}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={styles.fullName}
              >
                {selectedUser.firstName} {selectedUser.lastName}
              </Typography>
              <Box sx={styles.fieldBox}>
                <Typography variant="subtitle2">E-mail:</Typography>
                <Typography variant="h6" sx={styles.fieldText}>
                  {selectedUser.email}
                </Typography>
              </Box>
              <Box sx={styles.fieldBox}>
                <Typography variant="subtitle2">Telephone:</Typography>
                <Typography variant="h6" sx={styles.fieldText}>
                  {selectedUser.telephone}
                </Typography>
              </Box>
              {selectedUser.workingUnit && (
                <Box sx={styles.fieldBox}>
                  <Typography variant="subtitle2">Office:</Typography>
                  <Typography variant="h6" sx={styles.fieldText}>
                    {selectedUser.workingUnit.unitName}
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
      )}
    </Box>
  );
};

export default Users;
