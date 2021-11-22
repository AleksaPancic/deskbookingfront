import axios from 'axios'


class AxiosInstance {
     constructor() {
         this.instance = axios.create({baseURL: 'http://localhost:8080'});

        this.instance.interceptors.response.use(response => {
            return response;
        });

        this.instance.interceptors.request.use(config => {
            if(config.url !== '/login' && config.url !== '/register') {
                config.headers.Authorization =`Bearer ${sessionStorage.getItem('token')}`;
                console.log(config.headers);
                
            }
            return config;

        })

     }

}

export default new AxiosInstance({}).instance;