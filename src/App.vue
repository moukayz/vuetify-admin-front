<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-bar />
        <app-drawer />
        <v-content>
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath" />
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
import AppDrawer from "./components/AppDrawer";
import AppBar from "./components/AppBar";

export default {
  name: "App",
  components: {
    AppDrawer,
    AppBar
  },
  data: () => ({
    //
    snackbar: {
      text: "this is snackbar",
      color: "primary",
      show: true
    }
  })
};
</script>

<style></style>
