
import axiosService from './axiosService';


export async function loginRequest(username, password) {
    
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
        const res = await axiosService.post("/login", formData);
        const {data} =res;
        
        sessionStorage.setItem('token', data.access_token);
        console.log(JSON.stringify(data));
        return Promise.resolve(data);

    }
    catch (error) {
        console.log("LOGIN ERROR", error);
    }
}

