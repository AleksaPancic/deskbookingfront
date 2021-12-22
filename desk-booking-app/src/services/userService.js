import axiosService from './axiosService';


export async function currentUser() {

    try {
        const res = await axiosService.get("/profile/view");
        const {data} =res;
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
     //   console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
       // const {data} = error;
        console.log("PASSWORD CHANGE ERROR", error);
        return Promise.reject("Password change error");
    }

}

export async function editProfileRequest(reqData) {

    try {
        const res = await axiosService.post("/profile/update",  reqData);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("EDIT PROFILE ERROR", error);
    }

}

export async function getUserList( pageNo = 0, pageSize = 5 ) {

    try {
        const res = await axiosService.get("/profile/view/user/list?pageNo=" + pageNo + "&pageSize=" + pageSize);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR GETTING USER LIST", error);
    }

}

export async function getNumOfUsers() {

    try {
        const res = await axiosService.get("/profile/view/users/number");
        const {data} =res;
        return Promise.resolve(data);
    }
    catch (error) {
        console.log("ERROR GETTING NUMBER OF USERS", error);
    }

}