
import axiosService from './axiosService';

export async function registerRequest(reqData) {

    try {
        const res = await axiosService.post("/register", reqData);
        const {data} =res;
      //  console.log(JSON.stringify(data));
        if(data !== undefined) {
            return Promise.resolve(data);
        }
        else throw new Error('REGISTRATION ERROR');
    }
    catch (error) {
        return Promise.reject("Username alredy taken");
    }
}