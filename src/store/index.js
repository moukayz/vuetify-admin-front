import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import mutations from "./mutations";
import state from "./state";
import actions from "./actions";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

const loadingWrap = store => {
  let start, end;
  store.subscribeAction({
    before: action => {
      start = Date.now();
      console.log("Action: " + action.type);
      store.commit("setLoading", { loading: true });
    },
    after: action => {
      end = Date.now();
      console.log("Done action: " + action.type + ` -- ${end - start}ms`);
      store.commit("setLoading", { loading: false });
    }
  });
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [vuexLocal.plugin, loadingWrap]
});
