
import axiosService from './axiosService';


export async function registerRequest(reqData) {
    
    // var formData = new FormData();
    // formData.append("firstName", data.firstName);
    // formData.append("lastName", data.lastName);
    // formData.append("username", data.username);
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // formData.append("confirmPassword", data.confirmPassword);
    // formData.append("telephone", data.telephone);
    // formData.append("workingUnitName", data.workingUnit);

    try {
        const res = await axiosService.post("/register", reqData);
        const {data} =res;
        console.log(JSON.stringify(data));
        return Promise.resolve(data);

    }
    catch (error) {
        console.log("LOGIN ERROR", error);
    }
}