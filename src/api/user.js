import axios from "axios";

export default {
  async getUserInfo() {
    try {
      const { data } = await axios.get(`/user/info`);
      return data.success ? data.data : undefined;
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
};
