<template>
  <v-date-picker
    :value="value"
    @input="$emit('input', $event)"
    @keyup.enter="$emit('enter', $event)"
    scrollable 
    locale="es" 
    :color="color">
    <v-spacer></v-spacer>
    <v-btn 
      text
      small 
      color="info" 
      @click="$emit('close')"
    >
      Cerrar
    </v-btn>
    <v-btn
      small 
      :color="color" 
      @click="$emit('save')"
    >
      Ok
    </v-btn>
  </v-date-picker>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
})
</script>