<template>
  <v-chip id="chip" :color="color">
    {{ text }}
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      default: 'text',
      type: String
    },
    color: {
      default: 'successColor',
      type: String
    }
  }
});
</script>

<style scoped>

#chip {
  color: white;
  /* margin: 6px 0 0 0; */
  height: 22px;
  font-size: 12px;
}
</style>