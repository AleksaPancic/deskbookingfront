import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import { useHistory } from "react-router";
import PageHeadOffice from "../PageHead/PageHeadOffice";
import "./Booking.css";
import LocationCityTwoToneIcon from "@mui/icons-material/LocationCityTwoTone";
import React, { useState, useEffect } from "react";
import { getUnitOffices } from "../../services/bookingService";
import OfficeCard from "../OfficeCard/OfficeCard";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useUserContext } from "../../UserContext";
import AddOfficePopover from "../AddOfficePopover/AddOfficePopover";
import { setOfficeAvailable , setOfficeNotAvailable, createNewOffice, removeOffice} from "../../services/adminService";

const styles = {
  pageHeadingWorkingUnitIcon: {
    fontSize: "48px",
    color: "white",
  },
};

const Booking = () => {
  const history = useHistory();
  const workinUnit = history.location.state.detail;
  const [anchorSettings, setAnchorSettings] = useState(null);
  const { user } = useUserContext();
  const [officeList, setOfficeList] = useState(null);
  const [anchorOfficePopover, setAnchorOfficePopover] = useState(null);
  const [selectedSettingsOffice, setSelectedSettingsOffice] = useState(null);

  const openOfficePopover = Boolean(anchorOfficePopover);
  const officePopoverID = openOfficePopover ? "add-office-popover" : undefined;

  const handleCloseSettings = () => {
    setAnchorSettings(null);
  };

  const handleOpenSettings = (event, office) => {
    setSelectedSettingsOffice(office);
    setAnchorSettings(event.currentTarget);
  };


  const handleAddButtonClick = (e) => {
    setAnchorOfficePopover(e.currentTarget);
  };

  const handleAddOfficeClose = () => {
    setAnchorOfficePopover(null);
  };

  const handleEventAddOffice = (name) => {
    createNewOffice(name, workinUnit, true)
    .then(res => {
      getUnitOffices(workinUnit.unitName)
        .then(res =>
          setOfficeList(res)
        )
    })
  };

  const handleEventOfficeAvailable = (status) => {
      if(status){
        setOfficeNotAvailable(selectedSettingsOffice.name)
        .then(res => {
          getUnitOffices(workinUnit.unitName)
            .then(res =>
              setOfficeList(res)
            )
        })
      }
      else {
        setOfficeAvailable(selectedSettingsOffice.name)
          .then(res => {
            getUnitOffices(workinUnit.unitName)
              .then(res =>
                setOfficeList(res)
              )
          })
      }
  };


  const handleEventRemoveOffice = (officeName) => {
    removeOffice(officeName)
    .then(res => {
      getUnitOffices(workinUnit.unitName)
        .then(res =>
          setOfficeList(res)
        )
    })
  };


  useEffect(() => {
    getUnitOffices(workinUnit.unitName)
      .then((res) => {
        setOfficeList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workinUnit]);

  return (
    <Box>
      <PageHeadOffice
        avatar={
          <LocationCityTwoToneIcon sx={styles.pageHeadingWorkingUnitIcon} />
        }
        title={workinUnit.unitName}
        subtitle={workinUnit.unitAddress}
        map={workinUnit.map}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        {officeList &&
          officeList.map((office) => (
            <Box
              key={office.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: "2%",
                marginTop: "2%",
              }}
            >
              <OfficeCard
                key={office.id}
                handleClick={() =>
                  history.push(`/booking/${workinUnit.city}/${office.id}`, {detail: office})
                }
                office={office}
              />
              {user.roles.find(role => (role.id === 2 || role.id === 3)) && (
                <Box>
                  <IconButton
                    sx={{ 
                      color: "success.main", 
                      "&:hover": {
                        filter: 'brightness(0.7)'
                      }
                    }}
                    onClick={(event) => {
                      handleOpenSettings(event, office);
                    }}
                  >
                    <SettingsIcon sx = {{width:'32px', height: '32px'}} />
                  </IconButton>
                  </Box>
              )}
            </Box>
          ))}
        {user.roles.find(role => (role.id === 2 || role.id === 3)) && (
          <>
          <Box sx = {{paddingTop: '4%'}}>
            <IconButton
              onClick={(e) => handleAddButtonClick(e)}
              sx={{ 
                color: "success.main", 
                "&:hover": {
                  filter: 'brightness(0.7)'
                }
              }}
            >
              <AddCircleOutlineOutlinedIcon sx = {{height: '42px', width: '42px'}} />
            </IconButton>
            </Box>
            <AddOfficePopover
            
              officePopoverID={officePopoverID}
              openOfficePopover={openOfficePopover}
              anchorOfficePopover={anchorOfficePopover}
              handleAddOfficeClose={() => handleAddOfficeClose()}
              handleEventAddOffice={(officeName) =>
                handleEventAddOffice(officeName)
              }
            />
          </>
        )}
        {user.roles.find(role => (role.id === 2 || role.id === 3)) && (
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
            {selectedSettingsOffice && 
             (selectedSettingsOffice.available ?
              <MenuItem onClick={() => {
                handleEventOfficeAvailable(selectedSettingsOffice.available);
                handleCloseSettings();
              }}>Disable</MenuItem>
             : 
              <MenuItem onClick={() => {
                handleEventOfficeAvailable(selectedSettingsOffice.available);
                handleCloseSettings();
              }}>Enable</MenuItem>
            )}
            <MenuItem onClick={() => {
                handleEventRemoveOffice(selectedSettingsOffice.name);
                handleCloseSettings();
              }}>Remove</MenuItem>
          </Menu>
        )}
      </Box>
    </Box>
  );
};

export default Booking;
