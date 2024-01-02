import axios from "axios";

export default axios.create({
    baseURL: "https://www.nsaccto.com/",
    withCredentials:true,
    // baseURL: "http://127.0.0.1:8000",
});