<template>
  <v-btn
    id="form-button"
    :class="`${textColor}--text`"
    :color="color"
    :to="route"
    @click="$emit('click')"
    depressed
    tile>
    <v-icon
      v-if="icon"
      :class="`${textColor}--text icon`"
      x-small>
      {{ icon }}
    </v-icon> 
    <span class="text">{{ text }}</span>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    icon : {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: "Guardar"
    },
    color: {
      type: String,
      default: 'primary'
    },
    textColor: {
      type: String,
      default: 'white'
    },
    route: {
      default: null,
      type: Object
    },
  }
})
</script>

<style scoped lang="sass">
.text
  font-size: 12px

.icon
  margin: 0 14px 0 0

@media (max-width: 750px)
  #form-button
    width: 100%
</style>