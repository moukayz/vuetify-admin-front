import NProgress from "nprogress";
import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Cool from "@/views/Cool.vue";
import Audit from "@/views/AuditManage";
import Vuls from "@/views/VulsManage";
import Checklist from "@/views/Checklist";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: {
        name: "dashboard"
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Home
    },
    {
      path: "/audit",
      name: "audit",
      component: Audit
    },
    {
      path: "/vuls",
      name: "vuls",
      component: Vuls
    },
    {
      path: "/checklist",
      name: "checklist",
      component: Checklist
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About.vue"),
      meta: {
        public: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        public: true
      }
    },
    {
      path: "/cool",
      name: "cool",
      component: Cool,
      meta: {
        public: true
      }
    },
    {
      path: "Oops404",
      name: "404",
      component: () => import("@/views/404.vue"),
      meta: {
        public: true
      }
    },
    {
      path: "*",
      name: "unknown",
      redirect: {
        name: "404"
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (store.state.token && (await store.dispatch("checkLoginAction"))) {
    // if user has loged in
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      // if user not login, jump to login page
      next({ path: "/login" });
    }
  }
});

export default router;
