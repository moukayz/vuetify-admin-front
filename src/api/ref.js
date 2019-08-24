import axios from "axios";

export default {
  async getAllRefs() {
    try {
      const { data } = await axios.get("/ref/all");
      return data.success ? data.data : undefined;
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
};
