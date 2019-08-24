import axios from "axios";
import store from "@/store";

// set auth header if the token in vuex is not empty
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers = { Authorization: "Bearer " + store.state.token };
  }
  return config;
});

export { default as loginApi } from "./login";
export { default as auditApi } from "./audit";
export { default as userApi } from "./user";
export { default as refApi } from "./ref";
