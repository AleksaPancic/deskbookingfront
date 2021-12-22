import axiosService from './axiosService';

export async function getParkings(city) {

    try {
        const res = await axiosService.get(`/booking/parking/${city}`);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("GET PARKINGS ERROR", error);
    }

}

export async function getParkingSchedules(parkingName) {

    try {
        const reqData = {
            parkingName: parkingName,
        }
        const res = await axiosService.post(`/booking/parking/schedules`, reqData);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("GET PARKING SCHEDULE ERROR", error);
    }

}

export async function createNewReservation(event) {

    try {
      //  console.log(event);
        const res = await axiosService.post(`/booking/parking/reservation`, event);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("PARKING RESERVATION ERROR", error);
    }

}

export async function deleteReservation(id) {

    let event = {
        id: id
    }
    try {
        const res = await axiosService.post(`/booking/parking/disable`, event);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("PARKING DELETE ERROR", error);
    }

}