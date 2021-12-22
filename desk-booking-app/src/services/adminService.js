import axiosService from './axiosService';

export async function setOfficeAvailable(officeName) {

    try {
        const reqData = {
            name: `${officeName}`
        }
     //   console.log(officeName);
        const res = await axiosService.post(`/admin/activate/offices`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR ENABLING OFFICE", error);
    }

}


export async function setOfficeNotAvailable(officeName) {

    try {
        const reqData = {
            name: `${officeName}`
        }
     //   console.log(officeName);
        const res = await axiosService.post(`/admin/disable/offices`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING OFFICE", error);
    }

}

export async function createNewOffice(officeName ,workingUnit, available) {

    try {
        const reqData = {
            name: `${officeName}`,
            workingUnit: workingUnit,
            available: available

        }
    //    console.log(officeName);
        const res = await axiosService.post(`/admin/add/offices`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR CREATING OFFICE", error);
    }

}

export async function removeOffice(officeName) {

    try {
        const reqData = {
            name: `${officeName}`,
        }
      //  console.log(officeName);
        const res = await axiosService.post(`/admin/remove/offices`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR REMOVING OFFICE", error);
    }

}

export async function setDeskAvailable(deskName) {

    try {
        const reqData = {
            name: `${deskName}`
        }
     //   console.log(deskName);
        const res = await axiosService.post(`/admin/activate/desks`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR ENABLING DESK", error);
    }

}


export async function setDeskNotAvailable(deskName) {

    try {
        const reqData = {
            name: `${deskName}`
        }
     //   console.log(deskName);
        const res = await axiosService.post(`/admin/disable/desks`, reqData);
        const {data} =res;
    //    console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING DESK", error);
    }

}

export async function createNewDesk(deskName , office, available) {

    try {
        const reqData = {
            name: `${deskName}`,
            office: office,
            available: available

        }
     //   console.log(deskName);
        const res = await axiosService.post(`/admin/add/desks`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR ADDING DESK", error);
    }

}

export async function removeDesk(deskName) {

    try {
        const reqData = {
            name: `${deskName}`,
        }
      //  console.log(deskName);
        const res = await axiosService.post(`/admin/remove/desks`, reqData);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR REMOVING DESK", error);
    }

}

export async function setParkingAvailable(parkingName) {

    try {
        const reqData = {
            name: `${parkingName}`
        }
    //    console.log(parkingName);
        const res = await axiosService.post(`/admin/activate/parking`, reqData);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR ENABLING PARKING", error);
    }

}

export async function setParkingNotAvailable(parkingName) {

    try {
        const reqData = {
            name: `${parkingName}`
        }
     //   console.log(parkingName);
        const res = await axiosService.post(`/admin/disable/parking`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING DESK", error);
    }

}

export async function createNewParking(parkingName , workingUnit, available) {

    try {
        const reqData = {
            name: `${parkingName}`,
            workingUnit: workingUnit,
            available: available

        }
      //  console.log(parkingName);
        const res = await axiosService.post(`/admin/add/parking`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR ADDING PARKING", error);
    }

}

export async function removeParking(parkingName) {

    try {
        const reqData = {
            name: `${parkingName}`,
        }
      //  console.log(parkingName);
        const res = await axiosService.post(`/admin/remove/parking`, reqData);
        const {data} =res;
   //     console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR REMOVING PARKING", error);
    }

}

export async function setUserActive(username) {

    try {
        const reqData = {
            username: username
        }
      //  console.log(username);
        const res = await axiosService.post(`/admin/activate/users`, reqData);
        const {data} =res;
    //    console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR ENABLING USER", error);
    }

}


export async function setUserInactive(username) {

    try {
        const reqData = {
            username: username
        }
   //     console.log(username);
        const res = await axiosService.post(`/admin/disable/users`, reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING USER", error);
    }

}


export async function getGeneralAnalytics(timeFrame) {

    try {
        const reqData = {
            dateLength: timeFrame
        }
      //  console.log(reqData);
        const res = await axiosService.post(`/admin/anaylitic/schedules`, reqData);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING USER", error);
    }

}

export async function getOfficeAnalytics(timeFrame) {

    try {
        const reqData = {
            dateLength: timeFrame
        }
      //  console.log(reqData);
        const res = await axiosService.post(`/admin/anaylitic/offices`, reqData);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING USER", error);
    }

}


export async function getDeskAnalytics(timeFrame) {

    try {
        const reqData = {
            dateLength: timeFrame
        }
      //  console.log(reqData);
        const res = await axiosService.post(`/admin/anaylitic/desks`, reqData);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING USER", error);
    }

}

export async function getTopDeskAnalytics(timeFrame) {

    try {
        const reqData = {
            dateLength: timeFrame
        }
     //   console.log(reqData);
        const res = await axiosService.post(`/admin/anaylitic/top/desks`, reqData);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING USER", error);
    }

}

export async function getTopOfficeAnalytics(timeFrame) {

    try {
        const reqData = {
            dateLength: timeFrame
        }
      //  console.log(reqData);
        const res = await axiosService.post(`/admin/anaylitic/top/offices`, reqData);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING USER", error);
    }

}


export async function getParkingAnalytics(timeFrame) {

    try {
        const reqData = {
            dateLength: timeFrame
        }
       // console.log(reqData);
        const res = await axiosService.post(`/admin/anaylitic/parking`, reqData);
        const {data} =res;
       // console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR DISABLING USER", error);
    }

}