<template>
  <v-app-bar app fixed clipped-left class="app-bar">
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-icon class="mx-4">
      mdi-security
    </v-icon>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-regular">PCG Security Audit</span>
      <!-- <h1 data-heading="C">PCG Security Audit</h1> -->
    </v-toolbar-title>
    <app-progress-bar></app-progress-bar>
    <v-spacer />
    <v-btn
      text
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
    >
      <span class="mr-2">Latest Release</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import AppProgressBar from "@/components/AppProgressBar.vue";

export default {
  name: "AppBar",
  components: {
    AppProgressBar
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["toggleDrawer"])
  }
};
</script>

<style>
/* .app-bar {
  background: linear-gradient(
    45deg,
    rgba(45, 45, 45, 1) 9%,
    rgba(0, 0, 0, 1) 100%
  );
} */
</style>
