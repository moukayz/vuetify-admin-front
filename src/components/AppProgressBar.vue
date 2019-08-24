<template>
  <v-progress-linear
    :active="loading"
    :indeterminate="loading"
    absolute
    bottom
    color="deep-blue accent-4"
  ></v-progress-linear>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["loading"])
  }
};
</script>
