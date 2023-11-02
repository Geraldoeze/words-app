import axios from "axios";
let uri;

if (process.env.NEXT_PUBLIC_ENVIRONMENT == "development") {
  // uri = "https://words-server.vercel.app/server";
} else if (process.env.NEXT_PUBLIC_ENVIRONMENT == "production") {
  uri = process.env.NEXT_PUBLIC_API_URL;
} else {
  uri = process.env.NEXT_PUBLIC_API_URL;
}
console.log(uri);
const Axios = axios.create({ baseURL: uri });

export const BaseURL = uri;
export default Axios;
