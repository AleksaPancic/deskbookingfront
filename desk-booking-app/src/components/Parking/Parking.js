import React, { useState, useEffect } from "react";
import "./Parking.css";
import {
  Box,
  Typography,
  Paper,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
//import PageHead from "../PageHead/PageHead";
import { useUserContext } from "../../UserContext";
import DeskCard from "../DeskCard/DeskCard";
import AddIcon from "@mui/icons-material/Add";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import EventPopover from "../EventPopover/EventPopover";
import CreateEventPopover from "../CreateEventPopover/CreateEventPopover";
import { getParkings, getParkingSchedules, createNewReservation, deleteReservation} from "../../services/parkingService";
import { useHistory, useParams } from "react-router";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AddDeskPopover from "../AddDeskPopover/AddDeskPopover";
import { setParkingAvailable, setParkingNotAvailable, createNewParking, removeParking } from "../../services/adminService";
import LocationCityTwoToneIcon from "@mui/icons-material/LocationCityTwoTone";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PageHeadParking from "../PageHead/PageHeadParking";

const styles = {
  pageHeadingOfficeIcon: {
    fontSize: "48px",
    color: "white",
  },
  selectWrapper: {
    minWidth: "150px",
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
  },
  contentWrapper: {
    marginTop: "2%",
  },
  calendarWrapper: {
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingBottom: "2%",
    paddingTop: "1%",
    height: "75%",
  },
  iconStyle: {
    height: '32px',
    width: '32px',
  },
};

const Parking = () => {
  const history = useHistory();
  const workinUnit = history.location.state.detail;
  const localizer = momentLocalizer(moment);
  const [selectedParking, setSelectedParking] = useState(-1);
  const [parkings, setParkings] = useState(null);
  const [events, setEvents] = useState(null);
  const [anchorEventPopover, setAnchorEventPopover] = useState(null);
  const [anchorCreatePopover, setAnchorCreatePopover] = useState(null);
  const [anchorParkingPopover, setAnchorParkingPopover] = useState(null);
  const [selectedEventUserId, setSelectedEventUserId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useUserContext();
  const [anchorSettings, setAnchorSettings] = useState(null);
  const [selectedParkingSettings, setSelectedDeskSettings] = useState(null);

  const {city,office} = useParams();

  const openEventPopover = Boolean(anchorEventPopover);
  const eventPopoverID = openEventPopover ? "event-popover" : undefined;

  const openCreatePopover = Boolean(anchorCreatePopover);
  const createPopoverID = openCreatePopover ? "create-popover" : undefined;
  
  const openDeskPopover = Boolean(anchorParkingPopover);
  const deskPopoverID = openDeskPopover ? "add-desk-popover" : undefined;

  useEffect(() => {
    getParkings(workinUnit.unitName)
    .then((res) => {
      console.log(res);
      setParkings(res);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const handleSelectParkingChange = (avaliable, id) => {
    if (avaliable){
    setSelectedParking(id);
    let parking = parkings.find(parking => parking.id === id)
    getParkingSchedules(parking.name)
    .then(res => {
      setEvents(parseEvents(res));
      console.log(res);
      console.log(parseEvents(res)+"eeeeee");
    })
    }
  };

  const parseEvents = (eventsArray) => {
    const newArr = [];
    eventsArray.map(event => {
      let parsedEvent = {
        id: event.id,
        title: `${event.user.firstName} ${event.user.lastName}`,
        start: moment(event.dateFrom).toDate(),
        end: moment(event.dateTo).toDate(),
        resource: {
            userID: event.user.id,
            user: event.user,
            desk: event.desk,
        }
      }
      newArr.push(parsedEvent);
    })
    return newArr;
  }

  const handleEventSelect = (event, e) => {
    setSelectedEvent(event);
    setSelectedEventUserId(event.resource.userID);
    setAnchorEventPopover(e.currentTarget);
  };

  const handleBookingButtonClick = (e) => {
    setAnchorCreatePopover(e.currentTarget);
  };

  const handleDeleteEvent = (id) => {
    deleteReservation(id)
    .then(res => {
      let desk = parkings.find(desk => desk.id === selectedParking)
      getParkingSchedules(desk.name)
      .then(res => {
        setEvents(parseEvents(res));
      })
      })
  };

  const handleSelectSettings = (event, parking) => {
    setSelectedDeskSettings(parking);
    setAnchorSettings(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setAnchorSettings(null);
  };

  const handleEventClose = () => {
    setAnchorEventPopover(null);
  };

  const handleCreateClose = () => {
    setAnchorCreatePopover(null);
  };

  const handleSetNewEvent =(event)=> {
    event.parkingName = event.deskName;
    delete event.deskName;

    createNewReservation(event)
    .then(res => {
      let parking = parkings.find(parking => parking.id === selectedParking)
      getParkingSchedules(parking.name)
      .then(res => {
        setEvents(parseEvents(res));
      })
      }
    )}
  
    const handleAddButtonClick = (e) => {
      setAnchorParkingPopover(e.currentTarget);
    };
  
    const handleAddParkingClose = () => {
      setAnchorParkingPopover(null);
    };

  
    const handleEventAddParking = (name) => {
      createNewParking(name, workinUnit, true)
      .then(res => {
        getParkings(workinUnit.unitName)
          .then(res =>
            setParkings(res)
          )
      })
    };

    const handleEventParkingAvailable = (status) => {
      if(status){
        setParkingNotAvailable(selectedParkingSettings.name)
        .then(res => {
          getParkings(workinUnit.unitName)
            .then(res => {
              setParkings(res);
              setSelectedParking(-1);
              console.log(res);
            })
        })
      }
      else {
        setParkingAvailable(selectedParkingSettings.name)
          .then(res => {
            getParkings(workinUnit.unitName)
              .then(res =>
                setParkings(res)
              )
          })
      }
  };

  const handleEventRemoveParking = (parkingName) => {
    removeParking(parkingName)
    .then(res => {
      getParkings(workinUnit.unitName)
        .then(res =>
          setParkings(res)
        )
    })
  };

  const customEventPropGetter = (event) => {
    if (event.resource.userID === user.id) {
      if (event.end > new Date())
        return {
          ariaDescribedby: { eventPopoverID },
          className: "user-event",
          style: {
            backgroundColor: "#21DA6C",
            border: "none",
          },
        };
      else
        return {
          ariaDescribedby: { eventPopoverID },
          className: "user-event-past",
          style: {
            backgroundColor: "#21DA6C",
            border: "none",
            filter: "brightness(0.8)",
          },
        };
    } else
      return {
        ariaDescribedby: { eventPopoverID },
        className: "current-user-event",
        style: {
          backgroundColor: "#279cce",
          border: "none",
        },
      };
  };

  useEffect(() => {
    getParkings(workinUnit.unitName)
      .then((res) => {
        setParkings(res);
        setSelectedParking(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workinUnit]);

  return (
    <Box>
      <PageHeadParking
        avatar={<LocationCityTwoToneIcon sx={styles.pageHeadingOfficeIcon} />}
        title={workinUnit.unitName}
        subtitle={workinUnit.unitAddress}
        map={workinUnit.parkingMap}
      />
      <Box sx={styles.selectWrapper}>
        {parkings &&
        <>
          {parkings.map((parking) => (
            <Box key={parking.name} sx={{display: 'flex', flexDirection: 'column'}}>
            <DeskCard
              selectedDeskId={selectedParking}
              handleSelect={(available, id) =>
                handleSelectParkingChange(available, id)
              }
              desk={parking}
              icon={<LocalParkingIcon sx={styles.iconStyle}/>}
            />

            {user.roles.find(role => (role.id === 2 || role.id === 3)) && 
                <SettingsIcon  sx={{color: 'success.main', '&:hover': {filter: "brightness(0.9)"}, marginLeft: '30%'}} size="small" onClick={(event) => handleSelectSettings(event, parking)}/>
            }
            </Box>
          ))}

          <Box sx={{ display: "flex", flexDirection: 'column', marginTop: '4%', marginLeft: '1%' }}> 
          {user.roles.find(role => (role.id === 2 || role.id === 3)) && 
          <>
          <Menu
              id="menu-settings"
              anchorEl={anchorSettings}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorSettings)}
              onClose={handleCloseSettings}
            >
              { selectedParkingSettings && 
              (selectedParkingSettings.available ? 
              <MenuItem onClick={() => {
                handleEventParkingAvailable(selectedParkingSettings.available);
                handleCloseSettings();
              }}>Disable</MenuItem>
              : 
              <MenuItem onClick={() => {
                handleEventParkingAvailable(selectedParkingSettings.available);
                handleCloseSettings();
              }}>Enable</MenuItem>
              )}
              <MenuItem onClick={() => {
                handleEventRemoveParking(selectedParkingSettings.name);
                handleCloseSettings();
                }}>Remove</MenuItem>
            </Menu>
          
          {user.roles.find(role => (role.id === 2 || role.id === 3)) && 
          <>
          <AddCircleOutlineIcon onClick={(e) => handleAddButtonClick(e)} sx={{color: 'success.main', marginTop: '3%', '&:hover': {filter: "brightness(0.9)"}}} size="small" />
            
          <AddDeskPopover
              deskPopoverID={deskPopoverID}
              openDeskPopover={openDeskPopover}
              anchorDeskPopover={anchorParkingPopover}
              handleAddDeskClose={() => handleAddParkingClose()}
              handleEventAddDesk={(parkingName) =>
                handleEventAddParking(parkingName)
              }
            />
          </>
          }
          </>
          }
          </Box>
          </>}
       
      
      </Box>
      
      
      <Box sx={styles.contentWrapper}>
        {selectedParking === -1 && (
          <Typography
            variant="h4"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            Select a parking space!
          </Typography>
        )}
        {selectedParking !== -1 && (
          <Paper sx={styles.calendarWrapper}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Fab
                onClick={(e) => handleBookingButtonClick(e)}
                aria-describedby={createPopoverID}
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
              >
                <AddIcon sx={{ mr: 1 }} />
                BOOKING
              </Fab>
            </Box>
            <Calendar
             
              events={events ? events : []}
              showMultiDayTimes
              defaultView="week"
              views={["week"]}
              localizer={localizer}
              onSelectEvent={(event, e) => handleEventSelect(event, e)}
              eventPropGetter={customEventPropGetter}
            />
          </Paper>
        )}
        <EventPopover
          event={selectedEvent}
          selectedEventEndDate={selectedEvent ? selectedEvent.end : new Date()}
          eventUserID={selectedEventUserId}
          currentUserID={user.id}
          currentUserRoles = {user.roles}
          eventPopoverID={eventPopoverID}
          openEventPopover={openEventPopover}
          anchorEventPopover={anchorEventPopover}
          handleEventClose={() => handleEventClose()}
          handleEventDelete={(id) => handleDeleteEvent(id)}
        />
        <CreateEventPopover
          currentUserUsername={user.username}
          selectedDesk ={parkings ? parkings.find(parking => parking.id === selectedParking) : null}
          currentUserID={user.id}
          currentUserName={`${user.firstName} ${user.lastName}`}
          allEvents={events}
          handleSetNewEvent={(event) => handleSetNewEvent(event)}
          createPopoverID={createPopoverID}
          openCreatePopover={openCreatePopover}
          anchorCreatePopover={anchorCreatePopover}
          handleCreateClose={() => handleCreateClose()}
          // handleEventDelete={(id) => handleDeleteEvent(id)}
        />
      </Box>
    </Box>
  );
};

export default Parking;
