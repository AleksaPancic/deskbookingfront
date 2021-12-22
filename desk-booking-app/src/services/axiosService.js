import axios from 'axios'

const localServerUrl = 'http://localhost:8080';

class AxiosInstance {
     constructor() {
         this.instance = axios.create({baseURL: localServerUrl});

        this.instance.interceptors.response.use(response => {
            return response;
        }, async function(error){
            const originalRequest = error.config;
            if(error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;
                return axios.get(`${localServerUrl}/profile/token/refresh`, {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('refresh_token')}`
                    }
                }).then(res => {
                        if(res.status === 200){
                        sessionStorage.setItem('token', res.data.access_token);
                        sessionStorage.setItem('refresh_token', res.data.refresh_token);
                       // axios.defaults.headers['Authorization'] =`Bearer ${sessionStorage.getItem('token')}`;
                        //console.log(originalRequest);
                        originalRequest.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
                        return axios(originalRequest);
                        }
                });
            }
        });

        this.instance.interceptors.request.use(config => {
            if(config.url !== '/login' && config.url !== '/register' && config.url !== '/reset') {
                config.headers.Authorization =`Bearer ${sessionStorage.getItem('token')}`;
                
            }
           // console.log(JSON.stringify(config.headers) + "WWWWWWWTTTTTTTTTFFFFFFFFF");
            return config;

        })

     }

}

export default new AxiosInstance({}).instance;