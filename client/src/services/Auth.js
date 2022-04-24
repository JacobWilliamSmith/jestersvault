import http from "../http-common";

export default {
  login: (username, password) => {
    return http.post("/user/login", username, password)
      .then((response) => response.data)
      .catch(() => {
        return {
          isAuthenticated: false,
          user:{username:""},
          message:{msgBody:"Incorrect username or password", msgError: true}}
        }
      )
  },
  register: (username, email, password) => {
    return http.post("/user/register", username, email, password)
      .then(response => response.data)
      .catch(response => response.data);
  },
  logout: () => {
    return http.get("/user/logout")
      .then(response => response.data);
  },
  isAuthenticated: () => {
    return http.get("/user/authenticate")
      .then(response => response.data)
      .catch(() => ({isAuthenticated: false, user:{username:""}}))
  }
}