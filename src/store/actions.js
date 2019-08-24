import { userApi, loginApi, auditApi, refApi } from "@/api";

export default {
  async loginAction({ state, commit, dispatch }, loginInfo) {
    const token = await loginApi.login(loginInfo);
    if (token) {
      commit("setToken", { token });

      //after login, fetch current user info
      await dispatch("getUserInfoAction");
      return true;
    }
    return false;
  },

  async getUserInfoAction({ commit }) {
    const userInfo = await userApi.getUserInfo();
    if (userInfo) {
      commit("setUserInfo", { userInfo });
      return true;
    }
    return false;
  },

  async checkLoginAction({ commit }) {
    return await loginApi.checkLogin();
  },

  async saveAuditItemAction({ commit, dispatch }, auditInfo) {
    const res = await auditApi.saveAuditItem(auditInfo);
    dispatch("getAllAuditItemsAction");
    return res;
  },

  async getAllAuditItemsAction({ commit }) {
    const auditItems = await auditApi.getAllAuditItems();
    if (auditItems) {
      commit("setAuditItems", { auditItems });
      return true;
    }
    return false;
  },

  async deleteAuditItemAction({ commit, dispatch }, { itemId }) {
    const res = await auditApi.deleteAuditItem(itemId);
    dispatch("getAllAuditItemsAction");
    return res;
  },

  async getAllRefsAction({ commit }) {
    const refs = await refApi.getAllRefs();
    if (refs) {
      commit("setChecklists", { refs });
      console.log(refs);
      return true;
    }
    return false;
  }
};
