<template>
  <v-btn
    class="mx-2"
    fab
    depressed
    x-small
    :disabled="disabled"
    color="secondary"
    @click="$emit('click')"
  >
    <v-icon>
      fas fa-plus
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>