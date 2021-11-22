import axiosService from './axiosService';


export async function currentUser() {

    try {
        const res = await axiosService.get("/profile/view");
        const {data} =res;
        console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("LOGIN ERROR", error);
    }

}

export async function changePaswordRequest(newPassword) {

    try {
       
        const res = await axiosService.post("/profile/update/password",  {password: newPassword});
        const {data} =res;
        console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("PASSWORD CHANGE ERROR", error);
    }

}

export async function editProfileRequest(reqData) {

    try {
        const res = await axiosService.post("/profile/update",  reqData);
        const {data} =res;
        console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("EDIT PROFILE ERROR", error);
    }

}