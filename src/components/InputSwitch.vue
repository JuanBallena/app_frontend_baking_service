<template>
  <div>
    <label class="label">{{ label}}</label>
    <div class="d-flex">
      <v-switch
        dense
        class="py-0 my-0"
        color="primary"
        :disabled="disabled"
        :input-value="value"
        @change="$emit('input', $event)"
      >
      </v-switch>
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      default: 'Radios'
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped>
.label {
  font-size: 13px;
  /* color: var(--v-info-base); */
  color: black;
  font-weight: bold;
}
</style>