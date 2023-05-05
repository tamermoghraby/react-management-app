import axios from "axios";

//const USER_SERVICE_BASE_URL = "http://localhost:9002/users"; LOCAL_URL
const API_GATEWAY_BASE_URL = "http://127.0.0.1:62967";

class userService {
  getUsers() {
    return axios.get(API_GATEWAY_BASE_URL + "users/all");
  }

  //http://localhost:9002/users?id=55
  getUserById(userId) {
    return axios.get(API_GATEWAY_BASE_URL + "/users?id=" + userId);
  }

  //http://localhost:9002/users/save
  addUser(user) {
    return axios.post(API_GATEWAY_BASE_URL + "users/save", user);
  }

  //http://localhost:9002/users/username?username=tamermg
  getUserByUsername(username) {
    return axios.get(
      API_GATEWAY_BASE_URL + "users/username?username=" + username
    );
  }

  //http://localhost:9002/users/delete/255
  deleteUser(userId) {
    return axios.delete(API_GATEWAY_BASE_URL + "users/delete/" + userId);
  }

  //http://localhost:9002/users/165
  updateUser(userId, user) {
    return axios.put(API_GATEWAY_BASE_URL + "users/" + userId, user);
  }
}

export default new userService();
