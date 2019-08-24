export default {
  toggleDrawer: state => (state.showDrawer = !state.showDrawer),
  setToken: (state, payloads) => (state.token = payloads.token),
  setAuditItems: (state, payloads) => (state.auditItems = payloads.auditItems),
  setLoading: (state, payloads) => {
    state.loading = payloads.loading;
  },
  setUserInfo: (state, payloads) => {
    state.userInfo = payloads.userInfo;
  },
  setChecklists: (state, payloads) => {
    state.checklists = payloads.refs;
  }
};
