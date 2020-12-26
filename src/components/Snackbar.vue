<template>
  <div id="snackbar">
    <v-snackbar
      :value="value"
      :color="color"
      :vertical="true"
      @input="$emit('input', $event)"
      left
    >
      <div class="text">{{ text }}</div>
      <v-icon large>
        {{ icon }}
      </v-icon>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          small
          v-bind="attrs"
          @click="$emit('click:close')"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Message'
    },
    color: {
      type: String,
      default: 'success'
    },
    icon: {
      type: String,
      default: 'far fa-bell'
    }
  }
})
</script>
<style scoped>
#snackbar .text {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>