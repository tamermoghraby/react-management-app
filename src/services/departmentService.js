import axios from "axios";
// const DEPARTMENT_SERVICE_BASE_URL = "http://localhost:9001/departments"; LOCAL_URL
const API_GATEWAY_BASE_URL = "http://127.0.0.1:62967";
class departmentService {
  getDepartments() {
    return axios.get(API_GATEWAY_BASE_URL + "departments");
  }
}

export default new departmentService();
