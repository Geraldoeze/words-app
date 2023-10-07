import axios from "axios";
let uri;

if (process.env.REACT_APP_ENVIRONMENT == 'development') {
    uri = 'https://words-server.vercel.app/server' // local
} else if (process.env.REACT_APP_ENVIRONMENT == 'production') {
    uri = 'https://words-server.vercel.app/server';// local
} else {
    uri = 'https://words-server.vercel.app/server'; // general
}
console.log(uri);
const Axios = axios.create({ baseURL: uri });


export const BaseURL = uri;
export default Axios;