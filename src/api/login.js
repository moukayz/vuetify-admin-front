import axios from "axios";
export default {
  async login(loginInfo) {
    try {
      const res = await axios.post("/auth/login", loginInfo);
      return res.data.success ? res.data.data.token : "";
    } catch (error) {
      console.log(error);
    }
  },

  async checkLogin() {
    try {
      const res = await axios.get("/auth/checkLogin");
      return res.data.success;
    } catch (error) {
      console.log(error);
    }
  }
};
