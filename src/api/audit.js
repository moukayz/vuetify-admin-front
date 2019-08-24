import axios from "axios";

export default {
  async deleteAuditItem(itemId) {
    try {
      const { data } = await axios.post("/audit/deleteAuditItem", { itemId });
      return data.success;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },

  async saveAuditItem(itemInfo) {
    try {
      const { data } = await axios.post("/audit/saveAuditItem", itemInfo);
      return data.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getAllAuditItems() {
    try {
      const { data } = await axios.get("/audit/getAllAuditItems");
      return data.success ? data.data : undefined;
    } catch (error) {
      console.log(error.message);
      return undefined;
    }
  }
};
