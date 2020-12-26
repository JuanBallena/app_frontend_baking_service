<template>
  <v-btn
    icon
    :color="color"
    :samll="small"
    @click="$emit('click')"
  >
  <v-icon small>{{ icon }}</v-icon>
</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'info'
    },
    small: {
      type: Boolean,
      default: false
    }
  }
})
</script>