import axios from "axios";
let uri;

if (process.env.REACT_APP_ENVIRONMENT == "development") {
  // uri = 'https://words-server.vercel.app/server'
  uri = "http://localhost:7000";
} else if (process.env.REACT_APP_ENVIRONMENT == "production") {
  // uri = 'https://words-server.vercel.app/server';
} else {
    uri = "http://localhost:7000/server";
  // uri = 'https://words-server.vercel.app/server';
}
console.log(uri);
const Axios = axios.create({ baseURL: uri });

export const BaseURL = uri;
export default Axios;