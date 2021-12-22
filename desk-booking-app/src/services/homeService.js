import axiosService from './axiosService';


export async function getHomeSchedule(data) {
    let reqData = {
        user: data
    }
    try {
        const res = await axiosService.post("/schedule", reqData);
        const {data} =res;
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("SCHEDULE ERROR", error);
    }

}

export async function getLimitedHomeSchedule(reqData) {

    try {
        const res = await axiosService.post("/schedule/limited", reqData);
        const {data} =res;
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LIMITED SCHEDULE ERROR", error);
    }

}

export async function disabledHomeSchedule(id) {

    let reqData = {
        id: id
    }
    try {
        const res = await axiosService.post("/schedule/disable", reqData);
        const {data} =res;
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("DISABLED SCHEDULE ERROR", error);
    }

}
