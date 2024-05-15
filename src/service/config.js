import axios from "axios";

const Api = axios.create({ baseURL: "https://json.wijo.ir/" });

export default Api;
