<template>
  <v-navigation-drawer
    app
    fixed
    clipped
    disable-resize-watcher
    :value="showDrawer"
    class="app-drawer flat hidden-md-and-down"
  >
    <v-list dense rounded nav>
      <v-list-item>
        <v-container grid-list-md>
          <v-layout column align-center justify-center>
            <v-flex md10>
              <v-list-item-avatar height="100px" width="100px">
                <v-img
                  src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/27/27-spongebob-squarepants.w700.h700.jpg"
                />
              </v-list-item-avatar>
            </v-flex>
            <v-flex md10>
              <v-list-item-title>
                <span class="title">{{ userInfo.username }}</span>
              </v-list-item-title>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list-item>
      <v-divider />

      <v-subheader class="mt-4 grey--text text--darken-1">
        操作
      </v-subheader>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        no-action
        :prepend-icon="item.icon"
        class="px-2"
        active-class="dark-text"
      >
        <template v-slot:activator>
          <v-list-item-content class="ml-n1">
            <v-list-item-title class="subtitle-1">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="subitem in item.subitems"
          :key="subitem.title"
          :to="subitem.link"
          active-class="active-item elevation-2"
        >
          <v-list-item-content>
            <v-list-item-title class="subtitle-1 pl-3">
              {{ subitem.title }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ subitem.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AppDrawer",
  data: () => ({
    // drawer: true,
    items: [
      {
        active: false,
        title: "审计中心",
        icon: "mdi-alien",
        subitems: [
          { title: "审计管理", icon: "mdi-text", link: "/audit" },
          { title: "漏洞管理", icon: "mdi-bug", link: "/vuls" },
          { title: "Checklist", icon: "mdi-book-open", link: "/checklist" }
        ]
      },
      {
        active: false,
        title: "个人中心",
        icon: "mdi-account",
        subitems: [{ title: "账号管理", icon: "mdi-account-box" }]
      }
    ]
  }),

  computed: {
    ...mapState(["userInfo", "showDrawer"])
  },

  methods: {
    created() {}
  }
};
</script>

<style>
/* .app-drawer {
  background: linear-gradient(
    45deg,
    rgba(45, 45, 45, 1) 9%,
    rgba(0, 0, 0, 1) 100%
  );
} */
.menu-text {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

.animation {
  margin: 0;
  width: 100%;
  height: 100vh;
  font-family: "Exo", sans-serif;
  color: #fff;
  background: linear-gradient(-45deg, grey, #e73c7e, #23a6d5, #23d5ab);
  /* background: linear-gradient(45deg, #111213, #17323f, #0a56ad, #10c097); */
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.active-item {
  border-color: #bf2c00 !important;
  background-color: #ad3510f1 !important;
}

.v-list-group__items a {
  color: #f4f4f4 !important;
  caret-color: #f4f4f4 !important;
}

.white-text {
  color: #e5e9ec !important;
  caret-color: #f4f4f4 !important;
}

.dark-text {
  color: black !important;
  caret-color: black !important;
}
</style>
