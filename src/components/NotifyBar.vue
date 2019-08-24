<template>
  <v-snackbar
    :value="show"
    :color="color"
    :timeout="timeout"
    top
    class="title text-center"
    @input="$emit('update:show', $event)"
  >
    {{ message }}
    <v-icon color="white" @click="$emit('update:show', false)"
      >mdi-close</v-icon
    >
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: Boolean,
    color: { type: String, default: "success" },
    timeout: { type: Number, default: 2000 },
    message: { type: String, default: "" }
  }
};
</script>
