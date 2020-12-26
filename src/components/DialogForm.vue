<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    :max-width="maxWidth"
  >
    <v-card>
      <v-card-title :class="color + ' white--text'">
        <span class="dialog-title">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          color="white"
          @click="$emit('click:close')"
        >
          <v-icon
          >
            fas fa-times-circle
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-5">
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: '530'
    },
    title: {
      type: String,
      default: 'Title'
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
})
</script>

<style>
.dialog-title {
  font-size: 17px;
}
</style>