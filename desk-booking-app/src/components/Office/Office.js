import React, { useState, useEffect } from "react";
import "./Office.css";
import {
  Box,
  Typography,
  Paper,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
import PageHead from "../PageHead/PageHead";
import { useUserContext } from "../../UserContext";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import DeskCard from "../DeskCard/DeskCard";
import AddIcon from "@mui/icons-material/Add";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import EventPopover from "../EventPopover/EventPopover";
import CreateEventPopover from "../CreateEventPopover/CreateEventPopover";
import { getOfficeDesks , getDeskSchedules, createNewEvent, deleteEvent} from "../../services/bookingService";
import { useHistory, useParams } from "react-router";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AddDeskPopover from "../AddDeskPopover/AddDeskPopover";
import { setDeskAvailable, setDeskNotAvailable, createNewDesk, removeDesk } from "../../services/adminService";

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

const Office = () => {
  const history = useHistory();
  const localizer = momentLocalizer(moment);
  const [selectedDesk, setSelectedDesk] = useState(-1);
  const [desks, setDesks] = useState(null);
  const [events, setEvents] = useState(null);
  const [anchorEventPopover, setAnchorEventPopover] = useState(null);
  const [anchorCreatePopover, setAnchorCreatePopover] = useState(null);
  const [anchorDeskPopover, setAnchorDeskPopover] = useState(null);
  const [selectedEventUserId, setSelectedEventUserId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useUserContext();
  const [anchorSettings, setAnchorSettings] = useState(null);
  const [selectedDeskSettings, setSelectedDeskSettings] = useState(null);

  const {city,office} = useParams();

  const openEventPopover = Boolean(anchorEventPopover);
  const eventPopoverID = openEventPopover ? "event-popover" : undefined;

  const openCreatePopover = Boolean(anchorCreatePopover);
  const createPopoverID = openCreatePopover ? "create-popover" : undefined;
  
  const openDeskPopover = Boolean(anchorDeskPopover);
  const deskPopoverID = openDeskPopover ? "add-desk-popover" : undefined;

  const currentOffice = history.location.state.detail;

  useEffect(() => {
    getOfficeDesks(office, city)
    .then((res) => {
      console.log(res);
      setDesks(res);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const handleSelectDeskChange = (avaliable, id) => {
    if (avaliable){
    setSelectedDesk(id);
    let desk = desks.find(desk => desk.id === id)
    getDeskSchedules(desk.name)
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
    deleteEvent(id)
    .then(res => {
      let desk = desks.find(desk => desk.id === selectedDesk)
      getDeskSchedules(desk.name)
      .then(res => {
        setEvents(parseEvents(res));
      })
      })
  };

  const handleSelectSettings = (event, desk) => {
    setSelectedDeskSettings(desk);
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
    createNewEvent(event)
    .then(res => {
      let desk = desks.find(desk => desk.id === selectedDesk)
      getDeskSchedules(desk.name)
      .then(res => {
        setEvents(parseEvents(res));
      })
      }
    )}
  
    const handleAddButtonClick = (e) => {
      setAnchorDeskPopover(e.currentTarget);
    };
  
    const handleAddDeskClose = () => {
      setAnchorDeskPopover(null);
    };

  
    const handleEventAddDesk = (name) => {
      createNewDesk(name, currentOffice , true)
      .then(res => {
        getOfficeDesks(office, city)
          .then(res =>
            setDesks(res)
          )
      })
    };

    const handleEventDeskAvailable = (status) => {
      if(status){
        setDeskNotAvailable(selectedDeskSettings.name)
        .then(res => {
          getOfficeDesks(office, city)
            .then(res => {
              setDesks(res);
              console.log(res);
            })
        })
      }
      else {
        setDeskAvailable(selectedDeskSettings.name)
          .then(res => {
            getOfficeDesks(office, city)
              .then(res =>
                setDesks(res)
              )
          })
      }
  };

  const handleEventRemoveDesk = (deskName) => {
    removeDesk(deskName)
    .then(res => {
      getOfficeDesks(office, city)
        .then(res =>
          setDesks(res)
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
    getOfficeDesks(office, city)
      .then((res) => {
        setDesks(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [office]);

  return (
    <Box>
      <PageHead
        avatar={<DesktopMacIcon sx={styles.pageHeadingOfficeIcon} />}
        title={currentOffice.name}
        subtitle={currentOffice.workingUnit.unitName}
      />
      <Box sx={styles.selectWrapper}>
        {desks &&
        <>
          {desks.map((desk) => (
            <Box key={desk.name} sx={{display: 'flex', flexDirection: 'column'}}>
            <DeskCard
              selectedDeskId={selectedDesk}
              handleSelect={(available, id) =>
                handleSelectDeskChange(available, id)
              }
              desk={desk}
              icon={<DesktopMacIcon sx={styles.iconStyle}/>}
            />

            {user.roles.find(role => (role.id === 2 || role.id === 3)) && 
                <SettingsIcon  sx={{color: 'success.main', '&:hover': {filter: "brightness(0.9)"}, marginLeft: '30%'}} size="small" onClick={(event) => handleSelectSettings(event, desk)}/>
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
              { selectedDeskSettings && 
              (selectedDeskSettings.available ? 
              <MenuItem onClick={() => {
                handleEventDeskAvailable(selectedDeskSettings.available);
                handleCloseSettings();
              }}>Disable</MenuItem>
              : 
              <MenuItem onClick={() => {
                handleEventDeskAvailable(selectedDeskSettings.available);
                handleCloseSettings();
              }}>Enable</MenuItem>
              )}
              <MenuItem onClick={() => {
                handleEventRemoveDesk(selectedDeskSettings.name);
                handleCloseSettings();
                }}>Remove</MenuItem>
            </Menu>
          
          {user.roles.find(role => (role.id === 2 || role.id === 3)) && 
          <>
          <AddCircleOutlineIcon onClick={(e) => handleAddButtonClick(e)} sx={{color: 'success.main', marginTop: '3%', '&:hover': {filter: "brightness(0.9)"}}} size="small" />
            
          <AddDeskPopover
              deskPopoverID={deskPopoverID}
              openDeskPopover={openDeskPopover}
              anchorDeskPopover={anchorDeskPopover}
              handleAddDeskClose={() => handleAddDeskClose()}
              handleEventAddDesk={(deskName) =>
                handleEventAddDesk(deskName)
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
        {selectedDesk === -1 && (
          <Typography
            variant="h4"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            Select a desk!
          </Typography>
        )}
        {selectedDesk !== -1 && (
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
          selectedDesk ={desks ? desks.find(desk => desk.id === selectedDesk) : null}
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

export default Office;
