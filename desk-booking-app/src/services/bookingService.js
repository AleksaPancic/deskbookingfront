import axiosService from './axiosService';


export async function getAllUnits() {

    try {
        const res = await axiosService.get("/booking");
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LOGIN ERROR", error);
    }

}

export async function getUnitOffices(workinUnitName) {
    let cityName = workinUnitName.replace(' Office','');
    try {
        const res = await axiosService.get(`/booking/${cityName}`);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LOGIN ERROR", error);
    }

}

export async function getOfficeDesks(officeID, city) {

    try {
        const res = await axiosService.get(`/booking/${city}/${officeID}`);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LOGIN ERROR", error);
    }

}


export async function getDeskSchedules(deskName) {

    try {
        const reqData = {
            deskName: deskName,
        }
        const res = await axiosService.post(`/booking/schedules`, reqData);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LIMITED SCHEDULE ERROR", error);
    }
}


export async function createNewEvent(event) {

    try {
        const res = await axiosService.post(`/booking/reservation`, event);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LIMITED SCHEDULE ERROR", error);
    }

}

export async function deleteEvent(id) {
    let event = {
        id: id
    }
    try {
        const res = await axiosService.post(`/booking/disable`, event);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LIMITED SCHEDULE ERROR", error);
    }

}