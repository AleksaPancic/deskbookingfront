
import axiosService from './axiosService';


export async function loginRequest(username, password) {
    
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
        const res = await axiosService.post("/login", formData);
        const {data} =res;
       // console.log(JSON.stringify(data))
        if(data.access_token !== undefined && data.refresh_token !== undefined ){
        sessionStorage.setItem('token', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);
        return Promise.resolve(data);
        }
        else throw new Error("LOGIN ERROR");
        

    }
    catch (error) {
      //  console.log(error);
      return Promise.reject(`${error.message}: Wrong username or password`);
      //  throw new Error('Wrong username or password');
       
    }
}

