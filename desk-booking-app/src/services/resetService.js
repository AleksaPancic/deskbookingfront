import axiosService from './axiosService';


export async function resetRequest(reqData) {
    try {
        const res = await axiosService.post("/reset", reqData);
        const {data} =res;
     //   console.log(JSON.stringify(data))
        return Promise.resolve(data);

    }
    catch (error) {
        console.log("RESET PASSWORD ERROR", error);
    }
}

/*
export async function getPasswordRequest(reqData) {
    
    try {
        const res = await axiosService.get("/reset/confirmation**", reqData);
        const {data} =res;
        console.log(JSON.stringify(data))
        return Promise.resolve(data);

    }
    catch (error) {
        console.log("RESET PASSWORD ERROR", error);
    }
}*/

